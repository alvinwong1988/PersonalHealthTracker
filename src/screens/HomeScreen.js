// src/screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
} from "react-native";
import { theme } from "../styles/theme";
import Footer from "../components/Footer";

const { width } = Dimensions.get("window");

const HomeScreen = ({ route, navigation }) => {
  const { language } = route.params || { language: "en" };
  const [refreshing, setRefreshing] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [healthData, setHealthData] = useState({
    steps: 7234,
    stepsGoal: 10000,
    calories: 1850,
    caloriesGoal: 2200,
    water: 6,
    waterGoal: 8,
    sleep: 7.5,
    sleepGoal: 8,
    workoutsThisWeek: 4,
    workoutGoal: 5,
  });

  const [todayTasks, setTodayTasks] = useState([
    {
      id: 1,
      type: "workout",
      title: "Morning Cardio",
      time: "8:00 AM",
      completed: true,
    },
    {
      id: 2,
      type: "meal",
      title: "Log Breakfast",
      time: "9:00 AM",
      completed: true,
    },
    {
      id: 3,
      type: "water",
      title: "Drink Water",
      time: "10:00 AM",
      completed: false,
    },
    {
      id: 4,
      type: "meal",
      title: "Log Lunch",
      time: "1:00 PM",
      completed: false,
    },
    {
      id: 5,
      type: "workout",
      title: "Evening Yoga",
      time: "6:00 PM",
      completed: false,
    },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

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

  const toggleTask = (taskId) => {
    setTodayTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Header Component
  const Header = () => (
    <View style={theme.home.header}>
      <View style={theme.home.headerTop}>
        <View>
          <Text style={theme.home.greeting}>{getGreeting()}, John! 👋</Text>
          <Text style={theme.home.date}>{formatDate()}</Text>
        </View>
        <TouchableOpacity
          style={theme.home.notificationButton}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Text style={theme.home.notificationIcon}>🔔</Text>
          <View style={theme.home.notificationBadge}>
            <Text style={theme.home.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Quick Stats Component
  const QuickStats = () => (
    <View style={theme.home.statsContainer}>
      <Text style={theme.home.sectionTitle}>Today's Progress</Text>
      <View style={theme.home.statsGrid}>
        {/* Steps */}
        <TouchableOpacity
          style={theme.home.statCard}
          onPress={() => navigation.navigate("Activity")}
        >
          <Text style={theme.home.statIcon}>👟</Text>
          <Text style={theme.home.statValue}>
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
                },
              ]}
            />
          </View>
          <Text style={theme.home.statGoal}>
            Goal: {healthData.stepsGoal.toLocaleString()}
          </Text>
        </TouchableOpacity>

        {/* Calories */}
        <TouchableOpacity
          style={theme.home.statCard}
          onPress={() => navigation.navigate("Nutrition")}
        >
          <Text style={theme.home.statIcon}>🔥</Text>
          <Text style={theme.home.statValue}>{healthData.calories}</Text>
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
                },
              ]}
            />
          </View>
          <Text style={theme.home.statGoal}>
            Goal: {healthData.caloriesGoal}
          </Text>
        </TouchableOpacity>

        {/* Water */}
        <TouchableOpacity
          style={theme.home.statCard}
          onPress={() => navigation.navigate("Hydration")}
        >
          <Text style={theme.home.statIcon}>💧</Text>
          <Text style={theme.home.statValue}>{healthData.water}</Text>
          <Text style={theme.home.statLabel}>Glasses</Text>
          <View style={theme.home.progressBar}>
            <View
              style={[
                theme.home.progressFill,
                {
                  width: `${getProgressPercentage(
                    healthData.water,
                    healthData.waterGoal
                  )}%`,
                },
              ]}
            />
          </View>
          <Text style={theme.home.statGoal}>Goal: {healthData.waterGoal}</Text>
        </TouchableOpacity>

        {/* Sleep */}
        <TouchableOpacity
          style={theme.home.statCard}
          onPress={() => navigation.navigate("Sleep")}
        >
          <Text style={theme.home.statIcon}>😴</Text>
          <Text style={theme.home.statValue}>{healthData.sleep}h</Text>
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
                },
              ]}
            />
          </View>
          <Text style={theme.home.statGoal}>Goal: {healthData.sleepGoal}h</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Today's Tasks Component
  const TodaysTasks = () => (
    <View style={theme.home.tasksContainer}>
      <View style={theme.home.sectionHeader}>
        <Text style={theme.home.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Tasks")}>
          <Text style={theme.home.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>

      {todayTasks.slice(0, 3).map((task) => (
        <TouchableOpacity
          key={task.id}
          style={[
            theme.home.taskItem,
            task.completed && theme.home.completedTask,
          ]}
          onPress={() => toggleTask(task.id)}
        >
          <View style={theme.home.taskLeft}>
            <View
              style={[
                theme.home.taskCheckbox,
                task.completed && theme.home.completedCheckbox,
              ]}
            >
              {task.completed && <Text style={theme.home.checkmark}>✓</Text>}
            </View>
            <View style={theme.home.taskContent}>
              <Text
                style={[
                  theme.home.taskTitle,
                  task.completed && theme.home.completedTaskTitle,
                ]}
              >
                {task.title}
              </Text>
              <Text style={theme.home.taskTime}>{task.time}</Text>
            </View>
          </View>
          <Text style={theme.home.taskIcon}>
            {task.type === "workout"
              ? "💪"
              : task.type === "meal"
              ? "🍽️"
              : task.type === "water"
              ? "💧"
              : "📝"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Quick Actions Component
  const QuickActions = () => (
    <View style={theme.home.actionsContainer}>
      <Text style={theme.home.sectionTitle}>Quick Actions</Text>
      <View style={theme.home.actionsGrid}>
        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Workout")}
        >
          <Text style={theme.home.actionIcon}>🏋️‍♂️</Text>
          <Text style={theme.home.actionText}>Start Workout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Nutrition")}
        >
          <Text style={theme.home.actionIcon}>📝</Text>
          <Text style={theme.home.actionText}>Log Meal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Hydration")}
        >
          <Text style={theme.home.actionIcon}>💧</Text>
          <Text style={theme.home.actionText}>Add Water</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={theme.home.actionButton}
          onPress={() => navigation.navigate("Reports")}
        >
          <Text style={theme.home.actionIcon}>📊</Text>
          <Text style={theme.home.actionText}>View Reports</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Weekly Summary Component
  const WeeklySummary = () => (
    <View style={theme.home.summaryContainer}>
      <View style={theme.home.sectionHeader}>
        <Text style={theme.home.sectionTitle}>This Week</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Reports")}>
          <Text style={theme.home.seeAllText}>View Details</Text>
        </TouchableOpacity>
      </View>

      <View style={theme.home.summaryCard}>
        <View style={theme.home.summaryItem}>
          <Text style={theme.home.summaryIcon}>💪</Text>
          <View style={theme.home.summaryContent}>
            <Text style={theme.home.summaryValue}>
              {healthData.workoutsThisWeek}/{healthData.workoutGoal}
            </Text>
            <Text style={theme.home.summaryLabel}>Workouts</Text>
          </View>
        </View>

        <View style={theme.home.summaryDivider} />

        <View style={theme.home.summaryItem}>
          <Text style={theme.home.summaryIcon}>🎯</Text>
          <View style={theme.home.summaryContent}>
            <Text style={theme.home.summaryValue}>5/7</Text>
            <Text style={theme.home.summaryLabel}>Goals Met</Text>
          </View>
        </View>

        <View style={theme.home.summaryDivider} />

        <View style={theme.home.summaryItem}>
          <Text style={theme.home.summaryIcon}>📈</Text>
          <View style={theme.home.summaryContent}>
            <Text style={theme.home.summaryValue}>+12%</Text>
            <Text style={theme.home.summaryLabel}>Improvement</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={theme.home.container}>
      <ScrollView
        style={theme.home.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Header />
        <QuickStats />
        <TodaysTasks />
        <QuickActions />
        <WeeklySummary />
        <View style={theme.home.bottomSpacing} />
      </ScrollView>

      <Footer navigation={navigation} activeTab="Home" />
    </SafeAreaView>
  );
};

export default HomeScreen;
