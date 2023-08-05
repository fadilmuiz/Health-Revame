import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../screens/login";
import RegisterPage from "../screens/register";
import WelcomeScreen from "../screens/welcomeScreen";
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="WelcomeScreen"
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: "Login",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
