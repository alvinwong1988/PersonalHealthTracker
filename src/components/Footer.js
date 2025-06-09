import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { theme } from "../styles/theme";

const Footer = ({ navigation, activeTab = "Home" }) => {
  const icons = [
    {
      name: "Home",
      icon: require("../../assets/icons/home.png"), // Adjust path based on Footer.js location
      screen: "Home",
    },
    {
      name: "Search",
      icon: require("../../assets/icons/search.png"),
      screen: "Search",
    },
    {
      name: "Add",
      icon: require("../../assets/icons/plus.png"),
      screen: "Measurement",
    },
    {
      name: "Notification",
      icon: require("../../assets/icons/notifications.png"),
      screen: "Notification",
    },
    {
      name: "Profile",
      icon: require("../../assets/icons/user.png"),
      screen: "Profile",
    },
  ];

  return (
    <View style={theme.footer.footerContainer}>
      {icons.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={[
            theme.footer.iconContainer,
            activeTab === item.name && theme.footer.activeIconContainer,
          ]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Image
            source={item.icon}
            style={[
              theme.footer.icon,
              activeTab === item.name && theme.footer.activeIcon,
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Footer;
