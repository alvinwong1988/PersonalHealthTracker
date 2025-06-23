import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles/theme";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;

const PersonalInformationScreen = ({ navigation }) => {
  // State for form data, initialized with empty values until API fetch
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    bodyFat: "",
    activityLevel: "",
    profileImage: "",
  });

  const [userToken, setUserToken] = useState(""); // Added state for userToken as a string
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState({});

  // Fetch profile data and token on component mount
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Retrieve user token from AsyncStorage and set it in state
        const token = await AsyncStorage.getItem("userToken");
        setUserToken(token || ""); // Store token in state, default to empty string if null
        //console.log(token);
        // Replace with your actual API endpoint and authentication method
        const response = await fetch(`${API_URL}/api/profile/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        //console.log("Profile data fetched successfully");
        //console.log("Response:", response);
        const data = await response.json();
        // Map the API response to formData structure (nested under profile)
        const profileData = {
          firstName: data.profile?.firstName || "",
          lastName: data.profile?.lastName || "",
          age: data.profile?.age ? data.profile.age.toString() : "",
          gender: data.profile?.gender || "",
          height: data.profile?.height ? data.profile.height.toString() : "",
          weight: data.profile?.weight ? data.profile.weight.toString() : "",
          bodyFat: data.profile?.bodyFat ? data.profile.bodyFat.toString() : "",
          activityLevel: data.profile?.activityLevel || "",
          profileImage: data.profile?.profileImage || "",
        };

        setFormData(profileData);
        setOriginalData(profileData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Failed to load profile data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setHasChanges(true);
  };

  // Save changes
  const handleSave = () => {
    Alert.alert(
      "Save Changes",
      "Are you sure you want to save these changes?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          onPress: async () => {
            try {
              // Prepare data for API call, mapping back to Firestore structure (nested under profile)
              const saveData = {
                profile: {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                  age: parseInt(formData.age) || 0,
                  gender: formData.gender,
                  height: parseInt(formData.height) || 0,
                  weight: parseFloat(formData.weight) || 0,
                  bodyFat: parseFloat(formData.bodyFat) || 0,
                  activityLevel: formData.activityLevel,
                  profileImage: formData.profileImage,
                },
              };

              // Call saveProfile API with token from state
              const response = await fetch(
                `${API_URL}/api/profile/saveProfile`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userToken}`, // Use token from state
                  },
                  body: JSON.stringify(saveData),
                }
              );

              if (!response.ok) {
                throw new Error("Failed to save profile data");
              }

              setIsEditing(false);
              setHasChanges(false);
              setOriginalData(formData);
              Alert.alert(
                "Success",
                "Your information has been updated successfully!"
              );
            } catch (error) {
              console.error("Error saving profile:", error);
              Alert.alert("Error", "Failed to save changes. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Cancel editing
  const handleCancel = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes",
        "You have unsaved changes. Are you sure you want to discard them?",
        [
          { text: "Keep Editing", style: "cancel" },
          {
            text: "Discard",
            style: "destructive",
            onPress: () => {
              setIsEditing(false);
              setHasChanges(false);
              setFormData(originalData); // Reset to original fetched data
            },
          },
        ]
      );
    } else {
      setIsEditing(false);
    }
  };

  // Form field component for regular text input
  const FormField = ({
    label,
    value,
    field,
    placeholder,
    keyboardType = "default",
    multiline = false,
  }) => (
    <View style={theme.personalInfo.fieldContainer}>
      <Text style={theme.personalInfo.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={[
            theme.personalInfo.input,
            multiline && theme.personalInfo.multilineInput,
          ]}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? 3 : 1}
        />
      ) : (
        <Text style={theme.personalInfo.fieldValue}>
          {value || "Not provided"}
        </Text>
      )}
    </View>
  );

  // Custom Radio Button Component for Gender
  const GenderRadioButtons = ({ label, value, field }) => (
    <View style={theme.personalInfo.fieldContainer}>
      <Text style={theme.personalInfo.fieldLabel}>{label}</Text>
      {isEditing ? (
        <View style={{ flexDirection: "row", marginTop: 10 }}>
          {["male", "female"].map((option) => (
            <TouchableOpacity
              key={option}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 20,
              }}
              onPress={() => handleInputChange(field, option)}
            >
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: theme.colors.primary,
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 8,
                }}
              >
                {value === option && (
                  <View
                    style={{
                      height: 12,
                      width: 12,
                      borderRadius: 6,
                      backgroundColor: theme.colors.primary,
                    }}
                  />
                )}
              </View>
              <Text style={{ textTransform: "capitalize" }}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={theme.personalInfo.fieldValue}>
          {value
            ? value.charAt(0).toUpperCase() + value.slice(1)
            : "Not provided"}
        </Text>
      )}
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={theme.personalInfo.container}>
        <View style={theme.personalInfo.header}>
          <TouchableOpacity
            style={theme.personalInfo.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={theme.personalInfo.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={theme.personalInfo.headerTitle}>
            Personal Information
          </Text>
          <View style={theme.personalInfo.editButton} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading profile data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={theme.personalInfo.container}>
      {/* Header */}
      <View style={theme.personalInfo.header}>
        <TouchableOpacity
          style={theme.personalInfo.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={theme.personalInfo.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={theme.personalInfo.headerTitle}>Personal Information</Text>
        <TouchableOpacity
          style={theme.personalInfo.editButton}
          onPress={() => (isEditing ? handleCancel() : setIsEditing(true))}
        >
          <Text style={theme.personalInfo.editButtonText}>
            {isEditing ? "Cancel" : "Edit"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={theme.personalInfo.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture Section */}
        <View style={theme.personalInfo.profileSection}>
          <View style={theme.personalInfo.avatarContainer}>
            {formData.profileImage ? (
              <Image
                source={{ uri: formData.profileImage }}
                style={theme.personalInfo.avatar}
                resizeMode="cover"
              />
            ) : (
              <View style={theme.personalInfo.avatarPlaceholder}>
                <Text style={theme.personalInfo.avatarText}>
                  {formData.firstName.charAt(0) || "U"}
                  {formData.lastName.charAt(0) || ""}
                </Text>
              </View>
            )}
            {isEditing && (
              <TouchableOpacity style={theme.personalInfo.changePhotoButton}>
                <Text style={theme.personalInfo.changePhotoText}>📷</Text>
              </TouchableOpacity>
            )}
          </View>
          {isEditing && (
            <TouchableOpacity style={theme.personalInfo.changePhotoTextButton}>
              <Text style={theme.personalInfo.changePhotoButtonText}>
                Change Photo
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Basic Information */}
        <View style={theme.personalInfo.section}>
          <Text style={theme.personalInfo.sectionTitle}>Basic Information</Text>

          <FormField
            label="First Name"
            value={formData.firstName}
            field="firstName"
            placeholder="Enter your first name"
          />

          <FormField
            label="Last Name"
            value={formData.lastName}
            field="lastName"
            placeholder="Enter your last name"
          />

          <FormField
            label="Age"
            value={formData.age}
            field="age"
            placeholder="Enter your age"
            keyboardType="numeric"
          />

          <GenderRadioButtons
            label="Gender"
            value={formData.gender}
            field="gender"
          />

          <FormField
            label="Height (cm)"
            value={formData.height}
            field="height"
            placeholder="Enter your height in cm"
            keyboardType="numeric"
          />

          <FormField
            label="Weight (kg)"
            value={formData.weight}
            field="weight"
            placeholder="Enter your weight in kg"
            keyboardType="decimal-pad"
          />

          <FormField
            label="Body Fat (%)"
            value={formData.bodyFat}
            field="bodyFat"
            placeholder="Enter your body fat percentage"
            keyboardType="decimal-pad"
          />

          <FormField
            label="Activity Level"
            value={formData.activityLevel}
            field="activityLevel"
            placeholder="Select activity level (sedentary, light, moderate, active, very_active)"
          />
        </View>

        {/* Account Security Note */}
        <View style={theme.personalInfo.noteSection}>
          <Text style={theme.personalInfo.noteTitle}>📋 Note</Text>
          <Text style={theme.personalInfo.noteText}>
            Your personal information is encrypted and securely stored. We will
            never share your data with third parties without your consent.
          </Text>
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity
            style={[
              theme.personalInfo.saveButton,
              !hasChanges && theme.personalInfo.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <Text
              style={[
                theme.personalInfo.saveButtonText,
                !hasChanges && theme.personalInfo.saveButtonTextDisabled,
              ]}
            >
              Save Changes
            </Text>
          </TouchableOpacity>
        )}

        <View style={theme.personalInfo.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalInformationScreen;
