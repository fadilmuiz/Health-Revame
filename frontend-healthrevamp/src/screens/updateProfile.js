import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { doUpdate } from "../actions/action";
import { selectData, selectLoading, selectError} from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
export default function Register() {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    const move = () => {
      navigate("Home");
    };
    const AlertSuccess = () => {
      Alert.alert("Success", "Update successful!");
    };
    const AlertFailed = () => {
      Alert.alert("Login failed!", "Check your input");
    };
    dispatch(
      doUpdate(
        username,
        email,
        password,
        height,
        weight,
        move,
        AlertSuccess,
        AlertFailed
      )
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
      <ScrollView style={{height: '100%', flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            backgroundColor: "#fff",
            paddingTop: 40
          }}
        >
          {/* Title */}
          <View>
            <Text
              style={{
                color: "#0C6EB1",
                fontWeight: "400",
                fontSize: 32,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Update Profile
            </Text>
          </View>
          {/* Form */}
          <View style={styles.containerForm}>
            <TextInput
              placeholder="type your username"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />
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
            <TextInput
              placeholder="type your height"
              value={height}
              onChangeText={setHeight}
              style={styles.input}
            />
            <TextInput
              placeholder="type your weight"
              value={weight}
              onChangeText={setWeight}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={handleUpdate}
              underlayColor="transparent"
              activeOpacity={1}
            >
              <View style={{ padding: 20.0 }}>
                <LinearGradient
                  colors={["#0C6EB1", "#22C49D"]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.button}
                >
                  <Text style={styles.text}>Update</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
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
    shadowColor: "#9B9B9B",
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
