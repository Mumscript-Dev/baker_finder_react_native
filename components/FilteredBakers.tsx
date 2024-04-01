import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Baker } from "../app/appConfig";
import { Text } from "@rneui/themed";
import BakersComponent from "./BakerComponent";

export default function FilteredBakers({
  searchResults,
}: {
  searchResults: Baker[];
}) {
  return searchResults.length === 0 ? (
    <>
      <Text style={{ textAlign: "center", margin: 30 }}>
        No bakers found in this suburb
      </Text>
    </>
  ) : (
    searchResults.map((baker: Baker) => (
      <BakersComponent baker={baker} key={baker.baker_id} />
    ))
  );
}
