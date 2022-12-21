import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../../Screens/main/ProfileScreen";
import CreatePostsScreen from "../../Screens/main/CreatePostsScreen";
import PostsScreen from "../../Screens/main/PostsScreen";
import { View } from "react-native";

const MainTab = createBottomTabNavigator();

export default function Home({ navigation }) {
  return (
    <MainTab.Navigator initialRouteName="PostsScreen">
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публикации",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto_medium",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("Login");
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="grid" color="rgba(33, 33, 33, 0.8)" size={24} />
          ),
        }}
      />
      <MainTab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={({ route }) => ({
          title: "Создать публикацию",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto_medium",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          tabBarShowLabel: false,
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("PostsScreen");
              }}
            />
          ),
          tabBarStyle: { display: "none" },
          tabBarIcon: () => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </View>
          ),
        })}
      />
      <MainTab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => (
            <Feather name="user" color="rgba(33, 33, 33, 0.8)" size={24} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}
