import React from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Genres from "./Generes";
import Rating from "./Ratings";

const width = Dimensions.get("window").width;

const ITEM_SIZE = width * 0.72;
const SPACING = 8;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const Movie = ({ item, index, scrollX }) => {
  if (!item.name) {
    return <View style={{ width: SPACER_ITEM_SIZE }}></View>;
  }
  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];
  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 0, 100],
  });
  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={{ ...styles.container, transform: [{ translateY }] }}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />

        <Text style={styles.title}>{item.name}</Text>

        <Rating rating={item.rating} />
        <Genres genres={item.generes} />
        <Text style={styles.descriptionText} numberOfLines={3}>
          {item.description}
        </Text>

        <TouchableOpacity
          style={{ width: "100%", marginTop: 10 }}
          activeOpacity={0.8}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Watch Now</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderColor: "tomato",
    borderWidth: 1,
    padding: 5,
    alignItems: "center",
  },
  buttonText: { fontFamily: "Regular", color: "tomato" },
  descriptionText: { fontSize: 12, fontFamily: "Regular" },
  title: { fontFamily: "Bold", fontSize: 14, marginTop: 10 },
  container: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 34,
    borderWidth: 0.5,
    borderColor: "#ccc",
  },
  image: { width: "100%", height: width },
});

export default React.memo(Movie);
