import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
const Stack = createNativeStackNavigator();
import DashboardPage from "../screens/dashboard";
import FoodNListPage from "../screens/foodNutrition";
import ChallengePage from "../screens/challange";
import PaymentStack from "./paymentStack";
import RunPage from "../screens/run";
import DetailHabbit from "../screens/ChallengeStart";
import Habbit from "../screens/habbits";
import UpdateProfile from "../screens/updateProfile";
export default function DashboardTabs() {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
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
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={DashboardPage} />
      <Stack.Screen
        name="Food Nutrition"
        component={FoodNListPage}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="Challenge"
        component={ChallengePage}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="Payment"
        component={PaymentStack}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="Run"
        component={RunPage}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="ChallengeStart"
        component={DetailHabbit}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="Habbit"
        component={Habbit}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
      <Stack.Screen
        name="Update Profile"
        component={UpdateProfile}
        options={{
          headerShown: true,
          headerTitleStyle: {
            color: "#1E87CE",
          },
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  footBar: {
    backgroundColor: "#000",
  },
});
