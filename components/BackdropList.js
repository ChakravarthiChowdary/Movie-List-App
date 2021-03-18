import React from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const BACKDROP_HEIGHT = height * 0.6;
const ITEM_SIZE = width * 0.72;

const Backdrop = ({ movies, scrollX }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: "absolute" }}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id + "-backdrop"}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdropImage) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              removeClippedSubviews={false}
              style={{
                ...styles.container,
                transform: [{ translateX }],
              }}
            >
              <Image
                source={{ uri: item.backdropImage }}
                style={styles.image}
              />
            </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["rgba(0, 0, 0, 0)", "white"]}
        style={styles.gradient}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: "absolute", width: width, height, overflow: "hidden" },
  image: {
    width,
    height: BACKDROP_HEIGHT,
    position: "absolute",
  },
  gradient: {
    height: BACKDROP_HEIGHT,
    width,
    position: "absolute",
    bottom: 0,
  },
});

export default React.memo(Backdrop);
