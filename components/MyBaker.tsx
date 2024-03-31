import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Baker } from "../app/appConfig"; // Fix the import path

import { Card, Image } from "@rneui/themed"; // Add this import statement
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyBaker() {
  const [baker, setBaker] = useState<Baker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getBakers = async () => {
    return fetch("http://localhost:4000/v1/getmybaker", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "4aadc430-f636-4ec8-bf9e-46433018f3d2",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log("Failed to get baker");
          return null;
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteBaker = async (baker_id: string | undefined) => {
    if (!baker_id) return console.log("No baker_id");
    return fetch("http://localhost:4000/v1/baker", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baker_id: baker_id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBaker = async (baker_id: string | undefined) => {
    if (!baker_id) return console.log("No baker_id");
    return fetch("http://localhost:4000/v1/baker", {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baker_id: baker_id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getBakers().then((data) => {
      if (data) {
        console.log(data);
        setBaker(data);
        setLoading(false);
      } else {
        setBaker(null);
        setLoading(false);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Baker</Text>
      <FontAwesome
        name="plus"
        size={15}
        onPress={() => deleteBaker(baker?.baker_id)}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        baker && (
          <View style={styles.review} key={baker?.baker_id}>
            <Card>
              <Card.Title style={{ marginBottom: 5, fontSize: 20 }}>
                {baker?.name}
              </Card.Title>
              <FontAwesome
                name="trash"
                size={15}
                onPress={() => deleteBaker(baker?.baker_id)}
              />
              <FontAwesome
                name="edit"
                size={15}
                onPress={() => updateBaker(baker?.baker_id)}
              />
              <Card.Image
                source={{ uri: baker?.img }}
                style={{ width: "100%", height: 200 }}
              />
            </Card>
          </View>
        )
      )}
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
  reviews: {
    paddingBottom: 20,
    marginBottom: 10,
    display: "flex",
  },
  review: {
    marginBottom: 10,
    padding: 10,
    width: 360,
  },
});
