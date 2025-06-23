import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";
//import { API_URL } from "react-native-dotenv";
//import { API_URL } from "@env";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

const API_URL = Constants.expoConfig.extra.API_URL;

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [serverStatus, setServerStatus] = useState("Not Tested");
  const [isTesting, setIsTesting] = useState(false);
  const [userData, setUserData] = useState({
    name: "Loading...",
    email: "Loading...",
    phone: "",
    avatar: null,
    memberSince: "Loading...",
  });

  // Check notification permission on component mount
  useEffect(() => {
    checkNotificationPermission();
    loadUserData();
  }, []);

  // Function to check and request notification permission
  const checkNotificationPermission = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status === "granted") {
        setNotificationsEnabled(true);
      } else {
        setNotificationsEnabled(false);
      }
    } catch (error) {
      console.error("Error checking notification permission:", error);
      setNotificationsEnabled(false);
    }
  };

  // Function to toggle notifications and request permission if needed
  const toggleNotifications = async (value) => {
    if (value) {
      try {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
          },
        });
        if (status === "granted") {
          setNotificationsEnabled(true);
          // Optionally save to AsyncStorage if you want to persist the setting
          await AsyncStorage.setItem("notificationsEnabled", "true");
        } else {
          Alert.alert(
            "Permission Denied",
            "Notification permissions were not granted. You can enable them in your device settings."
          );
          setNotificationsEnabled(false);
        }
      } catch (error) {
        console.error("Error requesting notification permission:", error);
        Alert.alert("Error", "Failed to request notification permissions.");
        setNotificationsEnabled(false);
      }
    } else {
      setNotificationsEnabled(false);
      await AsyncStorage.setItem("notificationsEnabled", "false");
    }
  };

  // Function to load user data from AsyncStorage
  const loadUserData = async () => {
    try {
      const storedUserData = await AsyncStorage.getItem("userData");
      if (storedUserData) {
        const parsedData = JSON.parse(storedUserData);
        setUserData({
          name: parsedData.name || "Unknown User",
          email: parsedData.email || "No email provided",
          phone: parsedData.phoneNumber || parsedData.phone || "",
          avatar: parsedData.avatar || null,
          memberSince: parsedData.memberSince || "N/A",
        });
      } else {
        setUserData({
          name: "User Not Found",
          email: "No data available",
          phone: "",
          avatar: null,
          memberSince: "N/A",
        });
        Alert.alert(
          "Data Unavailable",
          "User data could not be loaded. Please log in again."
        );
      }
    } catch (error) {
      console.error("Error loading user data from AsyncStorage:", error);
      setUserData({
        name: "Error",
        email: "Failed to load data",
        phone: "",
        avatar: null,
        memberSince: "N/A",
      });
      Alert.alert(
        "Error",
        "Failed to load user data. Please try logging in again."
      );
    }
  };

  // Function to test server connection
  const testServerConnection = async () => {
    setIsTesting(true);
    setServerStatus("Testing...");
    try {
      const response = await fetch(`${API_URL}/test`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 seconds timeout
      });
      if (response.ok) {
        const data = await response.json();
        setServerStatus(`Success: ${JSON.stringify(data).slice(0, 50)}...`);
      } else {
        setServerStatus(`Failed: Status ${response.status}`);
      }
    } catch (error) {
      console.error("Server connection error:", error);
      setServerStatus(`Error: ${error.message}`);
    } finally {
      setIsTesting(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            // Clear user authentication data
            await AsyncStorage.multiRemove([
              "userToken",
              "userData",
              "refreshToken",
              "userPreferences",
            ]);
            // Navigate to Login
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert(
              "Error",
              "Failed to logout properly. Please try again."
            );
          }
        },
      },
    ]);
  };

  const ProfileItem = ({
    icon,
    title,
    subtitle,
    onPress,
    showArrow = true,
  }) => (
    <TouchableOpacity style={theme.profile.profileItem} onPress={onPress}>
      <View style={theme.profile.profileItemLeft}>
        {icon && <Text style={theme.profile.profileItemIcon}>{icon}</Text>}
        <View style={theme.profile.profileItemText}>
          <Text style={theme.profile.profileItemTitle}>{title}</Text>
          {subtitle && (
            <Text style={theme.profile.profileItemSubtitle}>{subtitle}</Text>
          )}
        </View>
      </View>
      {showArrow && <Text style={theme.profile.arrow}>›</Text>}
    </TouchableOpacity>
  );

  const SettingItem = ({ icon, title, value, onToggle }) => (
    <View style={theme.profile.settingItem}>
      <View style={theme.profile.profileItemLeft}>
        {icon && <Text style={theme.profile.profileItemIcon}>{icon}</Text>}
        <Text style={theme.profile.profileItemTitle}>{title}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{
          false: theme.colors.switchTrackFalse,
          true: theme.colors.success,
        }}
        thumbColor={value ? "#ffffff" : theme.colors.switchThumbFalse}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={theme.profile.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={theme.profile.profileHeader}>
          <View style={theme.profile.avatarContainer}>
            {userData.avatar ? (
              <Image
                source={{ uri: userData.avatar }}
                style={theme.profile.avatar}
              />
            ) : (
              <View style={theme.profile.avatarPlaceholder}>
                <Text style={theme.profile.avatarText}>
                  {userData.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <TouchableOpacity style={theme.profile.editAvatarButton}>
              <Text style={theme.profile.editAvatarText}>📷</Text>
            </TouchableOpacity>
          </View>
          <Text style={theme.profile.userName}>{userData.name}</Text>
          <Text style={theme.profile.userEmail}>{userData.email}</Text>
          <Text style={theme.profile.memberSince}>
            Member since {userData.memberSince}
          </Text>
        </View>

        {/* Account Section */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>Account</Text>
          <ProfileItem
            icon="👤"
            title="Personal Information"
            subtitle="Name, email, phone"
            onPress={() => navigation.navigate("PersonalInfo")}
          />
          <ProfileItem
            icon="🔒"
            title="Privacy & Security"
            subtitle="Password"
            onPress={() => navigation.navigate("Security")}
          />
        </View>

        {/* Preferences Section */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>Preferences</Text>
          <SettingItem
            icon="🔔"
            title="Push Notifications"
            value={notificationsEnabled}
            onToggle={toggleNotifications}
          />
          <ProfileItem
            icon="🌐"
            title="Language"
            subtitle="English"
            onPress={() => navigation.navigate("LanguageSelection")}
          />
        </View>

        {/* Support Section */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>Support</Text>
          <ProfileItem icon="❓" title="Help Center" />
          <ProfileItem icon="📧" title="Contact Us" />
          <ProfileItem icon="⭐" title="Rate App" />
        </View>

        {/* About Section */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>About</Text>
          <ProfileItem
            icon="📄"
            title="Terms of Service"
            onPress={() => navigation.navigate("Terms")}
          />
          <ProfileItem
            icon="🔐"
            title="Privacy Policy"
            onPress={() => navigation.navigate("Privacy")}
          />
          <ProfileItem
            icon="ℹ️"
            title="App Version"
            subtitle="1.0.0"
            showArrow={false}
          />
        </View>

        {/* Debug Section - Server Connection Test */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>Debug</Text>
          <ProfileItem
            icon="🌐"
            title="Test Server Connection"
            subtitle={serverStatus}
            onPress={testServerConnection}
            showArrow={false}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={theme.profile.logoutButton}
          onPress={handleLogout}
        >
          <Text style={theme.profile.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Bottom spacing for footer */}
        <View style={theme.profile.bottomSpacing} />
      </ScrollView>

      <Footer navigation={navigation} activeTab="Profile" />
    </View>
  );
};

export default ProfileScreen;
