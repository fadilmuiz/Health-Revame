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
import {
  selectData,
  selectLoading,
  selectError,
  selectDataUser,
} from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile() {
  const { navigate } = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const dataUser = useSelector(selectDataUser);

  const handleEdit = async () => {
    const move = () => {
      navigate("formedit");
    };
    const AlertSuccess = () => {
      Alert.alert("Success", "Edit successful!");
    };
    const AlertFailed = () => {
      Alert.alert("Edit failed!", "Check your input");
    };
    dispatch(
      doUpdate(
        username,
        email,
        password,
        height,
        width,
        move,
        AlertSuccess,
        AlertFailed
      )
    );
  };

  return (
    <>
      <ScrollView
        style={{ height: "100%", flex: 1, backgroundColor: "#1E87CE" }}
      >
        <View
          style={{
            height: 830,
            backgroundColor: "#fff",
            borderTopEndRadius: 50,
            borderTopStartRadius: 50,
          }}
        >
          <Text
            style={{
              marginTop: 30,
              // marginLeft: 20,
              fontSize: 30,
              fontWeight: "bold",
              // letterSpacing: 0.25,
              color: "#000",
              textAlign: "center",
            }}
          >
            My Profile
          </Text>

          <View
            style={{
              // marginLeft: 20,
              marginTop: 20,
              width: "100%",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                borderColor: "#1E87CE",
                borderWidth: 2,
                resizeMode: "contain",
              }}
              source={require("../../assets/goodview.png")}
            ></Image>
          </View>
          <Text style={{fontSize: 24, textAlign: 'center', fontWeight: 'bold'}}>{dataUser?.username}</Text>
          <View
            style={{
              marginTop: 10,
              marginBottom: 20,
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 20,
              paddingHorizontal: 20,
            }}
          >
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#0C6EB1", "#22C49D"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.button}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigate("Update Profile");
                  }}
                  underlayColor="transparent"
                  activeOpacity={1}
                  style={{ flexDirection: "row" }}
                >
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="create-outline"
                    size={20}
                    color={"#fff"}
                  />
                  <Text style={{ color: "#fff" }}>Update Profile</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            <View style={{ flex: 1 }}>
              <LinearGradient
                colors={["#0C6EB1", "#22C49D"]}
                start={[0, 0]}
                end={[1, 0]}
                style={styles.button}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigate("Payment");
                  }}
                  underlayColor="transparent"
                  activeOpacity={1}
                  style={{ flexDirection: "row", gap: 10 }}
                >
                  <Ionicons
                    style={{ textAlign: "center" }}
                    name="card-outline"
                    size={20}
                    color={"#fff"}
                  />
                  <Text style={{ color: "#fff" }}>Payment</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>

          <View style={styles.containerForm}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginLeft: 17,
                  fontSize: 16,
                  color: "#000",
                  marginTop: 12,
                  textAlign: 'center'
                }}
              >
                Total Calorie
              </Text>
              <Text style={styles.input}>{dataUser?.totalCalorie}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginLeft: 17,
                  fontSize: 16,
                  color: "#000",
                  marginTop: 12,
                  textAlign: 'center'
                }}
              >
                Height
              </Text>
              <Text style={styles.input}>{dataUser?.height}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text
                style={{
                  marginLeft: 17,
                  fontSize: 16,
                  color: "#000",
                  marginTop: 12,
                  textAlign: 'center'
                }}
              >
                Weight
              </Text>
              <Text style={styles.input}>{dataUser?.weight}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerForm: {
    padding: 3,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  input: {
    marginHorizontal: 12,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#000'
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
