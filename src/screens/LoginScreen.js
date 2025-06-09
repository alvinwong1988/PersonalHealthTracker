import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { theme } from "../styles/theme";

const LoginScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  if (i18n) {
    i18n.locale = language;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernamePasswordLogin = async () => {
    if (username && password) {
      try {
        await AsyncStorage.setItem("userToken", "mock_token");
        navigation.replace("Home", { language });
      } catch (error) {
        console.error("Error storing login token:", error);
        alert("Login failed. Please try again.");
      }
    } else {
      alert("Please enter username and password.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google Sign-In is not yet implemented. Coming soon!");
    AsyncStorage.setItem("userToken", "mock_google_token").then(() => {
      navigation.replace("Home", { language });
    });
  };

  // Dummy login function to navigate to HomeScreen
  const handleDummyLogin = async () => {
    try {
      // Simulate saving a user token (dummy login)
      await AsyncStorage.setItem("userToken", "dummy-token");
      console.log("Dummy login successful, navigating to Home");
      // Navigate to HomeScreen with a language parameter if needed
      //navigation.replace("Home", { language: "en" });
    } catch (error) {
      console.error("Error during dummy login:", error);
    }
  };

  const handleRegister = () => {
    navigation.navigate("Register", { language });
  };

  return (
    <View style={theme.components.container}>
      <Text style={theme.typography.title}>
        {i18n && i18n.t ? i18n.t("login") : "Login"}
      </Text>

      {/* Username and Password Login */}
      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("username") : "Username"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter username"
      />

      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("password") : "Password"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter password"
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={theme.components.button}
        onPress={handleUsernamePasswordLogin}
      >
        <Text style={theme.components.buttonText}>
          {i18n && i18n.t ? i18n.t("login") : "Login"}
        </Text>
      </TouchableOpacity>

      <Text
        style={[
          theme.typography.body,
          {
            textAlign: "center",
            marginVertical: theme.spacing.large,
            color: theme.colors.textSecondary,
          },
        ]}
      >
        {i18n && i18n.t ? i18n.t("or") : "OR"}
      </Text>

      {/* Google SSO Login Button with Icon */}
      <TouchableOpacity
        style={[theme.components.googleButton, theme.shadows.light]}
        onPress={handleGoogleLogin}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/color/48/000000/google-logo.png",
          }}
          style={theme.components.googleIcon}
        />
        <Text style={theme.components.googleText}>
          {i18n && i18n.t ? i18n.t("loginWithGoogle") : "Login with Google"}
        </Text>
      </TouchableOpacity>

      {/* Registration Link */}
      <TouchableOpacity
        onPress={handleRegister}
        style={{ marginTop: theme.spacing.medium, alignItems: "center" }}
      >
        <Text
          style={[
            theme.typography.body,
            { color: theme.colors.primary, textDecorationLine: "underline" },
          ]}
        >
          {i18n && i18n.t
            ? i18n.t("dontHaveAccount")
            : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
      {/* Dummy Login Button */}
      <TouchableOpacity
        style={theme.components.button}
        onPress={handleDummyLogin}
      >
        <Text style={theme.components.buttonText}>
          {i18n && i18n.t ? i18n.t("Dummy login") : "Dummy Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
