import React, { useState, useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { doAddhabbits } from "../actions/action";
import { selectData, selectLoading, selectError } from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
import { getAllHabbits } from "../slice/slice";
import { addHabbits } from "../slice/slice";
import { delHabbits } from "../slice/slice";
import { LongPressGestureHandler, State } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Habbits() {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [displayAddHabbits, setDisplayAddHabbits] = useState("none");
  // Date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [textTime, setText] = useState();

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText(fTime);

    // console.log(fDate + ' (' + fTime + ')' )
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };
  // Date
  const { habbitsData } = useSelector((state) => state.user);
  const data = habbitsData.habits;

  const storeData = async () => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value !== null) {
        dispatch(getAllHabbits(value));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    storeData();
  }, []);

  // everyting form
  const seeForm = () => {
    setDisplayAddHabbits("flex");
  };
  const hideForm = () => {
    setDisplayAddHabbits("none");
  };
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  
  const handleAddHabbits = async () => {
    storeDataAdd();
  };
  const storeDataAdd = async () => {
    try {
      const move = () => {
        setDisplayAddHabbits("none");
      };
      const AlertSuccess = () => {
        Alert.alert("Success", "Add successful!");
        move();
      };
      const AlertFailed = () => {
        Alert.alert("Adding failed!", "Check your input");
      };
      const value = await AsyncStorage.getItem("access_token");
      if (value !== null) {
        dispatch(
          addHabbits({
            value,
            name,
            textTime,
            description,
            AlertSuccess,
            AlertFailed,
            move,
            storeData,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      alert("I've been pressed for 800 milliseconds");
    }
  };
  const subjects = [
    {
      id: 1,
      name: "Runing",
      time: "Senen, 29 April pukul 12.00",
      description: "lorem mejikuhibiniu abc 5 dasar ditaman ",
    },
    {
      id: 2,
      name: "Kayang",
      time: "Selasa, 30 April pukul 12.00",
      description: "lorem 2 mejikuhibiniu abc 5 dasar ditaman ",
    },
    {
      id: 3,
      name: "Push-Up",
      time: "Rabu, 31 April pukul 12.00",
      description: "lorem 3 mejikuhibiniu abc 5 dasar ditaman ",
    },
    {
      id: 4,
      name: "Sit-Up",
      time: "Kamis, 32 April pukul 12.00",
      description: "lorem 4 mejikuhibiniu abc 5 dasar ditaman ",
    },
  ];

  const delData = async (id, AlertSuccess, AlertFailed) => {
    try {
      const value = await AsyncStorage.getItem("access_token");
      if (value !== null) {
        dispatch(
          delHabbits({ value, id, storeData, AlertSuccess, AlertFailed })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const longPress = (id) => {
    const AlertFailed = () => {
      Alert.alert("Failed to delete!");
    };
    const AlertSuccess = () => {
      Alert.alert("Successfully deleted");
    };
    delData(id, AlertSuccess, AlertFailed);
  };

  function formatDate(date) {
    let day = String(date.getDate()).padStart(2, "0");
    let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
    let year = date.getFullYear();

    let formattedDate = month + " " + day + ", " + year;
    return formattedDate;
  }

  return (
    <>
      {/* Form */}
      <View
        style={{
          display: displayAddHabbits,
          position: "absolute",
          zIndex: 1,
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          backgroundColor: "black",
          height: "100%",
          // opacity: 0.9,
        }}
      >
        <View style={{ marginTop: 60 }}>
          <Text
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: 30,
            }}
          >
            Add your habit
          </Text>
          <View
            style={{
              width: 400,
              paddingHorizontal: 10,
              paddingVertical: 20,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <View style={styles.containerForm}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 17,
                  marginLeft: 12,
                }}
              >
                Your habit
              </Text>
              <TextInput
                // placeholder="Your habbits"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 17,
                  marginLeft: 12,
                  marginTop: 5,
                }}
              >
                Your description{" "}
              </Text>
              <TextInput
                // placeholder="Your description"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
              />
              <View style={{ marginTop: 10 }}>
                {textTime && (
                  <Text
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                      marginBottom: 10,
                    }}
                  >
                    {textTime}
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => {
                    showMode("time");
                  }}
                  underlayColor="transparent"
                  activeOpacity={1}
                >
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.buttonSetTime}
                  >
                    <Text style={styles.text}>Set Time</Text>
                  </LinearGradient>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                  />
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={handleAddHabbits}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => hideForm()}>
              <Text
                style={{
                  marginLeft: 10,
                  color: "#FFFFFF",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity onPress={() => seeForm()}>
          <LinearGradient
            colors={["#0C6EB1", "#22C49D"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.buttonAdd}
          >
            <Ionicons
              name="add-circle-outline"
              style={{
                textAlign: "center",
                fontSize: 24,
                color: "#fff",
                fontWeight: "bold",
              }}
            />
            <Text style={styles.buttonText}>Add your habit</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={{ padding: 2 }}>
          {data?.map((el, i) => {
            return (
              <TouchableOpacity
                onLongPress={() => longPress(el.id)}
                underlayColor="transparent"
                activeOpacity={1}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderRadius: 35,
                    padding: 10,
                    margin: 10,
                    minWidth: 125,
                    backgroundColor: "#fff",
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Card content */}
                  <View>
                    <Image
                      source={require("../../assets/habits-icon.png")}
                      style={{ width: 70, height: 70 }}
                    />
                  </View>
                  <View key={i} style={{ marginLeft: 10, marginTop: 4 }}>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: "bold",
                      }}
                    >
                      {el.name}
                    </Text>
                    <Text style={{}}>{formatDate(new Date(el.time))}</Text>
                    <Text style={{ paddingTop: 10 }}>{el.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  buttonAdd: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 60,
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  containerForm: {
    // padding: 20.0,
  },
  input: {
    height: 50,
    borderWidth: 1,
    paddingLeft: 15,
    marginBottom: 15,
    marginTop: 15,
    paddingLeft: 15,
    borderRadius: 18,
    backgroundColor: "#EEEEEE",
    borderColor: "#EEEEEE",
    shadowColor: "#9B9B9B",
    width: "100%",
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
  buttonSetTime: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
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
