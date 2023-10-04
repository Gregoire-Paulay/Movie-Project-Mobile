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
  const image = { uri: movie["backdrop_path"] };
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.picture} source={image}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {movie["title"]} / {movie["vote_average"]} / {movie["release_date"]}
          </Text>
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
      resizeMode: "cover",
    },

    textContainer: {
      backgroundColor: "#000000c0",
      justifyContent: "flex-end",
      height: 300,
    },
    title: {
      fontSize: 20,
      marginVertical: 15,
      color: "white",
      justifyContent: "center",
      borderColor: "red",
      borderWidth: 5,
      alignItems: "center",
    },
  });

  return styles;
};
