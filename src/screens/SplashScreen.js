import React from "react";
import { View, Text } from "react-native";
import { theme } from "../../styles/theme"; // Adjust path if different

const SplashScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>SplashScreen</Text>
    </View>
  );
};

export default SplashScreen;
