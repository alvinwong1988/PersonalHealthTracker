import React from "react";
import { View, Text } from "react-native";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const HomeScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };

  return (
    <View style={{ flex: 1 }}>
      <View style={theme.components.container}>
        <Text style={theme.typography.title}>Welcome to Home Screen</Text>
        <Text style={theme.typography.body}>Language: {language}</Text>
      </View>
      <Footer navigation={navigation} activeTab="Home" />
    </View>
  );
};

export default HomeScreen;
