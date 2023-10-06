import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { ZodError, z } from "zod";

import { RootStackParamList } from "../components/Nav";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAuthContext } from "../contexts/auth-context";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;
const movieSchema = z.array(
  z.object({
    backdrop_path: z.string(),
    poster_path: z.string(),
    overview: z.string(),
    release_date: z.string(),
    title: z.string(),
    vote_average: z.string(),
  })
);
type Movies = z.infer<typeof movieSchema>;

export default function Movies({ navigation }: Props): JSX.Element {
  const { setToken } = useAuthContext();
  const [movieData, setMovieData] = useState<Movies | null>([]);
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
        if (error instanceof ZodError) {
          setError(new Error("Erreur de validation zod !"));
        } else {
          setError(new Error("An error occured !"));
        }
      }
    };
    fetchData();
  }, []);

  if (error) return <Text> Error : {error.message}</Text>;
  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      {movieData?.map((movies) => {
        return (
          <TouchableOpacity
            key={movies["title"]}
            onPress={() => {
              navigation.navigate("Movie", { data: movies });
            }}
          >
            <View style={styles.rounded}>
              <Text style={styles.button}>{movies["title"]}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
      >
        <View style={styles.round_disc}>
          <Text style={styles.disconnect}>Déconnexion</Text>
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

  button: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  rounded: {
    borderRadius: 10,
    backgroundColor: "#7D007D",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 20,
  },

  disconnect: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  round_disc: {
    padding: 10,
    backgroundColor: "red",
    marginTop: 50,
    borderRadius: 10,
  },
});
