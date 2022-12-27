import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Image,
  FlatList,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { authSignOutUser } from "../../redux/auth/authOperations";

const bgImage = require("../../../assets/images/bg.jpg");

export default function ProfileScreen({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const [isImageAdded, setIsImageAdded] = useState(true);

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

  const getUserPost = () => {
    return posts.filter((post) => post.user === user.id);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode="cover" style={styles.image}>
        <View style={styles.postsContainer}>
          <View
            style={{
              ...styles.addAvatar,
              right: width / 2 - 60,
            }}
          >
            <Image style={styles.avatarImg} source={{ uri: user.avatar }} />
            <Pressable
              style={{
                ...styles.addAvatarBtn,
                borderColor: isImageAdded ? "#E8E8E8" : "#FF6C00",
                backgroundColor: isImageAdded ? "#FFFFFF" : "transparent",
              }}
              onPress={() => setIsImageAdded((state) => !state)}
            >
              <Text
                style={{
                  ...styles.addAvatarBtnTitle,
                  color: isImageAdded ? "#BDBDBD" : "#FF6C00",
                  transform: isImageAdded
                    ? [{ rotate: "-45deg" }]
                    : [{ rotate: "0deg" }],
                }}
              >
                +
              </Text>
            </Pressable>
          </View>
          <View style={styles.logoutBtn}>
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              onPress={() => {
                dispatch(authSignOutUser());
              }}
            />
          </View>
          <Text style={styles.userName}>User Name</Text>
          <FlatList
            data={getUserPost()}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 32 }}>
                <Image source={{ uri: item.photo }} style={styles.photo} />
                <Text style={styles.photoText}>{item.title}</Text>
                <View style={styles.linksContainer}>
                  <Pressable
                    style={styles.linkContainer}
                    onPress={() => {
                      navigation.navigate("CommentsScreen", {
                        photo: item.photo,
                        postId: item.id,
                      });
                    }}
                  >
                    <Feather name="message-circle" size={24} color="#BDBDBD" />
                    <Text style={styles.commentsCount}>
                      {item.comments.length}
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.linkContainer}
                    onPress={() => {
                      navigation.navigate("MapScreen", {
                        location: item.location,
                      });
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>
                      {item.location.place}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    paddingTop: 147,
  },
  postsContainer: {
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 92,
    paddingHorizontal: 16,
    // marginTop: 67,
  },
  title: {
    fontFamily: "Roboto_medium",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.3,
    textAlign: "center",
    marginBottom: 32,
  },
  addAvatar: {
    position: "absolute",
    top: -60,
  },
  avatarImg: {
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatarBtn: {
    position: "absolute",
    bottom: 14,
    right: -13,
    width: 26,
    height: 26,
    borderRadius: 100,
    borderColor: "#FF6C00",
    borderStyle: "solid",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addAvatarBtnTitle: {
    fontFamily: "Roboto_thin",
    fontSize: 23,
    lineHeight: 25,
    color: "#FF6C00",
  },
  logoutBtn: {
    position: "absolute",
    top: 22,
    right: 16,
  },
  userName: {
    fontFamily: "Roboto_medium",
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: 0.3,
    textAlign: "center",
    color: "#212121",
    marginBottom: 32,
  },
  photo: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  photoText: {
    fontFamily: "Roboto_medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  commentsCount: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginLeft: 6,
  },
  locationText: {
    fontFamily: "Roboto",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});
