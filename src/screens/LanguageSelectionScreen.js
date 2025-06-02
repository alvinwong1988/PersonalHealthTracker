import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles/theme";

const LanguageSelectionScreen = ({ navigation }) => {
  const [language, setLanguage] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginToken = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!loginToken);
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLanguageSelect = async (selectedLanguage) => {
    setLanguage(selectedLanguage);
    try {
      await AsyncStorage.setItem("selectedLanguage", selectedLanguage);
      if (isLoggedIn) {
        navigation.replace("Home", { language: selectedLanguage });
      } else {
        navigation.replace("Login", { language: selectedLanguage });
      }
    } catch (error) {
      console.error("Error saving language:", error);
      navigation.replace("Login", { language: selectedLanguage });
    }
  };

  return (
    <View style={theme.components.container}>
      <Text
        style={[theme.typography.title, { marginBottom: theme.spacing.large }]}
      >
        Select Your Language
      </Text>
      <TouchableOpacity
        style={[
          theme.components.button,
          { marginBottom: theme.spacing.medium },
        ]}
        onPress={() => handleLanguageSelect("en")}
      >
        <Text style={theme.components.buttonText}>English</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={theme.components.button}
        onPress={() => handleLanguageSelect("cn")}
      >
        <Text style={theme.components.buttonText}>中文 (Chinese)</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSelectionScreen;
