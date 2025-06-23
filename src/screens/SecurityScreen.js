// src/screens/SecurityScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import { theme } from "../styles/theme";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const SecurityScreen = ({ navigation }) => {
  // State management
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [loginAlertsEnabled, setLoginAlertsEnabled] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Ad
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnrolled, setIsBiometricEnrolled] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load user data and token
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token || "");
        const userDataString = await AsyncStorage.getItem("userData");
        if (userDataString) {
          setUserData(JSON.parse(userDataString));
        }

        // Check biometric support and enrollment
        const compatible = await LocalAuthentication.hasHardwareAsync();
        setIsBiometricSupported(compatible);
        if (compatible) {
          const enrolled = await LocalAuthentication.isEnrolledAsync();
          setIsBiometricEnrolled(enrolled);
          // Load stored preference only if biometrics are supported and enrolled
          if (enrolled) {
            const storedPreference = await AsyncStorage.getItem(
              "biometricEnabled"
            );
            setBiometricEnabled(storedPreference === "true");
          } else {
            setBiometricEnabled(false);
          }
        } else {
          setBiometricEnabled(false);
        }
      } catch (error) {
        console.error("Error loading data or checking biometrics:", error);
        Alert.alert(
          "Error",
          "Failed to load security settings: " + error.message
        );
      }
    };

    loadData();
  }, []);

  const handleBiometricToggle = async (value) => {
    if (!isBiometricSupported) {
      Alert.alert(
        "Unsupported",
        "Biometric authentication is not supported on this device."
      );
      return;
    }

    if (!isBiometricEnrolled) {
      Alert.alert(
        "Not Enrolled",
        "No biometric data enrolled. Please set up biometric authentication in your device settings."
      );
      return;
    }

    try {
      if (value) {
        // Test biometric authentication before enabling
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Authenticate to enable biometric login",
          fallbackLabel: "Use Passcode",
        });

        if (result.success) {
          await AsyncStorage.setItem("biometricEnabled", "true");
          setBiometricEnabled(true);
          Alert.alert("Success", "Biometric login enabled.");
        } else {
          Alert.alert(
            "Authentication Failed",
            "Could not enable biometric login. Please try again."
          );
        }
      } else {
        await AsyncStorage.setItem("biometricEnabled", "false");
        setBiometricEnabled(false);
        Alert.alert("Success", "Biometric login disabled.");
      }
    } catch (error) {
      console.error("Error handling biometric toggle:", error);
      Alert.alert(
        "Error",
        "Failed to update biometric settings: " + error.message
      );
    }
  };
  // Security Item Component
  const SecurityItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
    rightComponent,
    danger = false,
  }) => (
    <TouchableOpacity
      style={[theme.security.item, danger && theme.security.dangerItem]}
      onPress={onPress}
    >
      <View style={theme.security.itemLeft}>
        <Text style={theme.security.itemIcon}>{icon}</Text>
        <View style={theme.security.itemTextContainer}>
          <Text
            style={[
              theme.security.itemTitle,
              danger && theme.security.dangerText,
            ]}
          >
            {title}
          </Text>
          {subtitle && (
            <Text style={theme.security.itemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      <View style={theme.security.itemRight}>
        {rightComponent}
        {showArrow && <Text style={theme.security.arrow}>›</Text>}
      </View>
    </TouchableOpacity>
  );

  // Section Component
  const SecuritySection = ({ title, children }) => (
    <View style={theme.security.section}>
      {title && <Text style={theme.security.sectionTitle}>{title}</Text>}
      {children}
    </View>
  );

  // Call handleInputChange when focus moves away (onBlur)
  const handleBlur = () => {
    if (localValue !== value) {
      handleInputChange(field, localValue);
    }
  };
  // Password Change Modal
  const PasswordModal = () => (
    <Modal
      visible={showPasswordModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={theme.security.modalcontainer}>
        <View style={theme.security.modalHeader}>
          <TouchableOpacity onPress={() => setShowPasswordModal(false)}>
            <Text style={theme.security.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={theme.security.modalTitle}>Change Password</Text>
          <TouchableOpacity
            onPress={handlePasswordChange}
            disabled={isLoading} // Disable Save button during loading
          >
            <Text
              style={[
                theme.security.modalSave,
                isLoading && { opacity: 0.5 }, // Visual feedback for disabled state
              ]}
            >
              {isLoading ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={theme.security.modalContent}>
          <View style={theme.security.inputContainer}>
            <Text style={theme.security.inputLabel}>Current Password</Text>
            <TextInput
              style={theme.security.input}
              value={passwordData.currentPassword}
              onChangeText={(text) =>
                setPasswordData((prev) => ({ ...prev, currentPassword: text }))
              }
              placeholder="Enter current password"
              secureTextEntry
              editable={!isLoading} // Disable input during loading
            />
          </View>

          <View style={theme.security.inputContainer}>
            <Text style={theme.security.inputLabel}>New Password</Text>
            <TextInput
              style={theme.security.input}
              value={passwordData.newPassword}
              onChangeText={(text) =>
                setPasswordData((prev) => ({ ...prev, newPassword: text }))
              }
              placeholder="Enter new password"
              secureTextEntry
              editable={!isLoading} // Disable input during loading
            />
          </View>

          <View style={theme.security.inputContainer}>
            <Text style={theme.security.inputLabel}>Confirm New Password</Text>
            <TextInput
              style={theme.security.input}
              value={passwordData.confirmPassword}
              onChangeText={(text) =>
                setPasswordData((prev) => ({ ...prev, confirmPassword: text }))
              }
              placeholder="Confirm new password"
              secureTextEntry
              editable={!isLoading} // Disable input during loading
            />
          </View>

          <View style={theme.security.passwordRequirements}>
            <Text style={theme.security.requirementsTitle}>
              Password Requirements:
            </Text>
            <Text style={theme.security.requirementItem}>
              • At least 8 characters
            </Text>
            <Text style={theme.security.requirementItem}>
              • Include uppercase and lowercase letters
            </Text>
            <Text style={theme.security.requirementItem}>
              • Include at least one number
            </Text>
            <Text style={theme.security.requirementItem}>
              • Include at least one special character
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // Handle password change
  const handlePasswordChange = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long");
      return;
    }
    // Step 2: Check if user data and email are available
    if (!userData || !userData.email) {
      Alert.alert(
        "Error",
        "User information not available. Please log in again."
      );
      return;
    }

    try {
      // Step 3: Make API call to /change-password
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          email: userData.email,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      // Step 4: Handle successful response
      if (response.status === 200) {
        Alert.alert("Success", "Password changed successfully", [
          {
            text: "OK",
            onPress: () => {
              setShowPasswordModal(false);
              setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
              });
            },
          },
        ]);
      }
    } catch (error) {
      // Step 5: Handle errors from API call
      console.error(
        "Error changing password:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.error ||
        "Failed to change password. Please try again.";
      if (error.response?.status === 401) {
        Alert.alert("Error", "Current password is incorrect");
      } else if (error.response?.status === 404) {
        Alert.alert("Error", "User not found. Please log in again.");
      } else {
        Alert.alert("Error", errorMessage);
      }
    }
  };

  // Handle 2FA toggle
  const handle2FAToggle = (value) => {
    if (value) {
      Alert.alert(
        "Enable Two-Factor Authentication",
        "You'll receive a verification code via SMS or authenticator app",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Enable",
            onPress: () => {
              setTwoFactorEnabled(true);
              Alert.alert("Success", "Two-factor authentication enabled");
            },
          },
        ]
      );
    } else {
      Alert.alert(
        "Disable Two-Factor Authentication",
        "This will make your account less secure",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Disable",
            style: "destructive",
            onPress: () => setTwoFactorEnabled(false),
          },
        ]
      );
    }
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account",
      "This action cannot be undone. All your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Final Confirmation",
              "Are you absolutely sure you want to delete your account?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Yes, Delete",
                  style: "destructive",
                  onPress: () => {
                    // Add your account deletion logic here
                    Alert.alert(
                      "Account Deleted",
                      "Your account has been deleted"
                    );
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={theme.security.container}>
      {/* Header */}
      <View style={theme.security.header}>
        <TouchableOpacity
          style={theme.security.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={theme.security.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={theme.security.headerTitle}>Privacy & Security</Text>
        <View style={theme.security.headerSpacer} />
      </View>

      <ScrollView
        style={theme.security.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Security Status */}
        <View style={theme.security.statusCard}>
          <Text style={theme.security.statusTitle}>🛡️ Security Status</Text>
          <Text style={theme.security.statusSubtitle}>
            Your account is{" "}
            {twoFactorEnabled && biometricEnabled ? "highly" : "moderately"}{" "}
            secure
          </Text>
          <View style={theme.security.statusIndicator}>
            <View
              style={[
                theme.security.statusBar,
                {
                  width: `${
                    twoFactorEnabled && biometricEnabled
                      ? 90
                      : biometricEnabled || twoFactorEnabled
                      ? 60
                      : 30
                  }%`,
                  backgroundColor:
                    twoFactorEnabled && biometricEnabled
                      ? "#4CAF50"
                      : biometricEnabled || twoFactorEnabled
                      ? "#FF9800"
                      : "#F44336",
                },
              ]}
            />
          </View>
        </View>

        {/* Authentication Section */}
        <SecuritySection title="Authentication">
          <SecurityItem
            icon="🔑"
            title="Change Password"
            subtitle="Last changed 30 days ago"
            onPress={() => setShowPasswordModal(true)}
          />

          {/* <SecurityItem
            icon="📱"
            title="Two-Factor Authentication"
            subtitle={twoFactorEnabled ? "Enabled" : "Disabled"}
            onPress={() => {}}
            showArrow={false}
            rightComponent={
              <Switch
                value={twoFactorEnabled}
                onValueChange={handle2FAToggle}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor={twoFactorEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
          /> */}

          <SecurityItem
            icon="👆"
            title="Biometric Login"
            subtitle={
              isBiometricSupported
                ? isBiometricEnrolled
                  ? "Face ID / Fingerprint"
                  : "Not enrolled on device"
                : "Not supported on device"
            }
            onPress={() => {}} // Empty since Switch handles the action
            showArrow={false}
            rightComponent={
              <Switch
                value={biometricEnabled}
                onValueChange={handleBiometricToggle}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor={biometricEnabled ? "#ffffff" : "#f4f3f4"}
                disabled={!isBiometricSupported || !isBiometricEnrolled}
              />
            }
          />
        </SecuritySection>

        {/* Privacy Section */}
        <SecuritySection title="Privacy">
          <SecurityItem
            icon="🔔"
            title="Login Alerts"
            subtitle="Get notified of new logins"
            onPress={() => {}}
            showArrow={false}
            rightComponent={
              <Switch
                value={loginAlertsEnabled}
                onValueChange={setLoginAlertsEnabled}
                trackColor={{ false: "#767577", true: "#4CAF50" }}
                thumbColor={loginAlertsEnabled ? "#ffffff" : "#f4f3f4"}
              />
            }
          />

          <SecurityItem
            icon="📊"
            title="Data & Privacy"
            subtitle="Control your data usage"
            onPress={() =>
              Alert.alert("Data & Privacy", "Data privacy settings")
            }
          />

          <SecurityItem
            icon="🌐"
            title="Connected Apps"
            subtitle="Manage third-party access"
            onPress={() => Alert.alert("Connected Apps", "No connected apps")}
          />
        </SecuritySection>

        {/* Account Management */}
        <SecuritySection title="Account Management">
          <SecurityItem
            icon="📥"
            title="Download My Data"
            subtitle="Export your account data"
            onPress={() =>
              Alert.alert(
                "Download Data",
                "Data export will be sent to your email"
              )
            }
          />

          <SecurityItem
            icon="🚪"
            title="Sign Out All Devices"
            subtitle="Sign out from all devices"
            onPress={() =>
              Alert.alert(
                "Sign Out All Devices",
                "You'll need to sign in again on all devices",
                [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Sign Out",
                    onPress: () =>
                      Alert.alert("Success", "Signed out from all devices"),
                  },
                ]
              )
            }
          />
        </SecuritySection>

        {/* Danger Zone */}
        <SecuritySection title="Danger Zone">
          <SecurityItem
            icon="🗑️"
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={handleDeleteAccount}
            showArrow={false}
            danger={true}
          />
        </SecuritySection>

        <View style={theme.security.bottomSpacing} />
      </ScrollView>

      {/* Password Change Modal */}
      <PasswordModal />
    </SafeAreaView>
  );
};

export default SecurityScreen;
