import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";

const HealthLogScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>HealthLogScreen</Text>
    </View>
  );
};

export default HealthLogScreen;
