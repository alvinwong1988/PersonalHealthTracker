import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

const WaterTrackerScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>WaterTrackerScreen</Text>
    </View>
  );
};

export default WaterTrackerScreen;
