import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { RootStackParamList } from "../components/Nav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/auth-context";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export default function Login({}: Props): JSX.Element {
  const { setToken } = useAuthContext();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setToken("mySecretToken");
        }}
      >
        <View style={styles.rounded}>
          <Text style={styles.connect}>Connexion</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222222",
  },

  connect: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  rounded: {
    borderRadius: 10,
    backgroundColor: "green",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
  },
});
