import React from "react";
import { View, Text } from "react-native";
import { theme } from "../../styles/theme"; // Adjust path if different

const WaterTrackerScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>WaterTrackerScreen</Text>
    </View>
  );
};

export default WaterTrackerScreen;
