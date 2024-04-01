import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text } from "@rneui/themed";
import { View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Review } from "../app/appConfig"; // Fix the import path
import ReviewComponent from "./ReviewComponent";

export default function Reviews({ userID }: { userID: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getReviews = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/listreviews", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
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
    <>
      {loading ? (
        <ActivityIndicator style={{ marginTop: 50 }} />
      ) : reviews?.length > 0 ? (
        <>
          <Text style={styles.title}>Baker Reviewed</Text>
          {reviews.map((review: Review) => (
            <ReviewComponent
              review={review}
              userID={userID}
              key={review.review_id}
            />
          ))}
        </>
      ) : (
        <Text style={styles.title}>You have not yet review any baker</Text>
      )}
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
    marginBottom: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
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
  control: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  cardBottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
