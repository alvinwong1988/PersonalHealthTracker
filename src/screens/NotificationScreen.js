// src/screens/NotificationScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  RefreshControl,
  Switch,
} from "react-native";
import { theme } from "../styles/theme";

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    workoutReminders: true,
    mealReminders: true,
    waterReminders: true,
    sleepReminders: true,
    achievementAlerts: true,
    weeklyReports: true,
  });

  // Mock notification data
  const mockNotifications = [
    {
      id: 1,
      type: "workout",
      title: "Workout Reminder",
      message: "Time for your evening cardio session! 🏃‍♂️",
      time: "2 hours ago",
      read: false,
      priority: "high",
      action: "Start Workout",
    },
    {
      id: 2,
      type: "meal",
      title: "Meal Tracking",
      message: "Don't forget to log your lunch! 🥗",
      time: "4 hours ago",
      read: false,
      priority: "medium",
      action: "Log Meal",
    },
    {
      id: 3,
      type: "water",
      title: "Hydration Reminder",
      message: "You're 2 glasses behind your daily water goal 💧",
      time: "6 hours ago",
      read: true,
      priority: "medium",
      action: "Log Water",
    },
    {
      id: 4,
      type: "achievement",
      title: "Achievement Unlocked! 🏆",
      message: "Congratulations! You've completed 7 days of workouts!",
      time: "1 day ago",
      read: true,
      priority: "high",
      action: "View Achievement",
    },
    {
      id: 5,
      type: "sleep",
      title: "Sleep Reminder",
      message: "Time to wind down for better sleep quality 😴",
      time: "1 day ago",
      read: true,
      priority: "low",
      action: "Sleep Tips",
    },
    {
      id: 6,
      type: "report",
      title: "Weekly Health Report",
      message: "Your weekly progress report is ready to view! 📊",
      time: "2 days ago",
      read: true,
      priority: "medium",
      action: "View Report",
    },
    {
      id: 7,
      type: "workout",
      title: "Rest Day Reminder",
      message: "Today is your scheduled rest day. Focus on recovery! 🧘‍♀️",
      time: "3 days ago",
      read: true,
      priority: "low",
      action: "Recovery Tips",
    },
  ];

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = () => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(mockNotifications);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadNotifications();
  };

  const getNotificationIcon = (type) => {
    const icons = {
      workout: "💪",
      meal: "🍽️",
      water: "💧",
      sleep: "😴",
      achievement: "🏆",
      report: "📊",
      general: "🔔",
    };
    return icons[type] || icons.general;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: "#FF5722",
      medium: "#FF9800",
      low: "#4CAF50",
    };
    return colors[priority] || colors.medium;
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setNotifications((prev) =>
              prev.filter((notification) => notification.id !== id)
            );
          },
        },
      ]
    );
  };

  const handleNotificationAction = (notification) => {
    markAsRead(notification.id);

    switch (notification.type) {
      case "workout":
        navigation.navigate("Workout");
        break;
      case "meal":
        navigation.navigate("Nutrition");
        break;
      case "water":
        navigation.navigate("Hydration");
        break;
      case "sleep":
        navigation.navigate("Sleep");
        break;
      case "achievement":
        navigation.navigate("Achievements");
        break;
      case "report":
        navigation.navigate("Reports");
        break;
      default:
        Alert.alert("Action", `${notification.action} pressed`);
    }
  };

  const NotificationItem = ({ notification }) => (
    <TouchableOpacity
      style={[
        theme.notification.item,
        !notification.read && theme.notification.unreadItem,
      ]}
      onPress={() => markAsRead(notification.id)}
    >
      <View style={theme.notification.itemHeader}>
        <View style={theme.notification.itemLeft}>
          <Text style={theme.notification.icon}>
            {getNotificationIcon(notification.type)}
          </Text>
          <View style={theme.notification.itemContent}>
            <Text
              style={[
                theme.notification.title,
                !notification.read && theme.notification.unreadTitle,
              ]}
            >
              {notification.title}
            </Text>
            <Text style={theme.notification.message}>
              {notification.message}
            </Text>
            <Text style={theme.notification.time}>{notification.time}</Text>
          </View>
        </View>
        <View style={theme.notification.itemRight}>
          <View
            style={[
              theme.notification.priorityIndicator,
              { backgroundColor: getPriorityColor(notification.priority) },
            ]}
          />
          {!notification.read && <View style={theme.notification.unreadDot} />}
        </View>
      </View>

      {notification.action && (
        <View style={theme.notification.actionContainer}>
          <TouchableOpacity
            style={theme.notification.actionButton}
            onPress={() => handleNotificationAction(notification)}
          >
            <Text style={theme.notification.actionText}>
              {notification.action}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={theme.notification.deleteButton}
            onPress={() => deleteNotification(notification.id)}
          >
            <Text style={theme.notification.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  const NotificationSettings = () => (
    <View style={theme.notification.settingsContainer}>
      <Text style={theme.notification.settingsTitle}>
        Notification Settings
      </Text>

      {Object.entries(notificationSettings).map(([key, value]) => (
        <View key={key} style={theme.notification.settingItem}>
          <Text style={theme.notification.settingLabel}>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Text>
          <Switch
            value={value}
            onValueChange={(newValue) =>
              setNotificationSettings((prev) => ({ ...prev, [key]: newValue }))
            }
            trackColor={{ false: "#767577", true: "#4CAF50" }}
            thumbColor={value ? "#ffffff" : "#f4f3f4"}
          />
        </View>
      ))}
    </View>
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <SafeAreaView style={theme.notification.container}>
      {/* Header */}
      <View style={theme.notification.header}>
        <TouchableOpacity
          style={theme.notification.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={theme.notification.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={theme.notification.headerTitle}>
          Notifications {unreadCount > 0 && `(${unreadCount})`}
        </Text>
        <TouchableOpacity
          style={theme.notification.settingsButton}
          onPress={() => setShowSettings(!showSettings)}
        >
          <Text style={theme.notification.settingsButtonText}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar */}
      {unreadCount > 0 && (
        <View style={theme.notification.actionBar}>
          <TouchableOpacity
            style={theme.notification.markAllButton}
            onPress={markAllAsRead}
          >
            <Text style={theme.notification.markAllText}>
              Mark All as Read ({unreadCount})
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings Panel */}
      {showSettings && <NotificationSettings />}

      {/* Notifications List */}
      <ScrollView
        style={theme.notification.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notifications.length === 0 ? (
          <View style={theme.notification.emptyContainer}>
            <Text style={theme.notification.emptyIcon}>🔔</Text>
            <Text style={theme.notification.emptyTitle}>No Notifications</Text>
            <Text style={theme.notification.emptyMessage}>
              You're all caught up! Check back later for updates.
            </Text>
          </View>
        ) : (
          <>
            {/* Today's Notifications */}
            {notifications.filter((n) => n.time.includes("hour")).length >
              0 && (
              <>
                <Text style={theme.notification.sectionTitle}>Today</Text>
                {notifications
                  .filter((n) => n.time.includes("hour"))
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
              </>
            )}

            {/* Earlier Notifications */}
            {notifications.filter((n) => n.time.includes("day")).length > 0 && (
              <>
                <Text style={theme.notification.sectionTitle}>Earlier</Text>
                {notifications
                  .filter((n) => n.time.includes("day"))
                  .map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
              </>
            )}
          </>
        )}

        <View style={theme.notification.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
