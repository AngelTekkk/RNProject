import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import HomeScreen from "./Screens/main/Home";

const AuthStack = createNativeStackNavigator();

export const useRoute = () => {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};
