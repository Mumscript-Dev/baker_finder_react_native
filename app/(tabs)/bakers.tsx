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
import FilteredBakers from "@/components/FilteredBakers";
import BakersComponent from "@/components/BakerComponent";

export default function TabOneScreen() {
  const [search, setSearch] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Baker[] | null>(null);
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
    const filteredBaker = bakers.filter((baker) => baker.postcode === search);
    setSearchResults(filteredBaker);
  };
  const cancelResearch = () => {
    setSearchResults(null);
    setSearch("");
  };
  return (
    <>
      <SearchBar
        placeholder="Search by Postcode"
        onChangeText={(text) => setSearch(text)}
        value={search}
        onCancel={() => cancelResearch()}
        onSubmitEditing={() => searchBakers(search)}
        onClear={() => cancelResearch()}
        style={styles.search}
      />
      <ScrollView style={styles.bakers}>
        {searchResults ? (
          <FilteredBakers searchResults={searchResults} />
        ) : (
          <>
            {loading ? (
              <ActivityIndicator />
            ) : (
              bakers.map((baker) => (
                <BakersComponent baker={baker} key={baker.baker_id} />
              ))
            )}
          </>
        )}
      </ScrollView>
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
