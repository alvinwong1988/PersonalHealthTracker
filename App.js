import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import * as Localization from "expo-localization";
import i18n from "i18n-js";
import LanguageSelectionScreen from "./src/screens/LanguageSelectionScreen";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import MeasurementScreen from "./src/screens/MeasurementScreen";
import SearchScreen from "./src/screens/SearchScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import TermsOfServiceScreen from "./src/screens/TermsOfServiceScreen";
import PrivacyPolicyScreen from "./src/screens/PrivacyPolicyScreen";
import PersonalInformationScreen from "./src/screens/PersonalInformationScreen";
import SecurityScreen from "./src/screens/SecurityScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import translations
import en from "./translations/en.json";
import cn from "./translations/cn.json";

const Stack = createStackNavigator();

export default function App() {
  const [initialLanguage, setInitialLanguage] = useState("en");
  const [i18nReady, setI18nReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initI18n = () => {
      if (i18n) {
        i18n.translations = { en, cn };
        i18n.fallbacks = true;
        i18n.defaultLocale = "en";

        console.log("i18n initialized successfully");
        setI18nReady(true);
      } else {
        console.error("i18n-js is not loaded properly.");
        setI18nReady(false);
      }
    };
    initI18n();
  }, []);

  useEffect(() => {
    const loadLanguageAndLoginStatus = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          setInitialLanguage(savedLanguage);
        } else {
          const deviceLocale = Localization.getLocales()[0].languageCode;
          setInitialLanguage(deviceLocale === "zh" ? "cn" : "en");
        }

        const loginToken = await AsyncStorage.getItem("userToken");
        setIsLoggedIn(!!loginToken);
      } catch (error) {
        console.error("Error loading language or login status:", error);
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    loadLanguageAndLoginStatus();
  }, []);

  if (i18nReady && i18n) {
    i18n.locale = initialLanguage;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Set initial route based on login status
  //const initialRoute = isLoggedIn ? "Home" : "LanguageSelection";
  const initialRoute = isLoggedIn ? "LanguageSelection" : "LanguageSelection";

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: { fontWeight: "bold" },
          animationEnabled: false,
        }}
      >
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
          name="Login"
          component={LoginScreen}
          options={{
            title: i18nReady && i18n && i18n.t ? i18n.t("login") : "Login",
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegistrationScreen}
          options={{
            title:
              i18nReady && i18n && i18n.t ? i18n.t("register") : "Register",
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            headerLeft: () => null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Measurement"
          component={MeasurementScreen}
          options={{
            title: "Measurement",
            headerLeft: () => null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Profile",
            headerLeft: () => null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            title: "Notification",
            headerLeft: () => null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            title: "Search",
            headerLeft: () => null,
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsOfServiceScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyPolicyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInformationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Security"
          component={SecurityScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
