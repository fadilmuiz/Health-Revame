import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image} from "react-native";

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to the home page after 3 seconds
      navigation.navigate("LoginPage");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-new.png")}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
  },
});

export default WelcomeScreen;
