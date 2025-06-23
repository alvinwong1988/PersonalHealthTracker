import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "i18n-js";
import { theme } from "../styles/theme";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const RegistrationScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  if (i18n) {
    i18n.locale = language;
  }

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Validation for empty fields
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert(
        i18n && i18n.t ? i18n.t("error") : "Error",
        i18n && i18n.t ? i18n.t("fillAllFields") : "Please fill in all fields."
      );
      return;
    }

    // Validation for password mismatch
    if (password !== confirmPassword) {
      Alert.alert(
        i18n && i18n.t ? i18n.t("error") : "Error",
        i18n && i18n.t
          ? i18n.t("passwordsDontMatch")
          : "Passwords do not match."
      );
      return;
    }

    // Validation for terms and conditions
    if (!acceptTerms) {
      Alert.alert(
        i18n && i18n.t ? i18n.t("error") : "Error",
        i18n && i18n.t
          ? i18n.t("acceptTermsRequired")
          : "You must accept the Terms and Conditions to register."
      );
      return;
    }

    setLoading(true);
    try {
      // Call the backend API for registration
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: Store token and user data, then navigate to Home
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userId", data.userId);
        await AsyncStorage.setItem("userData", JSON.stringify(data.user));
        Alert.alert(
          i18n && i18n.t ? i18n.t("success") : "Success",
          i18n && i18n.t
            ? i18n.t("registrationSuccessful")
            : "Registration successful!"
        );
        navigation.replace("Home", { language, user: data.user });
      } else {
        // Handle specific API errors
        let errorMessage =
          data.error ||
          (i18n && i18n.t
            ? i18n.t("registrationFailed")
            : "Registration failed. Please try again.");
        if (data.error?.includes("email already exists")) {
          errorMessage =
            i18n && i18n.t
              ? i18n.t("emailAlreadyExists")
              : "This email is already registered.";
        } else if (data.error?.includes("weak password")) {
          errorMessage =
            i18n && i18n.t
              ? i18n.t("weakPassword")
              : "Password is too weak. Use at least 6 characters.";
        }
        Alert.alert(
          i18n && i18n.t ? i18n.t("registrationFailed") : "Registration Failed",
          errorMessage
        );
      }
    } catch (error) {
      console.error("Registration API error:", error);
      Alert.alert(
        i18n && i18n.t ? i18n.t("registrationFailed") : "Registration Failed",
        i18n && i18n.t
          ? i18n.t("networkError")
          : "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigation.navigate("Login", { language });
  };

  const toggleAcceptTerms = () => {
    setAcceptTerms(!acceptTerms);
  };

  return (
    <ScrollView contentContainerStyle={theme.components.container}>
      <Text style={theme.typography.title}>
        {i18n && i18n.t ? i18n.t("register") : "Register"}
      </Text>

      {/* Name Field */}
      <Text
        style={[theme.typography.body, { marginBottom: theme.spacing.small }]}
      >
        {i18n && i18n.t ? i18n.t("name") : "name"}
      </Text>
      <TextInput
        style={theme.components.input}
        value={name}
        onChangeText={setName}
        placeholder={i18n && i18n.t ? i18n.t("enterName") : "Enter Name"}
        autoCapitalize="none"
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
        placeholder={i18n && i18n.t ? i18n.t("enterEmail") : "Enter email"}
        keyboardType="email-address"
        autoCapitalize="none"
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
        placeholder={
          i18n && i18n.t ? i18n.t("enterPassword") : "Enter password"
        }
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
        placeholder={
          i18n && i18n.t ? i18n.t("confirmPassword") : "Confirm password"
        }
        secureTextEntry
      />

      {/* Accept Terms and Conditions with Checkbox */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: theme.spacing.medium,
          marginBottom: theme.spacing.medium,
        }}
      >
        <TouchableOpacity
          onPress={toggleAcceptTerms}
          style={{
            width: 24,
            height: 24,
            borderWidth: 2,
            borderColor: theme.colors.primary,
            borderRadius: 4,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing.small,
            backgroundColor: acceptTerms ? theme.colors.primary : "transparent",
          }}
        >
          {acceptTerms && (
            <Text style={{ color: "#fff", fontSize: 14 }}>✓</Text>
          )}
        </TouchableOpacity>
        <Text style={[theme.typography.body, { flex: 1 }]}>
          {i18n && i18n.t
            ? i18n.t("acceptTerms")
            : "I accept the Terms and Conditions"}
        </Text>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={[
          theme.components.button,
          { marginTop: theme.spacing.medium },
          loading && { opacity: 0.7 },
        ]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={theme.components.buttonText}>
          {loading
            ? i18n && i18n.t
              ? i18n.t("registering")
              : "Registering..."
            : i18n && i18n.t
            ? i18n.t("register")
            : "Register"}
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
