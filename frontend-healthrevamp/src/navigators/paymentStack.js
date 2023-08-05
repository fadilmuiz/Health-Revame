import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Subscribe12Month from "../screens/payment12Month";
import Subscribe6Month from "../screens/payment6Month";
import Subscribe3Month from "../screens/payment3Month";
import Payment from "../screens/payment";

const Stack = createNativeStackNavigator();

export default function PaymentStack() {
  return (
    <Stack.Navigator
      initialRouteName="Payment"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShown: false
      }}
    >
      <Stack.Screen
        name="PaymentPage"
        component={Payment}
        options={{
          title: "Payment",
        }}
      />
      <Stack.Screen name="Subscribe3Month" component={Subscribe3Month} />
      <Stack.Screen name="Subscribe6Month" component={Subscribe6Month} />
      <Stack.Screen name="Subscribe12Month" component={Subscribe12Month} />
    </Stack.Navigator>
  );
}
