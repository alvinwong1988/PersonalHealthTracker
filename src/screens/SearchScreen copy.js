import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  Dimensions,
  ScrollView,
} from "react-native";
import MapView, { Marker } from "expo-maps";
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
  const [region, setRegion] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  const mapRef = useRef(null);

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
          ]
        );
      }
    } catch (err) {
      console.warn("Permission error:", err);
      setHasLocationPermission(false);
    }
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
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setUserLocation({ latitude, longitude });
      setRegion(newRegion);
      searchNearbyRestaurants(latitude, longitude);
      setLoading(false);
    } catch (error) {
      console.log("Location error:", error);
      setLocationError(true);
      setLoading(false);

      // Fallback to default location (San Francisco)
      const defaultRegion = {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setRegion(defaultRegion);
      setUserLocation({ latitude: 37.7749, longitude: -122.4194 });

      Alert.alert(
        "Location Error",
        "Unable to get your current location. Using default location.",
        [{ text: "OK" }]
      );
    }
  };

  // Search nearby restaurants using Google Places API
  const searchNearbyRestaurants = async (lat, lng, query = "") => {
    setLoading(true);

    try {
      // Replace with your actual Google Places API key
      const API_KEY = "";
      const radius = 2000; // 2km radius
      const type = "restaurant";

      let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${API_KEY}`;

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
        }));

        setRestaurants(restaurantData);
      } else if (data.status === "ZERO_RESULTS") {
        setRestaurants([]);
        Alert.alert("No Results", "No restaurants found in this area.");
      } else {
        console.log("API Error:", data);
        Alert.alert("Search Error", "Unable to find restaurants in this area.");
      }
    } catch (error) {
      console.error("Error searching restaurants:", error);
      Alert.alert(
        "Error",
        "Failed to search for restaurants. Please check your internet connection."
      );
    } finally {
      setLoading(false);
    }
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

  // Handle filter selection
  const handleFilterPress = (filter) => {
    setActiveFilter(filter);
  };

  // Filter restaurants based on active filter
  const getFilteredRestaurants = () => {
    switch (activeFilter) {
      case "Open Now":
        return restaurants.filter((r) => r.isOpen === true);
      case "Top Rated":
        return restaurants
          .filter((r) => r.rating >= 4.0)
          .sort((a, b) => b.rating - a.rating);
      case "Nearby":
        return restaurants.slice(0, 10);
      default:
        return restaurants;
    }
  };

  // Handle marker press
  const onMarkerPress = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  // Navigate to restaurant details
  const navigateToDetails = (restaurant) => {
    navigation.navigate("RestaurantDetails", { restaurant });
  };

  // Retry location permission
  const retryLocation = () => {
    requestLocationPermission();
  };

  // Get price level display
  const getPriceLevelDisplay = (priceLevel) => {
    if (priceLevel === undefined || priceLevel === null) return "N/A";
    return "$".repeat(priceLevel);
  };

  // Permission denied screen
  if (!hasLocationPermission) {
    return (
      <SafeAreaView style={theme.components.searchPage.container}>
        <View style={theme.components.searchPage.permissionContainer}>
          <Text style={theme.components.searchPage.permissionIcon}>📍</Text>
          <Text style={theme.components.searchPage.permissionTitle}>
            Location Permission Required
          </Text>
          <Text style={theme.components.searchPage.permissionText}>
            We need access to your location to find nearby restaurants and
            provide you with the best dining options in your area.
          </Text>
          <TouchableOpacity
            style={theme.components.searchPage.permissionButton}
            onPress={retryLocation}
          >
            <Text style={theme.components.searchPage.permissionButtonText}>
              Grant Permission
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              theme.components.searchPage.permissionButton,
              { backgroundColor: theme.colors.textSecondary, marginTop: 10 },
            ]}
            onPress={() => {
              const defaultRegion = {
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(defaultRegion);
              setUserLocation({ latitude: 37.7749, longitude: -122.4194 });
              setHasLocationPermission(true);
            }}
          >
            <Text style={theme.components.searchPage.permissionButtonText}>
              Use Default Location
            </Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} activeTab="Search" />
      </SafeAreaView>
    );
  }

  // Loading screen
  if (!region) {
    return (
      <SafeAreaView style={theme.components.searchPage.container}>
        <View style={theme.components.searchPage.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text
            style={[
              theme.components.searchPage.loadingText,
              { color: theme.colors.text },
            ]}
          >
            Getting your location...
          </Text>
          <TouchableOpacity
            style={[
              theme.components.searchPage.permissionButton,
              { marginTop: 20, backgroundColor: theme.colors.textSecondary },
            ]}
            onPress={() => {
              const defaultRegion = {
                latitude: 37.7749,
                longitude: -122.4194,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              };
              setRegion(defaultRegion);
              setUserLocation({ latitude: 37.7749, longitude: -122.4194 });
            }}
          >
            <Text style={theme.components.searchPage.permissionButtonText}>
              Skip & Use Default Location
            </Text>
          </TouchableOpacity>
        </View>
        <Footer navigation={navigation} activeTab="Search" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={theme.components.searchPage.container}>
      {/* Header */}
      <View style={theme.components.searchPage.header}>
        <Text
          style={[
            theme.components.searchPage.title,
            { color: theme.colors.text },
          ]}
        >
          Nearby Restaurants
        </Text>

        {/* Search Input */}
        <View style={theme.components.searchPage.searchContainer}>
          <TextInput
            style={[
              theme.components.searchPage.searchInput,
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
              theme.components.searchPage.searchButton,
              { backgroundColor: theme.colors.primary },
            ]}
            onPress={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={theme.components.searchPage.searchButtonText}>
                🔍
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Filter Container */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={theme.components.searchPage.filterContainer}
          contentContainerStyle={{ paddingHorizontal: 5 }}
        >
          {["All", "Open Now", "Nearby", "Top Rated"].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                theme.components.searchPage.filterButton,
                activeFilter === filter &&
                  theme.components.searchPage.activeFilterButton,
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text
                style={[
                  theme.components.searchPage.filterButtonText,
                  activeFilter === filter &&
                    theme.components.searchPage.activeFilterButtonText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Map View */}
      <View style={theme.components.searchPage.mapContainer}>
        <MapView
          ref={mapRef}
          style={theme.components.searchPage.map}
          region={region}
          showsUserLocation={true}
          onRegionChangeComplete={setRegion}
        >
          {/* Restaurant Markers */}
          {getFilteredRestaurants().map((restaurant) => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.coordinate}
              title={restaurant.name}
              description={`Rating: ${restaurant.rating} • ${restaurant.vicinity}`}
              onPress={() => onMarkerPress(restaurant)}
            />
          ))}
        </MapView>

        {/* Location Error Banner */}
        {locationError && (
          <View
            style={[
              theme.components.searchPage.errorBanner,
              { backgroundColor: theme.colors.error },
            ]}
          >
            <Text style={theme.components.searchPage.errorBannerText}>
              ⚠️ Using default location. Tap to retry getting your location.
            </Text>
            <TouchableOpacity onPress={retryLocation}>
              <Text
                style={[
                  theme.components.searchPage.errorBannerText,
                  { textDecorationLine: "underline", fontWeight: "bold" },
                ]}
              >
                Retry
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Restaurant Info Card */}
        {selectedRestaurant && (
          <View
            style={[
              theme.components.searchPage.infoCard,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View style={theme.components.searchPage.infoHeader}>
              <Text
                style={[
                  theme.components.searchPage.restaurantName,
                  { color: theme.colors.text },
                ]}
              >
                {selectedRestaurant.name}
              </Text>
              <TouchableOpacity
                style={theme.components.searchPage.closeButton}
                onPress={() => setSelectedRestaurant(null)}
              >
                <Text style={theme.components.searchPage.closeButtonText}>
                  ×
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={[
                theme.components.searchPage.restaurantInfo,
                { color: theme.colors.textSecondary },
              ]}
            >
              📍 {selectedRestaurant.vicinity}
            </Text>

            <View style={theme.components.searchPage.infoRow}>
              <Text
                style={[
                  theme.components.searchPage.rating,
                  { color: theme.colors.text },
                ]}
              >
                ⭐ {selectedRestaurant.rating}
              </Text>

              {selectedRestaurant.priceLevel && (
                <Text
                  style={[
                    theme.components.searchPage.priceLevel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  💰 {getPriceLevelDisplay(selectedRestaurant.priceLevel)}
                </Text>
              )}

              {selectedRestaurant.isOpen !== null && (
                <View
                  style={[
                    theme.components.searchPage.statusBadge,
                    {
                      backgroundColor: selectedRestaurant.isOpen
                        ? theme.colors.success
                        : theme.colors.error,
                    },
                  ]}
                >
                  <Text style={theme.components.searchPage.statusText}>
                    {selectedRestaurant.isOpen ? "Open" : "Closed"}
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[
                theme.components.searchPage.detailsButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => navigateToDetails(selectedRestaurant)}
            >
              <Text style={theme.components.searchPage.detailsButtonText}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Results Counter */}
        {restaurants.length > 0 && (
          <View
            style={[
              theme.components.searchPage.resultsCounter,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Text
              style={[
                theme.components.searchPage.resultsText,
                { color: theme.colors.text },
              ]}
            >
              Found {getFilteredRestaurants().length} restaurants
            </Text>
          </View>
        )}
      </View>

      <Footer navigation={navigation} activeTab="Search" />
    </SafeAreaView>
  );
};

export default SearchScreen;
