import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";

import CommentsScreen from "../mainNested/CommentsScreen";
import MapScreen from "../mainNested/MapScreen";
import NestedPostsScreen from "../mainNested/NestedPostsScreen";

const AuthStack = createNativeStackNavigator();

export default function PostsScreen({ navigation }) {
  return (
    <AuthStack.Navigator initialRouteName="NestedPostsScreen">
      <AuthStack.Screen
        name="NestedPostsScreen"
        component={NestedPostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="CommentsScreen"
        component={CommentsScreen}
        options={{
          title: "Комментарии",
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
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("NestedPostsScreen");
              }}
            />
          ),
        }}
      />
      <AuthStack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Карта",
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
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("NestedPostsScreen");
              }}
            />
          ),
        }}
      />
    </AuthStack.Navigator>
  );
}
