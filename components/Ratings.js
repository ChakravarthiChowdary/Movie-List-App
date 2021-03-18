import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const Rating = ({ rating }) => {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("staro");
  const stars = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {stars.map((type, index) => {
        return <AntDesign key={index} name={type} size={14} color="tomato" />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  ratingNumber: { marginRight: 4, fontFamily: "Regular", fontSize: 14 },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Rating;
