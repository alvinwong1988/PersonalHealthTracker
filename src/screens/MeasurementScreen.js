import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

const MeasurementScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>MeasurementScreen</Text>
    </View>
  );
};

export default MeasurementScreen;
