import React, { useState } from "react";
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
import { theme } from "../styles/theme";

const PersonalInformationScreen = ({ navigation }) => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    dateOfBirth: "01/15/1990",
    gender: "Male",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

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
          onPress: () => {
            // Add your save logic here (API call, etc.)
            setIsEditing(false);
            setHasChanges(false);
            Alert.alert(
              "Success",
              "Your information has been updated successfully!"
            );
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
              // Reset form data to original values
              // You might want to fetch original data from your state/API
            },
          },
        ]
      );
    } else {
      setIsEditing(false);
    }
  };

  // Form field component
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
            <View style={theme.personalInfo.avatarPlaceholder}>
              <Text style={theme.personalInfo.avatarText}>
                {formData.firstName.charAt(0)}
                {formData.lastName.charAt(0)}
              </Text>
            </View>
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
            label="Email Address"
            value={formData.email}
            field="email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />

          <FormField
            label="Phone Number"
            value={formData.phone}
            field="phone"
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />

          <FormField
            label="Date of Birth"
            value={formData.dateOfBirth}
            field="dateOfBirth"
            placeholder="MM/DD/YYYY"
          />

          <FormField
            label="Gender"
            value={formData.gender}
            field="gender"
            placeholder="Select gender"
          />
        </View>

        {/* Address Information */}
        <View style={theme.personalInfo.section}>
          <Text style={theme.personalInfo.sectionTitle}>
            Address Information
          </Text>

          <FormField
            label="Street Address"
            value={formData.address}
            field="address"
            placeholder="Enter your street address"
            multiline={true}
          />

          <FormField
            label="City"
            value={formData.city}
            field="city"
            placeholder="Enter your city"
          />

          <View style={theme.personalInfo.rowContainer}>
            <View style={theme.personalInfo.halfWidth}>
              <FormField
                label="State/Province"
                value={formData.state}
                field="state"
                placeholder="State"
              />
            </View>
            <View style={theme.personalInfo.halfWidth}>
              <FormField
                label="ZIP/Postal Code"
                value={formData.zipCode}
                field="zipCode"
                placeholder="ZIP Code"
                keyboardType="numeric"
              />
            </View>
          </View>

          <FormField
            label="Country"
            value={formData.country}
            field="country"
            placeholder="Enter your country"
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
