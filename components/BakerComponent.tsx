import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Baker } from "../app/appConfig";
import { Card, Image, Text, SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function BakersComponent({ baker }: { baker: Baker }) {
  return (
    <Card key={baker.baker_id}>
      <Text style={{ marginBottom: 5, fontSize: 20 }}>{baker.name}</Text>
      <Image
        source={{ uri: baker.img }}
        style={{ width: "100%", height: 200 }}
      />
      <Link href={"/baker"} asChild>
        <Pressable>
          {({ pressed }) => (
            <Text style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}>
              Show Details
            </Text>
          )}
        </Pressable>
      </Link>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  baker: {
    marginBottom: 10,
    padding: 10,
    width: 360,
  },
  bakers: {
    paddingBottom: 20,
    marginBottom: 10,
    display: "flex",
  },
  search: {
    width: 240,
    marginBottom: 5,
    marginTop: 5,
  },
});
