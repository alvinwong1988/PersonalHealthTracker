import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={theme.components.container}>
        <Text style={theme.typography.title}>Profile Screen</Text>
      </View>
      <Footer navigation={navigation} activeTab="Profile" />
    </View>
  );
};

export default ProfileScreen;
