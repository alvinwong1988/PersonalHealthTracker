import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Alert,
} from "react-native";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const ProfileScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  // Mock user data - replace with actual user data from your state/context
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    avatar: null, // You can add actual image URI here
    memberSince: "January 2024",
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Add your logout logic here
          navigation.navigate("Login");
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
          {/* <ProfileItem
            icon="💳"
            title="Payment Methods"
            subtitle="Cards, billing"
            onPress={() => navigation.navigate("Payment")}
          /> */}
        </View>

        {/* Preferences Section */}
        <View style={theme.profile.section}>
          <Text style={theme.profile.sectionTitle}>Preferences</Text>
          <SettingItem
            icon="🔔"
            title="Push Notifications"
            value={notificationsEnabled}
            onToggle={setNotificationsEnabled}
          />
          {/* <SettingItem
            icon="🌙"
            title="Dark Mode"
            value={darkModeEnabled}
            onToggle={setDarkModeEnabled}
          /> */}
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
          <ProfileItem
            icon="❓"
            title="Help Center"
            //onPress={() => navigation.navigate("Help")}
          />
          <ProfileItem
            icon="📧"
            title="Contact Us"
            //onPress={() => navigation.navigate("Contact")}
          />
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
