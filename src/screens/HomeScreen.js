import React from "react";
import { theme } from "./src/styles/theme";
import { View, Text } from "react-native";

const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen - Personal Health Tracker</Text>
    </View>
  );
};

export default HomeScreen;
