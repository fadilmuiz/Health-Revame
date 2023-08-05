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
import { doRegister } from "../actions/action";
import { selectData, selectLoading, selectError } from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
export default function Register() {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const handleRegister = async () => {
    const move = () => {
      navigate("LoginPage");
    };
    const AlertSuccess = () => {
      Alert.alert("Success", "Registration successful!");
    };
    const AlertFailed = () => {
      Alert.alert("Login failed!", "Check your input");
    };
    dispatch(
      doRegister(
        username,
        email,
        password,
        height,
        weight,
        gender,
        move,
        AlertSuccess,
        AlertFailed
      )
    );
  };

  const handleInputGender = (value) => {
    setGender(value);
  };

  console.log(gender)
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
      <ScrollView>
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            backgroundColor: "#fff",
            paddingTop: 0,
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
                fontWeight: "400",
                fontSize: 32,
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Register
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
            <SelectDropdown
              data={["Male", "Female"]}
              defaultValue="Choose Gender"
              onSelect={(selectedItem) => handleInputGender(selectedItem)}
              buttonStyle={styles.inputDropdown}
              buttonTextStyle={styles.inputText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.dropdownRow}
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
              onPress={handleRegister}
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
                  <Text style={styles.text}>Register</Text>
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
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
    shadowColor: "#9B9B9B",
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
  inputDropdown: {
    borderWidth: 1,
    borderColor: "#EEEEEE",
    borderRadius: 5,
    width: 320,
    height: 40,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    marginVertical: 15,
    fontSize: 16,
    color: "#000000",
    shadowColor: "#9B9B9B",
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
  inputText: {
    fontSize: 16,
    color: "#000000",
  },
  dropdown: {
    borderColor: "#080202",
    borderRadius: 5,
    marginTop: 8,
  },
  dropdownRow: {
    backgroundColor: "#FFFFFF",
  },
});
