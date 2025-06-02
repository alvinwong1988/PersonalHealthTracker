import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const languages = [
  { id: "en", name: "English", nativeName: "English" },
  { id: "cn", name: "Chinese", nativeName: "中文" },
];

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
        if (savedLanguage) {
          navigation.navigate("Home", { language: savedLanguage });
        }
      } catch (error) {
        console.error("Error loading saved language:", error);
      }
    };
    loadLanguage();
  }, [navigation]);

  const handleLanguageSelect = async (languageId) => {
    setSelectedLanguage(languageId);
    try {
      await AsyncStorage.setItem("selectedLanguage", languageId);
      navigation.navigate("Home", { language: languageId });
    } catch (error) {
      console.error("Error saving language:", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.languageItem,
        selectedLanguage === item.id && styles.selectedItem,
      ]}
      onPress={() => handleLanguageSelect(item.id)}
    >
      <Text style={styles.languageText}>
        {item.nativeName} ({item.name})
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Language</Text>
      <FlatList
        data={languages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  listContainer: {
    padding: 10,
  },
  languageItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  selectedItem: {
    backgroundColor: "#e0f7fa",
    borderColor: "#00bcd4",
    borderWidth: 1,
  },
  languageText: {
    fontSize: 18,
    textAlign: "center",
  },
});

export default LanguageSelectionScreen;
