import React from "react";
import { View, Text } from "react-native";
import { theme } from "../../styles/theme"; // Adjust path if different

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>SettingsScreen</Text>
    </View>
  );
};

export default SettingsScreen;
