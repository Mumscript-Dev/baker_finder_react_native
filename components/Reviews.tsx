import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Review } from "../app/appConfig"; // Fix the import path

import { Card } from "@rneui/themed"; // Add this import statement
import { Rating } from "./Rating"; // Add this import statement
import { FontAwesome } from "@expo/vector-icons";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getReviews = async () => {
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

  const deleteReview = async (review_id: string | undefined) => {
    if (!review_id) return console.log("No review id provided");
    return fetch("http://localhost:4000/v1/review", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_id: review_id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  const updateReview = async (review_id: string | undefined) => {
    if (!review_id) return console.log("No review id provided");
    return fetch("http://localhost:4000/v1/review", {
      method: "Patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_id: review_id,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getReviews().then((data) => {
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
      <Text style={styles.title}>Reviewed Bakers</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        reviews.map((review: Review) => (
          <View style={styles.review} key={review.review_id}>
            <Card>
              <Card.Title>
                <Rating rating={parseInt(review.rating)} />
              </Card.Title>
              <FontAwesome
                name="trash"
                size={15}
                onPress={() => deleteReview(review.review_id)}
              />
              <FontAwesome
                name="edit"
                size={15}
                onPress={() => updateReview(review.review_id)}
              />
              <Text style={{ marginBottom: 5, fontSize: 20 }}>
                {review.review}
              </Text>
            </Card>
          </View>
        ))
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