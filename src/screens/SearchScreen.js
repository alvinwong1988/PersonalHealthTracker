import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Modal,
  Linking,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const { width, height } = Dimensions.get("window");

const SearchScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };

  const [searchQuery, setSearchQuery] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [selectedRadius, setSelectedRadius] = useState(0.5); // Default 500M
  const [showRadiusModal, setShowRadiusModal] = useState(false);

  // Radius options - Google Places API supports radius up to 50,000 meters
  const radiusOptions = [
    { value: 0.5, label: "500M", meters: 500 },
    { value: 1, label: "1 KM", meters: 1000 },
    { value: 2, label: "2 KM", meters: 2000 },
    { value: 3, label: "3 KM", meters: 3000 },
    { value: 4, label: "4 KM", meters: 4000 },
    { value: 5, label: "5 KM", meters: 5000 },
  ];

  useEffect(() => {
    requestLocationPermission();
  }, []);

  // Request location permission for Expo
  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        setHasLocationPermission(true);
        getCurrentLocation();
      } else {
        setHasLocationPermission(false);
        Alert.alert(
          "Permission Denied",
          "Location permission is required to find nearby restaurants.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Retry", onPress: requestLocationPermission },
            { text: "Use Default", onPress: useDefaultLocation },
          ]
        );
      }
    } catch (err) {
      console.warn("Permission error:", err);
      setHasLocationPermission(false);
    }
  };

  // Use default location
  const useDefaultLocation = () => {
    const defaultLocation = { latitude: 37.7749, longitude: -122.4194 };
    setUserLocation(defaultLocation);
    setHasLocationPermission(true);
    searchNearbyRestaurants(
      defaultLocation.latitude,
      defaultLocation.longitude
    );
  };

  // Get current location using Expo Location
  const getCurrentLocation = async () => {
    setLoading(true);
    setLocationError(false);

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
      });

      const { latitude, longitude } = location.coords;
      setUserLocation({ latitude, longitude });
      searchNearbyRestaurants(latitude, longitude);
      setLoading(false);
    } catch (error) {
      console.log("Location error:", error);
      setLocationError(true);
      setLoading(false);
      useDefaultLocation();
    }
  };

  // Search nearby restaurants using Google Places API
  const searchNearbyRestaurants = async (lat, lng, query = "") => {
    setLoading(true);

    try {
      // Get API key from environment variables
      const API_KEY = process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY;

      if (!API_KEY) {
        Alert.alert(
          "Configuration Error",
          "Google Places API key not found. Please check your environment variables."
        );
        setLoading(false);
        return;
      }

      // Get current radius in meters - Google Places API supports radius between 0.0 and 50,000 meters
      const currentRadius =
        radiusOptions.find((r) => r.value === selectedRadius)?.meters || 500;
      const type = "restaurant";

      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${currentRadius}&type=${type}&key=${API_KEY}`;

      if (query.trim()) {
        url += `&keyword=${encodeURIComponent(query)}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const restaurantData = data.results.map((place, index) => ({
          id: place.place_id || index.toString(),
          name: place.name,
          rating: place.rating || "N/A",
          vicinity: place.vicinity,
          priceLevel: place.price_level,
          isOpen: place.opening_hours?.open_now ?? null,
          photoReference: place.photos?.[0]?.photo_reference,
          coordinate: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          types: place.types,
          distance: calculateDistance(
            lat,
            lng,
            place.geometry.location.lat,
            place.geometry.location.lng
          ),
        }));

        // Sort by distance
        restaurantData.sort((a, b) => a.distance - b.distance);
        setRestaurants(restaurantData);
      } else if (data.status === "ZERO_RESULTS") {
        setRestaurants([]);
        Alert.alert("No Results", "No restaurants found in this area.");
      } else if (data.status === "REQUEST_DENIED") {
        console.log("API Error:", data);
        setRestaurants([]);
        Alert.alert(
          "API Error",
          data.error_message ||
            "Request denied. Please check your API key and billing settings."
        );
      } else {
        console.log("API Error:", data);
        setRestaurants([]);
        Alert.alert(
          "Error",
          data.error_message || "Unable to fetch restaurants. Please try again."
        );
      }
    } catch (error) {
      console.error("Error searching restaurants:", error);
      setRestaurants([]);
      Alert.alert(
        "Error",
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return Math.round(d * 10) / 10; // Round to 1 decimal place
  };

  // Handle search button press
  const handleSearch = () => {
    if (userLocation) {
      searchNearbyRestaurants(
        userLocation.latitude,
        userLocation.longitude,
        searchQuery
      );
    } else {
      Alert.alert(
        "Location Required",
        "Please enable location services to search for restaurants."
      );
    }
  };

  // Handle radius selection
  const handleRadiusSelect = (radius) => {
    setSelectedRadius(radius);
    setShowRadiusModal(false);

    // Re-search with new radius if location is available
    if (userLocation) {
      searchNearbyRestaurants(
        userLocation.latitude,
        userLocation.longitude,
        searchQuery
      );
    }
  };

  // Get price level display
  const getPriceLevelDisplay = (priceLevel) => {
    if (priceLevel === undefined || priceLevel === null) return "N/A";
    return "$".repeat(priceLevel);
  };

  // Navigate to restaurant in Google Maps app
  const navigateToDetails = async (restaurant) => {
    try {
      const { latitude, longitude } = restaurant.coordinate;
      const restaurantName = encodeURIComponent(restaurant.name);

      let url;

      if (Platform.OS === "ios") {
        // Try Google Maps first, fallback to Apple Maps
        url = `comgooglemaps://?q=${latitude},${longitude}&center=${latitude},${longitude}&zoom=16`;

        const canOpenGoogleMaps = await Linking.canOpenURL(url);

        if (!canOpenGoogleMaps) {
          // Fallback to Apple Maps
          url = `maps:0,0?q=${restaurantName}@${latitude},${longitude}`;
        }
      } else {
        // Android - use geo: URI scheme
        url = `geo:${latitude},${longitude}?q=${latitude},${longitude}(${restaurantName})`;
      }

      const canOpen = await Linking.canOpenURL(url);

      if (canOpen) {
        await Linking.openURL(url);
      } else {
        // Fallback to web Google Maps
        const webUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      console.error("Error opening maps:", error);
      Alert.alert(
        "Error",
        "Unable to open maps. Please check if you have a maps app installed."
      );
    }
  };

  // Get display text for radius
  const getRadiusDisplayText = () => {
    const option = radiusOptions.find((r) => r.value === selectedRadius);
    return option ? option.label : "500M";
  };

  // Render restaurant item
  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity
      style={[
        theme.searchPage.restaurantCard,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.borderLight,
          borderWidth: 1,
        },
      ]}
      onPress={() => navigateToDetails(item)}
    >
      <View style={theme.searchPage.restaurantHeader}>
        <Text
          style={[
            theme.searchPage.restaurantName,
            { color: theme.colors.text },
          ]}
        >
          {item.name}
        </Text>
        <View style={theme.searchPage.ratingContainer}>
          <Text
            style={[
              theme.searchPage.ratingText,
              { color: theme.colors.primary },
            ]}
          >
            ⭐ {item.rating}
          </Text>
        </View>
      </View>

      <Text
        style={[
          theme.searchPage.restaurantAddress,
          { color: theme.colors.textSecondary },
        ]}
      >
        📍 {item.vicinity}
      </Text>

      <View style={theme.searchPage.restaurantInfo}>
        <Text
          style={[
            theme.searchPage.distanceText,
            { color: theme.colors.textSecondary },
          ]}
        >
          📏 {item.distance} km away
        </Text>

        {item.priceLevel && (
          <Text
            style={[
              theme.searchPage.priceText,
              { color: theme.colors.textSecondary },
            ]}
          >
            💰 {getPriceLevelDisplay(item.priceLevel)}
          </Text>
        )}

        {item.isOpen !== null && (
          <View
            style={[
              theme.searchPage.statusBadge,
              {
                backgroundColor: item.isOpen
                  ? theme.colors.success
                  : theme.colors.error,
              },
            ]}
          >
            <Text
              style={[
                theme.searchPage.statusText,
                { color: theme.colors.background },
              ]}
            >
              {item.isOpen ? "Open" : "Closed"}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  // Render radius modal
  const renderRadiusModal = () => (
    <Modal
      visible={showRadiusModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowRadiusModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            { backgroundColor: theme.colors.background },
          ]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
            Select Search Radius
          </Text>
          <Text
            style={[
              styles.modalSubtitle,
              { color: theme.colors.textSecondary },
            ]}
          >
            Choose how far to search for restaurants
          </Text>

          {radiusOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.radiusOption,
                {
                  backgroundColor:
                    selectedRadius === option.value
                      ? theme.colors.primary
                      : theme.colors.backgroundSecondary,
                  borderColor: theme.colors.border,
                },
              ]}
              onPress={() => handleRadiusSelect(option.value)}
            >
              <View style={styles.radiusOptionContent}>
                <Text
                  style={[
                    styles.radiusOptionText,
                    {
                      color:
                        selectedRadius === option.value
                          ? theme.colors.background
                          : theme.colors.text,
                    },
                  ]}
                >
                  {option.label}
                </Text>
                {option.value === 0.5 && (
                  <Text
                    style={[
                      styles.defaultBadge,
                      {
                        color:
                          selectedRadius === option.value
                            ? theme.colors.background
                            : theme.colors.primary,
                      },
                    ]}
                  >
                    Default
                  </Text>
                )}
              </View>
              {selectedRadius === option.value && (
                <Text
                  style={[styles.checkmark, { color: theme.colors.background }]}
                >
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={[
              styles.modalCloseButton,
              { backgroundColor: theme.colors.textSecondary },
            ]}
            onPress={() => setShowRadiusModal(false)}
          >
            <Text
              style={[
                styles.modalCloseButtonText,
                { color: theme.colors.background },
              ]}
            >
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Permission denied screen
  if (!hasLocationPermission) {
    return (
      <SafeAreaView
        style={[
          theme.searchPage.container,
          { backgroundColor: theme.colors.backgroundSecondary },
        ]}
      >
        <View style={theme.searchPage.permissionContainer}>
          <Text
            style={[
              theme.searchPage.permissionIcon,
              { color: theme.colors.primary },
            ]}
          >
            📍
          </Text>
          <Text
            style={[
              theme.searchPage.permissionTitle,
              { color: theme.colors.text },
            ]}
          >
            Location Permission Required
          </Text>
          <Text
            style={[
              theme.searchPage.permissionText,
              { color: theme.colors.textSecondary },
            ]}
          >
            We need access to your location to find nearby restaurants and
            provide you with the best dining options in your area.
          </Text>
          <TouchableOpacity
            style={[
              theme.searchPage.permissionButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={requestLocationPermission}
          >
            <Text
              style={[
                theme.searchPage.permissionButtonText,
                { color: theme.colors.background },
              ]}
            >
              Grant Permission
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              theme.searchPage.permissionButton,
              {
                backgroundColor: theme.colors.textSecondary,
                marginTop: theme.spacing.medium,
              },
            ]}
            onPress={useDefaultLocation}
          >
            <Text
              style={[
                theme.searchPage.permissionButtonText,
                { color: theme.colors.background },
              ]}
            >
              Use Default Location
            </Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} activeTab="Search" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        theme.searchPage.container,
        { backgroundColor: theme.colors.backgroundSecondary },
      ]}
    >
      {/* Header */}
      <View
        style={[
          theme.searchPage.header,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[theme.searchPage.title, { color: theme.colors.text }]}>
          Nearby Healthy Restaurants
        </Text>

        {/* Location Display */}
        {userLocation && (
          <View style={theme.searchPage.locationDisplay}>
            <Text
              style={[
                theme.searchPage.locationText,
                { color: theme.colors.textSecondary },
              ]}
            >
              📍 Current Location: {userLocation.latitude.toFixed(4)},{" "}
              {userLocation.longitude.toFixed(4)}
            </Text>
            <TouchableOpacity
              style={theme.searchPage.refreshLocationButton}
              onPress={getCurrentLocation}
            >
              <Text style={{ color: theme.colors.primary }}>🔄 Refresh</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Radius Selection */}
        <View style={styles.radiusContainer}>
          <Text style={[styles.radiusLabel, { color: theme.colors.text }]}>
            Search Radius:
          </Text>
          <TouchableOpacity
            style={[
              styles.radiusSelector,
              {
                backgroundColor: theme.colors.backgroundSecondary,
                borderColor: theme.colors.border,
              },
            ]}
            onPress={() => setShowRadiusModal(true)}
          >
            <Text
              style={[styles.radiusSelectorText, { color: theme.colors.text }]}
            >
              {getRadiusDisplayText()}
            </Text>
            <Text
              style={[styles.dropdownIcon, { color: theme.colors.primary }]}
            >
              ▼
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Input */}
        <View style={theme.searchPage.searchContainer}>
          <TextInput
            style={[
              theme.searchPage.searchInput,
              {
                borderColor: theme.colors.border,
                backgroundColor: theme.colors.background,
                color: theme.colors.text,
              },
            ]}
            placeholder="Search restaurants..."
            placeholderTextColor={theme.colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <TouchableOpacity
            style={[
              theme.searchPage.searchButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.background} />
            ) : (
              <Text
                style={[
                  theme.searchPage.searchButtonText,
                  { color: theme.colors.background },
                ]}
              >
                🔍
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Restaurant List */}
      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={theme.searchPage.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text
              style={[
                theme.searchPage.loadingText,
                { color: theme.colors.text },
              ]}
            >
              Searching for restaurants within {getRadiusDisplayText()}...
            </Text>
          </View>
        ) : (
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              padding: theme.spacing.large,
              paddingBottom: 120,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={theme.searchPage.emptyContainer}>
                <Text
                  style={[
                    theme.searchPage.emptyIcon,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  🍽️
                </Text>
                <Text
                  style={[
                    theme.searchPage.emptyTitle,
                    { color: theme.colors.text },
                  ]}
                >
                  No Restaurants Found
                </Text>
                <Text
                  style={[
                    theme.searchPage.emptyText,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Try adjusting your search radius or use a different location
                </Text>
                <TouchableOpacity
                  style={[
                    theme.searchPage.retryButton,
                    { backgroundColor: theme.colors.primary },
                  ]}
                  onPress={() => {
                    if (userLocation) {
                      searchNearbyRestaurants(
                        userLocation.latitude,
                        userLocation.longitude
                      );
                    }
                  }}
                >
                  <Text
                    style={[
                      theme.searchPage.retryButtonText,
                      { color: theme.colors.background },
                    ]}
                  >
                    Retry Search
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>

      {/* Radius Selection Modal */}
      {renderRadiusModal()}

      <Footer navigation={navigation} activeTab="Search" />
    </SafeAreaView>
  );
};

// Additional styles for new components
const styles = {
  radiusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  radiusLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  radiusSelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    minWidth: 80,
  },
  radiusSelectorText: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownIcon: {
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 12,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  radiusOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 8,
  },
  radiusOptionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  radiusOptionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  defaultBadge: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 8,
    opacity: 0.8,
  },
  checkmark: {
    fontSize: 16,
    fontWeight: "bold",
  },
  modalCloseButton: {
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  modalCloseButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
};

export default SearchScreen;
