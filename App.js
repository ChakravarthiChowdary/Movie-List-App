import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { useFonts } from "expo-font";

import reducer from "./store/reducer";
import MoviesList from "./screens/MoviesList";

const store = createStore(reducer, applyMiddleware(thunk));

export default function App() {
  const [loaded] = useFonts({
    Regular: require("./assets/fonts/Poppins-Regular.ttf"),
    Medium: require("./assets/fonts/Poppins-Medium.ttf"),
    Bold: require("./assets/fonts/Poppins-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <View style={styles.container}>
        <MoviesList />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
});
