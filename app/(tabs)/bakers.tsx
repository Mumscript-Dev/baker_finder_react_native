import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { View } from "@/components/Themed";
import { Baker } from "../appConfig";
import { Card, Image, Text, Button, SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function TabOneScreen(navigation: any) {
  const [search, setSearch] = useState<string>("");
  const [bakers, setBakers] = useState<Baker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBakers = async () => {
    return fetch("http://localhost:4000/v1/listbakers")
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getBakers().then((data) => {
      if (data && data.length > 0) {
        setBakers(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          placeholder="Type Here..."
          onChangeText={(text) => setSearch(text)}
          value={search}
          onCancel={() => setSearch("")}
          onEndEditing={() => {
            console.log("Search for ", search);
          }}
          style={styles.search}
        />
      </View>
      <ScrollView style={styles.bakers}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          bakers.map((baker) => (
            <View style={styles.baker} key={baker.baker_id}>
              <Card>
                <Text style={{ marginBottom: 5, fontSize: 20 }}>
                  {baker.name}
                </Text>
                <Image
                  source={{ uri: baker.img }}
                  style={{ width: "100%", height: 200 }}
                />
                <Link href={"/baker"} asChild>
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
          ))
        )}
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
    width: 240,
    backgroundColor: "white",
    color: "white",
    marginBottom: 5,
  },
});
