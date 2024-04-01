import { StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { Review } from "../app/appConfig"; // Fix the import path
import { Card } from "@rneui/themed"; // Add this import statement
import { Rating } from "./Rating"; // Add this import statement
import { FontAwesome } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ReviewComponent(props: {
  review: Review;
  userID: string;
}) {
  const { review, userID } = props;

  const deleteReview = async (review_id: string | undefined) => {
    if (!review_id) return console.log("No review id provided");
    return fetch("https://baker-finder-go.onrender.com/v1/review", {
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
    return fetch("https://baker-finder-go.onrender.com/v1/review", {
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

  return (
    // <View style={styles.review} key={review.review_id}>
    <Card>
      {userID !== review.user_id ? (
        <>
          <Text style={{ marginBottom: 5, fontSize: 15 }}>
            {review.user_name}
          </Text>
          <Card.Divider />
        </>
      ) : (
        <>
          <View style={styles.control}>
            <FontAwesome
              name="trash"
              size={20}
              onPress={() => deleteReview(review.review_id)}
            />
            <FontAwesome
              name="edit"
              size={20}
              onPress={() => updateReview(review.review_id)}
            />
          </View>
          <Card.Divider />
        </>
      )}

      <View style={styles.info}>
        <Link<{ id: string }>
          href={{
            pathname: `baker/[id]`,
            params: { id: review.baker_id },
          }}
        >
          <Text style={styles.title}>{review.baker_name}</Text>
        </Link>
        <Rating rating={parseInt(review.rating)} />
      </View>

      <Text style={{ marginBottom: 5, fontSize: 15 }}>{review.review}</Text>
      <View style={styles.control}>
        <Text style={styles.reviewTime}>
          Reviewed on {review.created_at.split("T")[0]}
        </Text>
      </View>
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
    fontSize: 15,
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
  control: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  reviewTime: {
    fontSize: 10,
    textAlign: "right",
  },
});
