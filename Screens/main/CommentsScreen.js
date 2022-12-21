import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function CommentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
