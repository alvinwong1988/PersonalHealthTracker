import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import LanguageSelectionScreen from "./src/screens/LanguageSelectionScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translations
import en from "./translations/en.json";
import cn from "./translations/cn.json";

// Placeholder Home screen
const HomeScreen = ({ route }) => {
  const { language } = route.params || { language: "en" };
  if (i18n) {
    i18n.locale = language;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 24 }}>
        {i18n && i18n.t
          ? i18n.t("welcome")
          : "Welcome (translation unavailable)"}
      </Text>
      <Text style={{ fontSize: 18 }}>Language: {language}</Text>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [initialLanguage, setInitialLanguage] = useState("en");
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    // Initialize i18n after a short delay to ensure module is loaded
    const initI18n = () => {
      if (i18n) {
        i18n.translations = { en, cn };
        i18n.fallbacks = true;
        setI18nReady(true);
      } else {
        console.error("i18n-js is not loaded properly.");
        setI18nReady(false);
      }
    };
    initI18n();
  }, []);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          setInitialLanguage(savedLanguage);
        } else {
          const deviceLocale = Localization.getLocales()[0].languageCode;
          setInitialLanguage(deviceLocale === "zh" ? "cn" : "en");
        }
      } catch (error) {
        console.error("Error loading language:", error);
      }
    };
    loadLanguage();
  }, []);

  if (i18nReady && i18n) {
    i18n.locale = initialLanguage;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LanguageSelection">
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
          options={{
            title:
              i18nReady && i18n && i18n.t
                ? i18n.t("selectLanguage")
                : "Select Language",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
