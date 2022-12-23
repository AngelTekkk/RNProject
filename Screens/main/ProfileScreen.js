import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";

const bgImage = require("../../assets/images/bg.jpg");

export default function ProfileScreen({ navigation }) {
  const [isImageAdded, setIsImageAdded] = useState(false);

  const { width } = useWindowDimensions();

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
            <Image style={styles.avatarImg} />
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
                navigation.navigate("Login");
              }}
            />
          </View>
          <Text style={styles.userName}>User Name</Text>
          <ScrollView>
            <View style={{ height: 300 }}></View>
          </ScrollView>
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
});
