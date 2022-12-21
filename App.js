import React, { useCallback, useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    Roboto: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto_thin: require("./assets/fonts/Roboto-Thin.ttf"),
    Roboto_medium: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto_bold: require("./assets/fonts/Roboto-Bold.ttf"),
  });
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const routing = useRoute();

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer onLayout={onLayoutRootView()}>
      {routing}
    </NavigationContainer>
  );
}
