import React from "react";
import { View, Text } from "react-native";

const Error = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontFamily: "Bold", color: "tomato" }}>
        Something error happened!
      </Text>
    </View>
  );
};

export default Error;
