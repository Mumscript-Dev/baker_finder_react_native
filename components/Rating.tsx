import React from "react";
import { Text, TextProps } from "./Themed";
import FontAwesome from "@expo/vector-icons/FontAwesome";
export function Rating({ rating }: { rating: number }) {
  return (
    <>
      <Text>{rating}</Text>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesome
          key={i}
          name="star"
          size={15}
          color={i < rating ? "gold" : "gray"}
        />
      ))}
    </>
  );
}
