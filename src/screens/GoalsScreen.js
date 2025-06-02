import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

const GoalsScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>GoalsScreen</Text>
    </View>
  );
};

export default GoalsScreen;
