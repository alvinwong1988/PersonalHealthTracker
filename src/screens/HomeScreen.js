// src/screens/HomeScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  Alert,
  Platform,
  AppState,
  Linking,
} from "react-native";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig.extra.API_URL;
const WEATHER_API_KEY = Constants.expoConfig.extra.WEATHER_API_KEY;
const { width } = Dimensions.get("window");

const HomeScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [healthData, setHealthData] = useState({
    steps: 0,
    stepsGoal: 10000,
    calories: 0,
    caloriesGoal: 2200,
    water: 0,
    waterGoal: 8,
    sleep: 0,
    sleepGoal: 8,
    workoutsThisWeek: 0,
    workoutGoal: 5,
  });

  const [isPedometerAvailable, setIsPedometerAvailable] = useState(false);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [androidBaseSteps, setAndroidBaseSteps] = useState(0);
  const [androidSessionSteps, setAndroidSessionSteps] = useState(0);
  const [lastSavedSteps, setLastSavedSteps] = useState(0);
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState({});
  const [weather, setWeather] = useState({
    temp: null,
    icon: "❓", // Default placeholder
  });

  // Use refs for subscription management
  const pedometerSubscription = useRef(null);
  const appStateSubscription = useRef(null);
  const dateCheckInterval = useRef(null);
  const saveInterval = useRef(null);

  // Initialize app
  useEffect(() => {
    initializeApp();
    fetchWeatherData();
    // Cleanup function
    return () => {
      //cleanup();
    };
  }, []);
  // Function to fetch weather data based on user's location
  const fetchWeatherData = async () => {
    try {
      // Request location permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to fetch weather data. Using default data.",
          [{ text: "OK", onPress: () => setWeather({ temp: 72, icon: "☀️" }) }] // Fallback to mock data
        );
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      const { latitude, longitude } = location.coords;
      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );
      //console.log("Fetching weather data from API:", response);
      if (response.ok) {
        const data = await response.json();
        //console.log("Weather data:", data);
        setWeather({
          temp: Math.round(data.main.temp), // Temperature in Fahrenheit (use 'metric' for Celsius)
          icon: getWeatherIcon(data.weather[0].main), // Map condition to icon
        });
      } else {
        throw new Error("Failed to fetch weather data");
      }
    } catch (error) {
      //console.error("Error fetching weather data:", error);
      Alert.alert(
        "Error",
        "Could not fetch weather data. Using default values.",
        [{ text: "OK", onPress: () => setWeather({ temp: 72, icon: "☀️" }) }]
      );
    }
  };
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return "☀️"; // Sunny
      case "clouds":
        return "☁️"; // Cloudy
      case "rain":
        return "🌧️"; // Rain
      case "drizzle":
        return "🌦️"; // Light rain
      case "thunderstorm":
        return "⛈️"; // Thunderstorm
      case "snow":
        return "❄️"; // Snow
      case "mist":
      case "fog":
        return "🌫️"; // Mist/Fog
      default:
        return "🌤️"; // Default partly cloudy
    }
  };
  //androidSessionSteps, androidBaseSteps
  const initializeApp = async () => {
    try {
      // Check and reset if new day
      await checkAndResetIfNewDay();

      // Initialize pedometer
      await initializePedometer();

      // Initial Token and User Data
      const token = await AsyncStorage.getItem("userToken");
      setUserToken(token || "");
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        // Parse the string to JSON object
        setUserData(JSON.parse(userDataString));
      }
      // Set up intervals
      //setupIntervals();
    } catch (error) {
      //.error("App initialization error:", error);
    }
  };

  const setupIntervals = () => {
    // Update date every minute
    dateCheckInterval.current = setInterval(() => {
      setCurrentDate(new Date());
      checkAndResetIfNewDay();
    }, 60000);

    // Auto-save steps every 30 seconds for Android
    if (Platform.OS === "android") {
      saveInterval.current = setInterval(() => {
        saveCurrentSteps();
      }, 30000);
    }
  };

  const cleanup = () => {
    // Remove pedometer subscription
    if (pedometerSubscription.current) {
      pedometerSubscription.current.remove();
      pedometerSubscription.current = null;
    }

    // Clear intervals
    if (dateCheckInterval.current) {
      clearInterval(dateCheckInterval.current);
    }
    if (saveInterval.current) {
      clearInterval(saveInterval.current);
    }

    // Save current steps before cleanup
    if (Platform.OS === "android") {
      saveCurrentSteps();
    }
  };

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === "background" || nextAppState === "inactive") {
      // App going to background - save current steps
      if (Platform.OS === "android") {
        saveCurrentSteps();
      }
    } else if (nextAppState === "active") {
      // App coming to foreground - reinitialize
      reinitializePedometer();
    }
  };

  const checkAndResetIfNewDay = async () => {
    try {
      const storedDate = await AsyncStorage.getItem("stepsDate");
      const today = new Date().toDateString();

      if (storedDate !== today) {
        // New day - reset everything
        await AsyncStorage.multiSet([
          ["todaySteps", "0"],
          ["stepsDate", today],
          ["androidBaseSteps", "0"],
        ]);

        setHealthData((prev) => ({
          ...prev,
          steps: 0,
          calories: 0,
          water: 0,
          sleep: 0,
        }));

        setAndroidBaseSteps(0);
        setAndroidSessionSteps(0);
        setLastSavedSteps(0);
      }
    } catch (error) {
      //console.error("Error checking date:", error);
    }
  };

  const initializePedometer = async () => {
    try {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (!isAvailable) {
        Alert.alert(
          "Step Counter Unavailable",
          "Step counting is not available on this device. You can still manually log your activities."
        );
        return;
      }

      // Step 1: Check current permission status
      let permissionResponse = await Pedometer.getPermissionsAsync();
      let status = permissionResponse.status;
      //console.log("Pedometer permission status:", status);
      // Step 2: Only request if not already granted
      if (status !== "granted") {
        permissionResponse = await Pedometer.requestPermissionsAsync();
        status = permissionResponse.status;
      }

      // Step 3: If still not granted, show alert only once per session
      if (status !== "granted") {
        if (!global.__motionPermissionAlertShown) {
          global.__motionPermissionAlertShown = true;
          Alert.alert(
            "Permission Required",
            "Please grant motion/physical activity permission in your device settings to track steps.",
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              Platform.OS === "android"
                ? {
                    text: "Open Settings",
                    onPress: () => {
                      // Opens the app settings page
                      Linking.openSettings();
                    },
                  }
                : {
                    text: "OK",
                  },
            ]
          );
        }
        return;
      }

      // Step 4: Continue normal initialization
      if (Platform.OS === "ios") {
        await fetchTodaysStepsIOS();
      } else {
        await initializeAndroidStepTracking();
      }
      subscribeToPedometerUpdates();
    } catch (error) {
      //.error("Pedometer initialization failed:", error);
      Alert.alert(
        "Initialization Error",
        "Failed to initialize step counter. Please try again."
      );
    }
  };

  const reinitializePedometer = async () => {
    // Remove existing subscription
    if (pedometerSubscription.current) {
      pedometerSubscription.current.remove();
      pedometerSubscription.current = null;
    }

    // Reinitialize
    await initializePedometer();
  };

  const fetchTodaysStepsIOS = async () => {
    try {
      const today = new Date();
      const startOfDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      const result = await Pedometer.getStepCountAsync(startOfDay, today);
      if (result) {
        const steps = result.steps || 0;
        setHealthData((prev) => ({
          ...prev,
          steps: steps,
          calories: Math.round(steps * 0.04),
        }));

        // Store for persistence
        await AsyncStorage.setItem("todaySteps", steps.toString());
        setLastSavedSteps(steps);
      }
    } catch (error) {
      //console.error("Error fetching iOS step count:", error);
      // Fallback to stored value
      await loadStoredSteps();
    }
  };

  const initializeAndroidStepTracking = async () => {
    try {
      const [[, storedSteps], [, storedDate], [, baseSteps]] =
        await AsyncStorage.multiGet([
          "todaySteps",
          "stepsDate",
          "androidBaseSteps",
        ]);

      const today = new Date().toDateString();

      if (storedDate === today && storedSteps) {
        const steps = parseInt(storedSteps) || 0;
        const base = parseInt(baseSteps) || 0;

        setAndroidBaseSteps(base);
        setLastSavedSteps(steps);
        setHealthData((prev) => ({
          ...prev,
          steps: steps,
          calories: Math.round(steps * 0.04),
        }));
      } else {
        // New day
        await checkAndResetIfNewDay();
      }
    } catch (error) {
      //console.error("Error initializing Android step tracking:", error);
    }
  };

  const loadStoredSteps = async () => {
    try {
      const [[, storedSteps], [, storedDate]] = await AsyncStorage.multiGet([
        "todaySteps",
        "stepsDate",
      ]);

      const today = new Date().toDateString();

      if (storedDate === today && storedSteps) {
        const steps = parseInt(storedSteps) || 0;
        setHealthData((prev) => ({
          ...prev,
          steps: steps,
          calories: Math.round(steps * 0.04),
        }));
        setLastSavedSteps(steps);
      }
    } catch (error) {
      //console.error("Error loading stored steps:", error);
    }
  };

  const subscribeToPedometerUpdates = () => {
    try {
      // Remove existing subscription if any
      if (pedometerSubscription.current) {
        pedometerSubscription.current.remove();
      }

      //console.log("Subscribing to Pedometer updates...");

      pedometerSubscription.current = Pedometer.watchStepCount(
        (result) => {
          //console.log("Step count update:", result.steps);

          if (Platform.OS === "android") {
            handleAndroidStepUpdate(result.steps);
          } else {
            handleIOSStepUpdate(result.steps);
          }
        },
        (error) => {
          //console.error("Pedometer error:", error);
          // Don't show alert for every error, just log it
        }
      );

      //console.log("Successfully subscribed to pedometer updates");
    } catch (error) {
      //console.error("Failed to subscribe to pedometer:", error);
    }
  };

  const handleIOSStepUpdate = async (steps) => {
    try {
      setCurrentStepCount(steps);

      // For iOS, the steps are cumulative for the day
      setHealthData((prev) => ({
        ...prev,
        steps: steps,
        calories: Math.round(steps * 0.04),
      }));

      // Save periodically (every 100 steps)
      if (steps - lastSavedSteps >= 100) {
        await AsyncStorage.setItem("todaySteps", steps.toString());
        setLastSavedSteps(steps);
      }
    } catch (error) {
      //console.error("Error handling iOS step update:", error);
    }
  };

  const handleAndroidStepUpdate = async (sessionSteps) => {
    try {
      setAndroidSessionSteps(sessionSteps);

      // Calculate total steps
      const totalSteps = androidBaseSteps + sessionSteps;

      setHealthData((prev) => ({
        ...prev,
        steps: totalSteps,
        calories: Math.round(totalSteps * 0.04),
      }));

      // Auto-save every 50 steps
      if (totalSteps - lastSavedSteps >= 50) {
        await saveCurrentSteps();
      }
    } catch (error) {
      //console.error("Error handling Android step update:", error);
    }
  };

  const saveCurrentSteps = async () => {
    if (Platform.OS === "android") {
      try {
        const totalSteps = androidBaseSteps + androidSessionSteps;

        await AsyncStorage.multiSet([
          ["todaySteps", totalSteps.toString()],
          ["androidBaseSteps", totalSteps.toString()],
          ["stepsDate", new Date().toDateString()],
        ]);

        setLastSavedSteps(totalSteps);
        setAndroidBaseSteps(totalSteps);
        setAndroidSessionSteps(0);

        //console.log(`Saved ${totalSteps} steps`);
      } catch (error) {
        //console.error("Error saving steps:", error);
      }
    }
  };

  const addManualSteps = async (additionalSteps) => {
    try {
      const currentSteps = healthData.steps;
      const newTotal = currentSteps + additionalSteps;

      setHealthData((prev) => ({
        ...prev,
        steps: newTotal,
        calories: Math.round(newTotal * 0.04),
      }));

      if (Platform.OS === "android") {
        setAndroidBaseSteps(newTotal);
        setAndroidSessionSteps(0);
      }

      await AsyncStorage.multiSet([
        ["todaySteps", newTotal.toString()],
        ["androidBaseSteps", newTotal.toString()],
        ["stepsDate", new Date().toDateString()],
      ]);

      Alert.alert(
        "Steps Added",
        `Successfully added ${additionalSteps} steps to your total!`
      );
    } catch (error) {
      //console.error("Error adding manual steps:", error);
      Alert.alert("Error", "Failed to add steps. Please try again.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await checkAndResetIfNewDay();

      if (isPedometerAvailable) {
        if (Platform.OS === "ios") {
          await fetchTodaysStepsIOS();
        } else {
          await saveCurrentSteps();
          await loadStoredSteps();
        }
      }
    } catch (error) {
      //console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // UI Helper Functions
  const getGreeting = () => {
    const hour = currentDate.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = () => {
    return currentDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  // Component UI remains the same...
  const Header = () => (
    <View style={theme.home.header}>
      <View>
        <Text style={theme.home.greeting}>{getGreeting()}!</Text>
        <Text style={theme.home.date}>{formatDate()}</Text>
      </View>
      <View style={theme.home.headerRightContainer}>
        <View style={theme.home.weatherContainer}>
          <Text style={theme.home.weatherIcon}>{weather.icon}</Text>
          {weather.temp !== null && (
            <Text style={theme.home.weatherTemp}>{weather.temp}°C</Text>
          )}
        </View>
      </View>
      <TouchableOpacity style={theme.home.profileButton}>
        <Text style={theme.home.profileInitial}>{userData.name}</Text>
      </TouchableOpacity>
    </View>
  );

  const QuickStats = () => (
    <View style={theme.home.statsContainer}>
      <Text style={theme.home.sectionTitle}>Today's Progress</Text>

      <View style={theme.home.statsGrid}>
        {/* Steps Card */}
        <View style={[theme.home.statCard, { backgroundColor: "#E3F2FD" }]}>
          <Text style={theme.home.statNumber}>
            {healthData.steps.toLocaleString()}
          </Text>
          <Text style={theme.home.statLabel}>Steps</Text>
          <View style={theme.home.progressBar}>
            <View
              style={[
                theme.home.progressFill,
                {
                  width: `${getProgressPercentage(
                    healthData.steps,
                    healthData.stepsGoal
                  )}%`,
                  backgroundColor: "#2196F3",
                },
              ]}
            />
          </View>
          <Text style={theme.home.goalText}>
            Goal: {healthData.stepsGoal.toLocaleString()}
          </Text>

          {/* Status indicators */}
          {!isPedometerAvailable && (
            <Text style={theme.home.demoText}>Manual Entry Only</Text>
          )}
          {isPedometerAvailable && Platform.OS === "android" && (
            <Text style={theme.home.demoText}>
              Live Tracking{" "}
              {androidSessionSteps > 0 ? `(+${androidSessionSteps})` : ""}
            </Text>
          )}
          {isPedometerAvailable && Platform.OS === "ios" && (
            <Text style={theme.home.demoText}>HealthKit Connected</Text>
          )}

          {/* Manual Add Button */}
          {Platform.OS === "android" || !isPedometerAvailable ? (
            <TouchableOpacity
              style={theme.home.addStepsButton}
              onPress={() => addManualSteps(1000)}
            >
              <Text style={theme.home.addStepsText}>+1000 Steps</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Calories Card */}
        <View style={[theme.home.statCard, { backgroundColor: "#FFF3E0" }]}>
          <Text style={theme.home.statNumber}>{healthData.calories}</Text>
          <Text style={theme.home.statLabel}>Calories</Text>
          <View style={theme.home.progressBar}>
            <View
              style={[
                theme.home.progressFill,
                {
                  width: `${getProgressPercentage(
                    healthData.calories,
                    healthData.caloriesGoal
                  )}%`,
                  backgroundColor: "#FF9800",
                },
              ]}
            />
          </View>
          <Text style={theme.home.goalText}>
            Goal: {healthData.caloriesGoal}
          </Text>
          <Text style={theme.home.demoText}>From Steps</Text>
        </View>

        {/* Water Card */}
        <View style={[theme.home.statCard, { backgroundColor: "#E8F5E8" }]}>
          <Text style={theme.home.statNumber}>{healthData.water}</Text>
          <Text style={theme.home.statLabel}>Water (glasses)</Text>
          <View style={theme.home.progressBar}>
            <View
              style={[
                theme.home.progressFill,
                {
                  width: `${getProgressPercentage(
                    healthData.water,
                    healthData.waterGoal
                  )}%`,
                  backgroundColor: "#4CAF50",
                },
              ]}
            />
          </View>
          <Text style={theme.home.goalText}>Goal: {healthData.waterGoal}</Text>
          <TouchableOpacity
            style={theme.home.addButton}
            onPress={() => {
              setHealthData((prev) => ({
                ...prev,
                water: Math.min(prev.water + 1, prev.waterGoal),
              }));
            }}
          >
            <Text style={theme.home.addButtonText}>+1 Glass</Text>
          </TouchableOpacity>
        </View>

        {/* Sleep Card */}
        <View style={[theme.home.statCard, { backgroundColor: "#F3E5F5" }]}>
          <Text style={theme.home.statNumber}>{healthData.sleep}h</Text>
          <Text style={theme.home.statLabel}>Sleep</Text>
          <View style={theme.home.progressBar}>
            <View
              style={[
                theme.home.progressFill,
                {
                  width: `${getProgressPercentage(
                    healthData.sleep,
                    healthData.sleepGoal
                  )}%`,
                  backgroundColor: "#9C27B0",
                },
              ]}
            />
          </View>
          <Text style={theme.home.goalText}>Goal: {healthData.sleepGoal}h</Text>
          <Text style={theme.home.demoText}>Log Tonight</Text>
        </View>
      </View>
    </View>
  );

  const TodaysTasks = () => (
    <View style={theme.home.tasksContainer}>
      <Text style={theme.home.sectionTitle}>Today's Tasks</Text>
      <View style={theme.home.tasksList}>
        <TouchableOpacity style={theme.home.taskItem}>
          <View style={theme.home.taskCheckbox} />
          <Text style={theme.home.taskText}>Morning workout (30 min)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={theme.home.taskItem}>
          <View style={[theme.home.taskCheckbox, theme.home.taskCompleted]} />
          <Text style={[theme.home.taskText, theme.home.taskCompletedText]}>
            Drink 2L water
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={theme.home.taskItem}>
          <View style={theme.home.taskCheckbox} />
          <Text style={theme.home.taskText}>Take vitamins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={theme.home.taskItem}>
          <View style={theme.home.taskCheckbox} />
          <Text style={theme.home.taskText}>
            Walk {healthData.stepsGoal.toLocaleString()} steps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const QuickActions = () => (
    <View style={theme.home.actionsContainer}>
      <Text style={theme.home.sectionTitle}>Quick Actions</Text>
      <View style={theme.home.actionsGrid}>
        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Workout")}
        >
          <Text style={theme.home.actionIcon}>🏃</Text>
          <Text style={theme.home.actionText}>Start Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => {
            setHealthData((prev) => ({
              ...prev,
              water: Math.min(prev.water + 1, prev.waterGoal),
            }));
          }}
        >
          <Text style={theme.home.actionIcon}>💧</Text>
          <Text style={theme.home.actionText}>Log Water</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Nutrition")}
        >
          <Text style={theme.home.actionIcon}>🍎</Text>
          <Text style={theme.home.actionText}>Log Meal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => {
            if (Platform.OS === "android" || !isPedometerAvailable) {
              addManualSteps(500);
            } else {
              Alert.alert("Sleep Timer", "Sleep tracking coming soon!");
            }
          }}
        >
          <Text style={theme.home.actionIcon}>
            {Platform.OS === "android" || !isPedometerAvailable ? "👟" : "😴"}
          </Text>
          <Text style={theme.home.actionText}>
            {Platform.OS === "android" || !isPedometerAvailable
              ? "Add Steps"
              : "Sleep Timer"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={theme.home.container}>
      <ScrollView
        style={theme.home.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        <Header />
        <QuickStats />
        <TodaysTasks />
        <QuickActions />
        <View style={theme.home.bottomSpacing} />
      </ScrollView>

      <Footer navigation={navigation} activeTab="Home" />
    </SafeAreaView>
  );
};

export default HomeScreen;
