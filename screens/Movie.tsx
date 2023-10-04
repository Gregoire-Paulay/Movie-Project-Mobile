import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  useWindowDimensions,
} from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";

type Props = NativeStackScreenProps<RootStackParamList, "Movie">;

export default function Movie(props: Props): JSX.Element {
  const movie = props.route.params.data;
  const image = { uri: movie["poster_path"] };
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.picture} source={image} resizeMode="cover">
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {movie["title"]} / {movie["vote_average"]} / {movie["release_date"]}
          </Text>
          <Text style={styles.text}>{movie["overview"]}</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    picture: {
      width: width,
      flex: 1,
      justifyContent: "center",
    },

    textContainer: {
      backgroundColor: "#000000c0",
      justifyContent: "flex-end",
    },
    title: {
      fontSize: 20,
      marginVertical: 15,
      color: "white",
      textAlign: "center",
    },
    text: {
      color: "white",
      marginBottom: 15,
      fontSize: 16,
    },
  });

  return styles;
};
