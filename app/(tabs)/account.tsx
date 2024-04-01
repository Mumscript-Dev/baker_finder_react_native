import { ScrollView } from "react-native";
import { useEffect, useState } from "react";
import Reviews from "@/components/Reviews";
import { User } from "../appConfig";
import MyBaker from "@/components/MyBaker";

export default function TabTwoScreen() {
  const userID = "eed34d29-ed97-4372-9c18-2f157c71e412";
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getUser = async () => {
    return fetch("https://baker-finder-go.onrender.com/v1/getuser", {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userID,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser().then((data) => {
      if (data) {
        setUser(data);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);
  return (
    <>
      {user?.user_type === "baker" ? (
        <ScrollView>
          <MyBaker userID={userID} />
          <Reviews userID={userID} />
        </ScrollView>
      ) : (
        <ScrollView>
          <Reviews userID={userID} />
        </ScrollView>
      )}
    </>
  );
}
