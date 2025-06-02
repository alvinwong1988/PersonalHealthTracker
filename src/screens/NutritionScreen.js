import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

const NutritionScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>NutritionScreen</Text>
    </View>
  );
};

export default NutritionScreen;
