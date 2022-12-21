import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CreatePostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>CreatePostsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
