import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Baker } from "../appConfig";
import { Card, Image, Text, SearchBar } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";

export default function TabOneScreen(navigation: any) {
  const [search, setSearch] = useState<string>("");
  const [bakers, setBakers] = useState<Baker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getBakers = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/listbakers")
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
  const searchBakers = async (search: string) => {
    console.log(search);
    return fetch(
      "https://baker-finder-go.onrender.com/v1/getBakersByPostcode",
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcode: search,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data && data.length > 0) {
          setBakers(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <SearchBar
        placeholder="Search by Postcode"
        onChangeText={(text) => setSearch(text)}
        value={search}
        onCancel={() => setSearch("")}
        onSubmitEditing={() => searchBakers(search)}
        style={styles.search}
      />
      <ScrollView style={styles.bakers}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          bakers.map((baker) => (
            <Card key={baker.baker_id}>
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
          ))
        )}
      </ScrollView>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </>
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
