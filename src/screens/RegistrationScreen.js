import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { theme } from "../styles/theme";

const RegistrationScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  if (i18n) {
    i18n.locale = language;
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert(
        i18n && i18n.t ? i18n.t("fillAllFields") : "Please fill in all fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert(
        i18n && i18n.t
          ? i18n.t("passwordsDontMatch")
          : "Passwords do not match."
      );
      return;
    }

    // Mock registration logic (replace with actual API call in production)
    try {
      await AsyncStorage.setItem("userToken", "mock_registered_token");
      await AsyncStorage.setItem(
        "registeredUser",
        JSON.stringify({ username, email })
      );
      alert(
        i18n && i18n.t
          ? i18n.t("registrationSuccessful")
          : "Registration successful!"
      );
      navigation.replace("Home", { language });
    } catch (error) {
      console.error("Error storing registration data:", error);
      alert(
        i18n && i18n.t
          ? i18n.t("registrationFailed")
          : "Registration failed. Please try again."
      );
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login", { language });
  };

  return (
    <ScrollView contentContainerStyle={theme.components.container}>
      <Text style={theme.typography.title}>
        {i18n && i18n.t ? i18n.t("register") : "Register"}
      </Text>

      {/* Username Field */}
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

      {/* Email Field */}
      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("email") : "Email"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter email"
        keyboardType="email-address"
      />

      {/* Password Field */}
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

      {/* Confirm Password Field */}
      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("confirmPassword") : "Confirm Password"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        secureTextEntry
      />

      {/* Register Button */}
      <TouchableOpacity
        style={[theme.components.button, { marginTop: theme.spacing.medium }]}
        onPress={handleRegister}
      >
        <Text style={theme.components.buttonText}>
          {i18n && i18n.t ? i18n.t("register") : "Register"}
        </Text>
      </TouchableOpacity>

      {/* Back to Login Link */}
      <TouchableOpacity
        onPress={handleBackToLogin}
        style={{ marginTop: theme.spacing.medium, alignItems: "center" }}
      >
        <Text
          style={[
            theme.typography.body,
            { color: theme.colors.primary, textDecorationLine: "underline" },
          ]}
        >
          {i18n && i18n.t
            ? i18n.t("alreadyHaveAccount")
            : "Already have an account? Login"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegistrationScreen;
