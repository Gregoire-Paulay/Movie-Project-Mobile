import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
} from "react-native";
import axios from "axios";

import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, "Movies">;

export default function Movies({ navigation }: Props): JSX.Element {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4009/movies");
        // console.log(response.data);
        setMovieData(response.data);
        setError(null);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setError(error);
        }
      }
    };
    fetchData();
  }, []);

  if (error) return <Text> Error : {error.message}</Text>;
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      {movieData.map((movies) => {
        return (
          <Button
            key={movies["title"]}
            title={movies["title"]}
            onPress={() => {
              navigation.navigate("Movie", { token: "12", data: movies });
            }}
          />
        );
      })}
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
