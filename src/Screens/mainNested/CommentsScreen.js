import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { addComment } from "../../redux/posts/postsOperations";

export default function CommentsScreen({ navigation, route }) {
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState(null);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  console.log(comments);

  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  const { height } = useWindowDimensions();
  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      const post = posts.find((post) => post.id === route.params.postId);
      setPostId(route.params.postId);
      setPhoto(route.params.photo);
      setComments(post.comments);
    }
  }, [route.params]);

  useEffect(() => {
    if (postId) {
      const result = posts.find((post) => post.id === postId);
      setComments(result.comments);
    }
  }, [posts]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboardShown(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboardShown(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const sendComment = () => {
    dispatch(
      addComment({
        postId,
        user: user.avatar,
        comment,
        createdAt: Date.now(),
      })
    );
    setComment("");
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        hideKeyboard();
      }}
      disabled={!isKeyboardShown}
    >
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Image source={{ uri: photo }} style={styles.photo} />
          {!isKeyboardShown && (
            <FlatList
              style={{ height: height - 506, marginBottom: 32 }}
              data={comments}
              keyExtractor={(item, indx) => indx.toString()}
              renderItem={({ item }) => {
                const date = new Date(item.createdAt);
                const d = date.toLocaleString();
                console.log(d);
                return (
                  <View style={styles.commentContainer}>
                    <View style={styles.commentIcon}>
                      <Image
                        style={{ width: 28, height: 28 }}
                        source={{ uri: item.user }}
                      />
                    </View>
                    <View style={styles.commentTextContainer}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                      <Text style={styles.commentTime}>{d}</Text>
                    </View>
                  </View>
                );
              }}
            />
          )}
          <View>
            <TextInput
              style={styles.input}
              placeholder={"Комментировать..."}
              placeholderTextColor={"#BDBDBD"}
              onChangeText={(value) => {
                setComment(value);
              }}
              value={comment}
            />
            <Pressable
              style={({ pressed }) => ({
                ...styles.inputBtn,
                opacity: pressed ? 0.8 : 1,
              })}
              onPress={() => {
                sendComment();
                hideKeyboard();
                setComment("");
              }}
            >
              <Feather name="arrow-up" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  photo: {
    height: 240,
    marginBottom: 32,
    borderRadius: 8,
  },
  commentContainer: {
    flexDirection: "row",
    marginBottom: 24,
  },
  commentIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B4371",
    borderRadius: 14,
    marginRight: 16,
    overflow: "hidden",
  },
  commentTextContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentTime: {
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "rgba(189, 189, 189, 1)",
  },
  input: {
    height: 50,
    fontFamily: "Roboto_medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 50,
  },
  inputBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
});
