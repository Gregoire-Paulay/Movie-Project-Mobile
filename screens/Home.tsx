import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function Home({ navigation }: Props): JSX.Element {
  return (
    <View style={styles.container}>
      <Button
        title="Accéder à mes films"
        onPress={() => {
          navigation.navigate("Movies", {
            token: "12",
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
