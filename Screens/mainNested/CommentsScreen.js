import React, { useEffect, useState } from "react";
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

export default function CommentsScreen({ navigation, route }) {
  const [photo, setPhoto] = useState(null);
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);
  const [isKeyboardShown, setIsKeyboardShown] = useState(false);
  console.log(comments);

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
    }
  }, [route.params]);

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
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text style={styles.commentText}>{item}</Text>
                </View>
              )}
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
                setComments((prevState) => [...prevState, comment]);
                setComment(null);
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
    marginBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
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
