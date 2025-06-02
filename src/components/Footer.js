import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { theme } from "../styles/theme";

const Footer = ({ navigation, activeTab = "Home" }) => {
  const icons = [
    {
      name: "Home",
      icon: "https://img.icons8.com/material-outlined/24/000000/home.png",
      screen: "Home",
    },
    {
      name: "Search",
      icon: "https://img.icons8.com/material-outlined/24/000000/search.png",
      screen: "Search",
    },
    {
      name: "Add",
      icon: "https://img.icons8.com/material-outlined/24/000000/plus.png",
      screen: "Measurement",
    },
    {
      name: "Notifications",
      icon: "https://img.icons8.com/material-outlined/24/000000/appointment-reminders.png",
      screen: "Notifications",
    },
    {
      name: "Profile",
      icon: "https://img.icons8.com/material-outlined/24/000000/user.png",
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
            source={{ uri: item.icon }}
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
