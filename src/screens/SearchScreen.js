import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { theme } from "../styles/theme";
import Footer from "../components/Footer"; // Double-check this path

const SearchScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <View style={[theme.components.container, { flex: 1 }]}>
        <Text style={theme.typography.title}>Welcome to Search Screen</Text>
        <Text style={theme.typography.body}>Language: {language}</Text>
      </View>

      <Footer navigation={navigation} activeTab="Search" />
    </SafeAreaView>
  );
};

export default SearchScreen;
