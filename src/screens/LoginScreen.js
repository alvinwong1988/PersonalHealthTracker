import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { theme } from "../styles/theme";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const LoginScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  if (i18n) {
    i18n.locale = language;
  }

  const [email, setEmail] = useState(""); // Changed from username to email for compatibility
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUsernamePasswordLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        i18n && i18n.t ? i18n.t("error") : "Error",
        i18n && i18n.t
          ? i18n.t("emailAndPasswordRequired")
          : "Please enter email and password."
      );
      return;
    }

    setLoading(true);
    try {
      // Call the Express backend /login API directly
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Success: Store token and user data, then navigate to Home
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userId", data.userId);
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        navigation.replace("Home", { language, user: data.user });
      } else {
        // Handle error from backend (e.g., invalid credentials)
        Alert.alert(
          i18n && i18n.t ? i18n.t("loginFailed") : "Login Failed",
          data.error ||
            (i18n && i18n.t
              ? i18n.t("invalidCredentials")
              : "Invalid email or password.")
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert(
        i18n && i18n.t ? i18n.t("loginFailed") : "Login Failed",
        i18n && i18n.t
          ? i18n.t("networkError")
          : "Network error. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    Alert.alert(
      i18n && i18n.t ? i18n.t("comingSoon") : "Coming Soon",
      i18n && i18n.t
        ? i18n.t("googleSignInNotImplemented")
        : "Google Sign-In is not yet implemented. Coming soon!"
    );
    AsyncStorage.setItem("userToken", "mock_google_token").then(() => {
      navigation.replace("Home", { language });
    });
  };

  const handleDummyLogin = async () => {
    try {
      await AsyncStorage.setItem("userToken", "dummy-token");
      console.log("Dummy login successful, navigating to Home");
      navigation.replace("Home", { language });
    } catch (error) {
      console.error("Error during dummy login:", error);
      Alert.alert(
        i18n && i18n.t ? i18n.t("error") : "Error",
        i18n && i18n.t
          ? i18n.t("dummyLoginFailed")
          : "Dummy login failed. Please try again."
      );
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

      {/* Email and Password Login */}
      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("email") : "Email"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={email}
        onChangeText={setEmail}
        placeholder={i18n && i18n.t ? i18n.t("enterEmail") : "Enter email"}
        keyboardType="email-address"
        autoCapitalize="none"
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
        placeholder={
          i18n && i18n.t ? i18n.t("enterPassword") : "Enter password"
        }
        secureTextEntry
      />

      {/* Login Button */}
      <TouchableOpacity
        style={[theme.components.button, loading && { opacity: 0.7 }]}
        onPress={handleUsernamePasswordLogin}
        disabled={loading}
      >
        <Text style={theme.components.buttonText}>
          {loading
            ? i18n && i18n.t
              ? i18n.t("loggingIn")
              : "Logging in..."
            : i18n && i18n.t
            ? i18n.t("login")
            : "Login"}
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
          {i18n && i18n.t ? i18n.t("dummyLogin") : "Dummy Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
