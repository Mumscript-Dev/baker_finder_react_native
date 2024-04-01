import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Baker, Review } from "../appConfig";
import { useRoute } from "@react-navigation/native";
import { Card } from "@rneui/themed";
import { Rating } from "@/components/Rating";
import ReviewComponent from "@/components/ReviewComponent";

export default function BakerDetail() {
  const [baker, setBaker] = useState<Baker | null>(null);

  interface BakerParams {
    id: string;
  }
  const route = useRoute();
  const params: Readonly<BakerParams | undefined> = route.params;
  console.log(params?.id);
  const userID = "b9bdc08b-5096-4d5c-9954-9e8d827fa252";
  const [map, setMap] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getBaker = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/getbaker", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baker_id: params?.id,
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
  const fetchReviews = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/reviewsByBaker", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baker_id: baker?.baker_id,
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

  const fetchApiKey = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/fetchkey")
      .then((response) => response.json())
      .catch((error) => {
        console.log(error);
      });
  };

  const getMap = (key: string) => {
    const address = `${baker?.address} ${baker?.suburb} ${baker?.postcode}`;
    return fetch(
      `https://dev.virtualearth.net/REST/v1/Locations?CountryRegion=AU&addressLine=${address}&key=${key}`
    )
      .then((res) => res.json())
      .then((res) => {
        // get lat, long from maps api
        const geo =
          res.resourceSets[0].resources[0].point.coordinates.join(",");
        return `https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/${geo}/18?mapSize=1000,1000&pp=${geo};66&mapLayer=Basemap,Buildings&key=${key}`;
      });
  };
  useEffect(() => {
    const start = async () => {
      getBaker().then((data: Baker) => {
        console.log(data);
        if (data) {
          setBaker(data);
        }
      });
      await fetchReviews().then((data) => {
        if (data > 0) {
          console.log(data);
          setReviews(data);
        }
      });
      await fetchApiKey()
        .then((key) =>
          getMap(key.api_key).then((map) => {
            console.log(123, map);
            setMap(map);
          })
        )
        .catch((error) => {
          console.log(error);
        });
    };
    start();
  }, []);

  return (
    <ScrollView>
      {baker && (
        <>
          <Card>
            <View style={styles.info}>
              <Text style={styles.title}>{baker?.name}</Text>
              <Rating rating={4} />
            </View>
            <Text style={{ marginBottom: 10 }}>
              Address: {baker.address} {baker.suburb} {baker.postcode}
            </Text>
            {map && (
              <Card.Image
                source={{ uri: map }}
                style={{ width: "100%", height: 200 }}
              />
            )}
            <Card.Divider />
            <Text>Contact me: {baker.contact}</Text>
            <Text>speciality: {baker.speciality}</Text>
          </Card>
          {reviews.length > 0 ? (
            <>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  marginTop: 30,
                  marginBottom: 5,
                }}
              >
                Reviews
              </Text>
              {reviews.map((review) => (
                <ReviewComponent
                  review={review}
                  userID={userID}
                  key={review.review_id}
                />
              ))}
            </>
          ) : (
            <Text
              style={{
                fontSize: 20,
                textAlign: "center",
                marginTop: 30,
                marginBottom: 5,
              }}
            >
              No review yet
            </Text>
          )}
        </>
      )}
    </ScrollView>
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
    marginTop: 10,
    marginBottom: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  control: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  reviewSection: {
    padding: 10,
    display: "flex",
    justifyContent: "center",
  },
});
