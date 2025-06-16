// src/screens/MeasurementScreen.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from "react-native";
// Updated imports for expo-camera v16+ (SDK 52)
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");

const MeasurementScreen = ({ navigation }) => {
  // Camera and permissions with string values instead of constants
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState("back"); // Use string instead of CameraType.back
  const [flashMode, setFlashMode] = useState("off"); // Use string instead of FlashMode.off
  const cameraRef = useRef(null);

  // AI Analysis states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);

  // Food data states
  const [foodData, setFoodData] = useState({
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    fiber: 0,
    sugar: 0,
    sodium: 0,
    portion: "1 serving",
    confidence: 0,
  });

  // UI states
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  useEffect(() => {
    if (!permission) {
      return; // Still loading permissions
    }

    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  // Mock AI food recognition function
  const analyzeFoodImage = async (imageUri) => {
    setIsAnalyzing(true);

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock AI results - In real app, you'd call your AI service here
    const mockResults = [
      {
        name: "Grilled Chicken Breast",
        calories: 284,
        protein: 53.4,
        carbs: 0,
        fat: 6.2,
        fiber: 0,
        sugar: 0,
        sodium: 104,
        portion: "1 medium piece (150g)",
        confidence: 92,
      },
      {
        name: "Caesar Salad",
        calories: 470,
        protein: 37,
        carbs: 7,
        fat: 40,
        fiber: 4,
        sugar: 3,
        sodium: 1326,
        portion: "1 large bowl (300g)",
        confidence: 87,
      },
      {
        name: "Banana",
        calories: 105,
        protein: 1.3,
        carbs: 27,
        fat: 0.4,
        fiber: 3.1,
        sugar: 14.4,
        sodium: 1,
        portion: "1 medium (118g)",
        confidence: 95,
      },
    ];

    const randomResult =
      mockResults[Math.floor(Math.random() * mockResults.length)];

    setFoodData(randomResult);
    setAnalysisResult({
      imageUri,
      detectedFood: randomResult,
      timestamp: new Date().toISOString(),
    });
    setIsAnalyzing(false);
    setShowResultModal(true);
  };

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: false,
        });

        await analyzeFoodImage(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to take picture. Please try again.");
        console.error("Camera error:", error);
      }
    }
  };

  const pickImageFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        await analyzeFoodImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick image from gallery.");
      console.error("Gallery error:", error);
    }
  };

  const saveFoodEntry = async () => {
    try {
      // Here you would save to your database
      const foodEntry = {
        ...foodData,
        imageUri: analysisResult?.imageUri,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      };

      // Mock save operation
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert(
        "Success!",
        `${foodData.name} has been added to your food diary.`,
        [
          {
            text: "View Nutrition",
            onPress: () => {
              setShowResultModal(false);
              navigation.navigate("Nutrition");
            },
          },
          {
            text: "Add More",
            onPress: () => {
              setShowResultModal(false);
              setAnalysisResult(null);
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to save food entry. Please try again.");
    }
  };

  // Updated toggle functions with string values
  const toggleFlash = () => {
    setFlashMode(flashMode === "off" ? "on" : "off");
  };

  const flipCamera = () => {
    setCameraType(cameraType === "back" ? "front" : "back");
  };

  // Camera Controls Component
  const CameraControls = () => (
    <View style={theme.measurement.controlsContainer}>
      {/* Top Controls */}
      <View style={theme.measurement.topControls}>
        <TouchableOpacity
          style={theme.measurement.controlButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={theme.measurement.controlIcon}>✕</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.measurement.controlButton}
          onPress={toggleFlash}
        >
          <Text style={theme.measurement.controlIcon}>
            {flashMode === "off" ? "⚡" : "🔦"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Center Info */}
      <View style={theme.measurement.centerInfo}>
        <View style={theme.measurement.infoCard}>
          <Text style={theme.measurement.infoTitle}>🍽️ AI Food Scanner</Text>
          <Text style={theme.measurement.infoText}>
            Point camera at food to analyze nutrition
          </Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={theme.measurement.bottomControls}>
        <TouchableOpacity
          style={theme.measurement.galleryButton}
          onPress={pickImageFromGallery}
        >
          <Text style={theme.measurement.galleryIcon}>🖼️</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.measurement.captureButton}
          onPress={takePicture}
          disabled={!isCameraReady}
        >
          <View style={theme.measurement.captureInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.measurement.flipButton}
          onPress={flipCamera}
        >
          <Text style={theme.measurement.flipIcon}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* Manual Entry Button */}
      <TouchableOpacity
        style={theme.measurement.manualButton}
        onPress={() => setShowManualEntry(true)}
      >
        <Text style={theme.measurement.manualText}>Manual Entry</Text>
      </TouchableOpacity>
    </View>
  );

  // Analysis Loading Component
  const AnalysisLoading = () => (
    <Modal visible={isAnalyzing} transparent animationType="fade">
      <View style={theme.measurement.loadingOverlay}>
        <View style={theme.measurement.loadingCard}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={theme.measurement.loadingTitle}>Analyzing Food...</Text>
          <Text style={theme.measurement.loadingText}>
            AI is identifying your food and calculating nutrition
          </Text>
        </View>
      </View>
    </Modal>
  );

  // Results Modal Component
  const ResultsModal = () => (
    <Modal
      visible={showResultModal}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={theme.measurement.modalContainer}>
        <View style={theme.measurement.modalHeader}>
          <TouchableOpacity onPress={() => setShowResultModal(false)}>
            <Text style={theme.measurement.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={theme.measurement.modalTitle}>Food Analysis</Text>
          <TouchableOpacity onPress={saveFoodEntry}>
            <Text style={theme.measurement.modalSave}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={theme.measurement.modalContent}>
          {/* Food Info */}
          <View style={theme.measurement.foodCard}>
            <View style={theme.measurement.foodHeader}>
              <Text style={theme.measurement.foodName}>{foodData.name}</Text>
              <View style={theme.measurement.confidenceContainer}>
                <Text style={theme.measurement.confidenceText}>
                  {foodData.confidence}% confident
                </Text>
              </View>
            </View>
            <Text style={theme.measurement.portion}>{foodData.portion}</Text>
          </View>

          {/* Nutrition Facts */}
          <View style={theme.measurement.nutritionCard}>
            <Text style={theme.measurement.nutritionTitle}>
              Nutrition Facts
            </Text>

            <View style={theme.measurement.caloriesRow}>
              <Text style={theme.measurement.caloriesLabel}>Calories</Text>
              <Text style={theme.measurement.caloriesValue}>
                {foodData.calories}
              </Text>
            </View>

            <View style={theme.measurement.nutritionGrid}>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Protein</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.protein}g
                </Text>
              </View>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Carbs</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.carbs}g
                </Text>
              </View>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Fat</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.fat}g
                </Text>
              </View>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Fiber</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.fiber}g
                </Text>
              </View>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Sugar</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.sugar}g
                </Text>
              </View>
              <View style={theme.measurement.nutritionItem}>
                <Text style={theme.measurement.nutritionLabel}>Sodium</Text>
                <Text style={theme.measurement.nutritionValue}>
                  {foodData.sodium}mg
                </Text>
              </View>
            </View>
          </View>

          {/* Edit Options */}
          <View style={theme.measurement.editCard}>
            <Text style={theme.measurement.editTitle}>Adjust Details</Text>

            <View style={theme.measurement.inputContainer}>
              <Text style={theme.measurement.inputLabel}>Food Name</Text>
              <TextInput
                style={theme.measurement.input}
                value={foodData.name}
                onChangeText={(text) =>
                  setFoodData((prev) => ({ ...prev, name: text }))
                }
              />
            </View>

            <View style={theme.measurement.inputContainer}>
              <Text style={theme.measurement.inputLabel}>Portion Size</Text>
              <TextInput
                style={theme.measurement.input}
                value={foodData.portion}
                onChangeText={(text) =>
                  setFoodData((prev) => ({ ...prev, portion: text }))
                }
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  // Manual Entry Modal Component
  const ManualEntryModal = () => (
    <Modal
      visible={showManualEntry}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={theme.measurement.modalContainer}>
        <View style={theme.measurement.modalHeader}>
          <TouchableOpacity onPress={() => setShowManualEntry(false)}>
            <Text style={theme.measurement.modalCancel}>Cancel</Text>
          </TouchableOpacity>
          <Text style={theme.measurement.modalTitle}>Manual Entry</Text>
          <TouchableOpacity
            onPress={() => {
              setShowManualEntry(false);
              navigation.navigate("Nutrition");
            }}
          >
            <Text style={theme.measurement.modalSave}>Done</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={theme.measurement.modalContent}>
          <Text style={theme.measurement.manualTitle}>
            Enter food details manually
          </Text>
          <Text style={theme.measurement.manualSubtitle}>
            Use this option if the camera can't detect your food properly
          </Text>

          <TouchableOpacity
            style={theme.measurement.manualOptionButton}
            onPress={() => {
              setShowManualEntry(false);
              navigation.navigate("Nutrition");
            }}
          >
            <Text style={theme.measurement.manualOptionIcon}>📝</Text>
            <Text style={theme.measurement.manualOptionText}>Food Diary</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );

  if (!permission) {
    return (
      <View style={theme.measurement.permissionContainer}>
        <Text style={theme.measurement.permissionText}>
          Loading camera permissions...
        </Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={theme.measurement.permissionContainer}>
        <Text style={theme.measurement.permissionTitle}>No Camera Access</Text>
        <Text style={theme.measurement.permissionText}>
          Please enable camera permission to use food scanning
        </Text>
        <TouchableOpacity
          style={theme.measurement.permissionButton}
          onPress={requestPermission}
        >
          <Text style={theme.measurement.permissionButtonText}>
            Grant Permission
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={theme.measurement.permissionButton}
          onPress={() => navigation.navigate("Nutrition")}
        >
          <Text style={theme.measurement.permissionButtonText}>
            Go to Manual Entry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={theme.measurement.container}>
      <CameraView
        ref={cameraRef}
        style={theme.measurement.camera}
        facing={cameraType}
        flash={flashMode}
        onCameraReady={() => setIsCameraReady(true)}
      >
        <CameraControls />
      </CameraView>

      <Footer navigation={navigation} activeTab="Add" />

      <AnalysisLoading />
      <ResultsModal />
      <ManualEntryModal />
    </View>
  );
};

export default MeasurementScreen;
