import React from "react";
import { Text, TextProps, View } from "../components/Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
export function FullScreenModal() {
  return (
    <View style={styles.rating}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
  },
});
