import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
const Tab = createBottomTabNavigator();
import DashboardStack from "../navigators/dashboardStack";
import Profile from "../screens/profile";
export default function DashboardTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Dashboard") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "ios-person" : "ios-person-outline";
            } else if (route.name === "Payment") {
              iconName = focused ? "ios-card" : "ios-card-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={"#fff"} />;
          },
          headerStyle: {
            backgroundColor: "#1E87CE",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: "#1E87CE",
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#fff",
        };
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  footBar: {
    backgroundColor: "#000",
  },
});
