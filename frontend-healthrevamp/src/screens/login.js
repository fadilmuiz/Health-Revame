import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Animated,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { doLogin } from "../actions/action";
import { selectLoading } from "../slice/selector";
export default function Login() {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  const onClickRegister = () => {
    navigate("RegisterPage");
  };

  const onClickLogin = () => {
    const move = () => {
      navigate("Dashboard");
    };
    const AlertSuccess = () => {
      Alert.alert("Success", "Login successful!");
    };
    const AlertFailed = () => {
      Alert.alert("Login failed!", "Check your input");
    };
    const storeData = async (token) => {
      try {
        await AsyncStorage.setItem("access_token", token);
        console.log("Success setItem");
      } catch (error) {
        console.log("error setItem");
      }
    };
    dispatch(
      doLogin(email, password, move, AlertSuccess, AlertFailed, storeData)
    );
  };
  return (
    <>
      {loading && (
        <View
          style={{
            position: "absolute",
            zIndex: 1,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "black",
            height: "100%",
            opacity: 0.8,
          }}
        >
          <ActivityIndicator size="large" />
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Patience is part of health
          </Text>
        </View>
      )}
      <ScrollView
        style={{
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          {/* Title */}
          <View>
            <View>
              <View
                style={{
                  paddingLeft: 50,
                  paddingRight: 50,
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: 220,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/logo.png")}
                  style={{ width: 300, height: 300, resizeMode: "contain" }}
                />
              </View>
            </View>
            <Text
              style={{
                color: "#0C6EB1",
                fontWeight: "bold",
                fontSize: 32,
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </View>
          {/* Form */}
          <KeyboardAvoidingView behavior="padding" enabled>
            <View style={styles.containerForm}>
              <TextInput
                placeholder="type your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
              />
              <TextInput
                placeholder="type your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
              <TouchableOpacity
                onPress={onClickLogin}
                underlayColor="transparent"
                activeOpacity={1}
              >
                <View style={{ padding: 20.0 }}>
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.button}
                    onPress={onClickLogin}
                  >
                    <Text style={styles.text}>Login</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClickRegister}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "#0C6EB1",
                  }}
                >
                  Don’t have an account? sign up here
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
          <View style={{ bottom: 0, position: "relative", paddingLeft: 10 }}>
            <Image
              source={require("../../assets/login-regis.png")}
              style={{ width: 210, height: 200 }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    padding: 20.0,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderRadius: 18,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
    borderRadius: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#0C6EB1",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
