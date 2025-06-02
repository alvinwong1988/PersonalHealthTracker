//import { FooterComponent } from "react-native-screens/lib/typescript/components/ScreenFooter";
//import Footer from "../components/Footer";

// theme.js
export const theme = {
  // Colors
  colors: {
    primary: "#007AFF", // Main action color (e.g., buttons)
    secondary: "#5856D6", // Secondary action or highlight color
    background: "#FFFFFF", // Background color for screens
    text: "#000000", // Default text color
    textSecondary: "#888888", // Secondary text (e.g., labels, hints)
    border: "#CCCCCC", // Border color for inputs, cards, etc.
    error: "#FF0000", // Error messages or alerts
    googleBlue: "#4285F4", // Google button color
  },

  // Typography
  typography: {
    title: {
      fontSize: 28,
      fontWeight: "bold",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
    },
    body: {
      fontSize: 16,
    },
    caption: {
      fontSize: 14,
      color: "#888888",
    },
  },

  // Spacing
  spacing: {
    small: 5,
    medium: 10,
    large: 20,
    extraLarge: 30,
  },

  // Border Radius
  borderRadius: {
    small: 5,
    medium: 10,
    large: 15,
  },

  // Shadows (for elevation effects)
  shadows: {
    light: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 4,
    },
  },

  // Reusable Component Styles
  components: {
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#FFFFFF",
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#CCCCCC",
      borderRadius: 15,
      paddingHorizontal: 10,
      fontSize: 16,
      marginBottom: 15,
    },
    button: {
      backgroundColor: "#4CAC50",
      padding: 10,
      borderRadius: 15,
      alignItems: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },
    googleButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      borderColor: "#CCCCCC",
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
    },
    googleIcon: {
      width: 30,
      height: 30,
      marginRight: 10,
    },
    googleText: {
      fontSize: 16,
      color: "#4285F4",
      fontWeight: "bold",
    },
  },
  footer: {
    footerContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingVertical: 10,
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
    iconContainer: {
      alignItems: "center",
      justifyContent: "center",
      padding: 5,
    },
    activeIconContainer: {
      backgroundColor: "rgba(0, 122, 255, 0.1)",
      borderRadius: 20,
    },
    icon: {
      width: 24,
      height: 24,
      tintColor: "#888",
    },
    activeIcon: {
      tintColor: "#007AFF",
    },
  },
};

export default theme;
