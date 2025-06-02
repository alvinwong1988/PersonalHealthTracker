import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import MeasurementScreen from "../screens/MeasurementScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
// Add other screens as needed (e.g., Search, Notifications)
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Measurement"
        component={MeasurementScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {/* Add placeholders for other screens if needed */}
      <Stack.Screen
        name="Search"
        component={() => (
          <View>
            <Text>Search Screen</Text>
          </View>
        )}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notifications"
        component={() => (
          <View>
            <Text>Notifications Screen</Text>
          </View>
        )}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
