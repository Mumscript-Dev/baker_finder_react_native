import React from "react";
import { Text, TextProps, View } from "./Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
export function Rating({ rating }: { rating: number }) {
  return (
    <View style={styles.rating}>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={15}
          color={i < rating ? "gold" : "gray"}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: "row",
  },
});
