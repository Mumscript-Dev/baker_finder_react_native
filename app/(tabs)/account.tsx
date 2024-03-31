import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import Reviews from "@/components/Reviews";
import { Review } from "../appConfig";
import MyBaker from "@/components/MyBaker";

export default function TabTwoScreen() {
  const userType = "baker";
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getUser = async () => {
    return fetch("http://localhost:4000/v1/listreviews", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "4aadc430-f636-4ec8-bf9e-46433018f3d2",
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser().then((data) => {
      if (data && data.length > 0) {
        setReviews(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <View style={styles.container}>
      {userType === "baker" ? (
        <ScrollView>
          <MyBaker />
          <Reviews />
        </ScrollView>
      ) : (
        <ScrollView>
          <Reviews />
        </ScrollView>
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
