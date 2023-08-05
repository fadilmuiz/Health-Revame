import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
const PaymentScreen = () => {
  const { navigate } = useNavigation();
  return (
    <View style={{ padding: 20, flex: 1}}>
      <Text
        style={{
          margin: 20,
          textAlign: "center",
          fontSize: 30,
          fontWeight: "bold",
        }}
      >
        Subscribe
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigate("Subscribe12Month");
        }}
        underlayColor="transparent"
        activeOpacity={1}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#1E87CE",
            padding: 10,
            borderRadius: 20,
            marginBottom: 15,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
              12
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              Month
            </Text>
            <Text style={{ color: "#fff" }}>
              Get access to all feature in 12 Month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate("Subscribe6Month");
        }}
        underlayColor="transparent"
        activeOpacity={1}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#1E87CE",
            padding: 10,
            borderRadius: 20,
            marginBottom: 15,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
              6
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              Month
            </Text>
            <Text style={{ color: "#fff" }}>
              Get access to all feature in 6 Month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigate("Subscribe3Month");
        }}
        underlayColor="transparent"
        activeOpacity={1}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#22C49D",
            padding: 10,
            borderRadius: 20,
            marginBottom: 15,
            elevation: 4,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            overflow: "hidden",
            marginBottom: 20,
          }}
        >
          <View>
            <Text style={{ fontSize: 40, fontWeight: "bold", color: "#fff" }}>
              3
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
              Month
            </Text>
            <Text style={{ color: "#fff" }}>
              Get access to all feature in 3 Month
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PaymentScreen;
