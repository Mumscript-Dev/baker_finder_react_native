import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { Baker } from "../app/appConfig"; // Fix the import path

import { Card, Image } from "@rneui/themed"; // Add this import statement
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function MyBaker({ userID }: { userID: string }) {
  const [baker, setBaker] = useState<Baker | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getBakers = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/getmybaker", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
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
    return fetch("https://baker-finder-go.onrender.com/v1/baker", {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        baker_id: baker_id,
      }),
    })
      .then((response) => {
        setBaker(null);
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateBaker = async (baker_id: string | undefined) => {
    if (!baker_id) return console.log("No baker_id");
    return fetch("https://baker-finder-go.onrender.com/v1/baker", {
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
  const createBaker = async () => {
    return fetch("http://localhost:4000/v1/baker", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: "b9bdc08b-5096-4d5c-9954-9e8d827fa252",
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
    <>
      {/* <View style={styles.info}>
        <Text style={styles.title}>My Baker</Text>
        <FontAwesome name="plus" size={15} onPress={() => createBaker()} />
      </View> */}
      {baker ? (
        <Text style={styles.title}>My Baker</Text>
      ) : (
        <Text style={styles.title} onPress={() => createBaker()}>
          Create a Baker
        </Text>
      )}
      {loading ? (
        <ActivityIndicator />
      ) : (
        baker && (
          // <View style={styles.baker} key={baker?.baker_id}>
          <Card key={baker?.baker_id}>
            <Card.Title style={{ marginBottom: 5, fontSize: 20 }}>
              <View style={styles.info}>
                <Text style={{ marginBottom: 5, fontSize: 20 }}>
                  {baker?.name}
                </Text>
                <View style={styles.control}>
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
                </View>
              </View>
            </Card.Title>

            <Text style={{ marginBottom: 5, fontSize: 15 }}>
              {baker?.address}, {baker?.suburb}, {baker?.postcode}
            </Text>
            <View style={styles.info}>
              <Text style={{ marginBottom: 5, fontSize: 15 }}>
                {baker?.speciality}
              </Text>
              <View style={styles.control}>
                <FontAwesome name="phone" size={15} />
                {baker?.contact}
              </View>
            </View>
            <Card.Image
              source={{ uri: baker?.img }}
              style={{ width: "100%", height: 150 }}
            />
          </Card>
          // </View>
        )
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
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
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
    marginTop: 20,
    marginBottom: 20,
    display: "flex",
  },
  review: {
    marginBottom: 10,
    padding: 10,
    width: 360,
  },
  info: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  control: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
