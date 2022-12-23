import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image style={styles.userAvatar} />
        <View>
          <Text style={styles.userName}>User Name</Text>
          <Text style={styles.userEmail}>user@email.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <Image source={{ uri: item.state.photoUri }} style={styles.photo} />
            <Text style={styles.photoText}>{item.state.photoName}</Text>
            <View style={styles.linksContainer}>
              <Pressable
                style={styles.linkContainer}
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    photo: item.state.photoUri,
                  });
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={styles.commentsCount}>0</Text>
              </Pressable>
              <Pressable
                style={styles.linkContainer}
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    location: item.location.coords,
                  });
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>
                  {item.state.photoLocation}
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  userAvatar: {
    width: 60,
    height: 60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    fontFamily: "Roboto_bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
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
