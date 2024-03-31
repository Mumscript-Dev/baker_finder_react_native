import { Pressable, ScrollView, StyleSheet } from "react-native";
import { View } from "@/components/Themed";
import { Baker } from "../appConfig";
import { Card, Image, Text, Button, SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { Link } from "expo-router";

const bakers: Baker[] = [
  {
    name: "Liam's Donuts House",
    img: "https://images.unsplash.com/photo-1604287094096-59a7dee979e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80",
    specialties: "Donuts",
    address: "35 Rundle Street",
    suburb: "Adelaide",
    postcode: "5000",
    contact: "1234 5678",
  },
  {
    name: "Hui's Delight",
    img: "https://images.unsplash.com/photo-1532063997725-c04d1abf7f67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1528&q=80",
    specialties: "Bread",
    address: "35 Rundle Street",
    suburb: "Adelaide",
    postcode: "5000",
    contact: "1234 5678",
  },
];
export default function TabOneScreen(navigation: any) {
  const [search, setSearch] = useState<string | null>(null);
  const getbakery = async () => {
    return fetch("http://localhost:4000/v1/listbakers")
      .then((response) => response.json())
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <View style={styles.container}>
      <View>
        {/* <SearchBar
          placeholder="Search by Postcode or Suburb"
          onChangeText={(text) => setSearch(text)}
          style={styles.search}
        /> */}
      </View>
      <ScrollView style={styles.bakers}>
        {bakers.map((baker, index) => (
          <View style={styles.baker} key={index}>
            <Card>
              <Text style={{ marginBottom: 5, fontSize: 20 }}>
                {baker.name}
              </Text>
              <Image
                source={{ uri: baker.img }}
                style={{ width: "100%", height: 200 }}
              />
              <Link href="/baker" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <Text
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    >
                      Show Details
                    </Text>
                  )}
                </Pressable>
              </Link>
            </Card>
          </View>
        ))}
      </ScrollView>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
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
    width: "90%",
    backgroundColor: "white",
    color: "white",
    marginBottom: 5,
  },
});
