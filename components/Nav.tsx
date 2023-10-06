import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { StatusBar } from "react-native";
// import type { StatusBarStyle } from "react-native";

// Context
import { useAuthContext } from "../contexts/auth-context";

// Header
import CustomGoBack from "./GoBackCustom";
// Screen
import Login from "../screens/Login";
import Movie from "../screens/Movie";
import Home from "../screens/Home";

// React
import { useState, useEffect } from "react";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Movie: { data: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Nav(): JSX.Element {
  const { userToken, setUserToken, setToken } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      setUserToken(userToken);
      setIsLoading(false);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!userToken ? (
          <Stack.Screen
            name="Login"
            component={Login}
            options={() => ({
              headerShown: false,
            })}
          />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={() => ({
                headerShown: false,
              })}
            />
            <Stack.Screen
              name="Movie"
              component={Movie}
              options={() => ({
                headerLeft: () => <CustomGoBack />,
                headerStyle: {
                  backgroundColor: "black",
                },
                headerTintColor: "#fff",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
