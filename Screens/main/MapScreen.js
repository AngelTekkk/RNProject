import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function MapScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>MapScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
