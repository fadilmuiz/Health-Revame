import React, { useState, AsyncStorage, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  selectData,
  selectLoading,
  selectError,
  selectDataUser,
  selectDataUserRank,
} from "../slice/selector";
import { getUserRank } from "../actions/action";
import { doUpdate } from "../actions/action";
const subjects = [
  { id: 1, image: require("../../assets/run-icon.png"), navigate: "Run" },
  { id: 2, image: require("../../assets/habits-icon.png"), navigate: "Habbit" },
  {
    id: 3,
    image: require("../../assets/challange-icon.png"),
    navigate: "Challenge",
  },
  {
    id: 4,
    image: require("../../assets/nutrition-information-icon.png"),
    navigate: "Food Nutrition",
  },
];

const cardGap = 16;

const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;
function formatDate(date) {
  let day = String(date.getDate()).padStart(2, "0");
  let month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  let year = date.getFullYear();

  let formattedDate = month + " " + day + ", " + year;
  return formattedDate;
}

//NOTIFICATION
import messaging from "@react-native-firebase/messaging";

export default function DashboardPage() {
  const dataUser = useSelector(selectDataUser);
  const dataUserRanking = useSelector(selectDataUserRank);
  const [search, setSearch] = useState("");
  const { navigate } = useNavigation();
  const [displayRank, setDisplayRank] = useState("none");
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // format Date
  // Usage example:
  let currentDate = new Date(dataUser?.endSub);
  let formattedDate = formatDate(currentDate);
  console.log(formattedDate);
  // compare Date Expired
  const dateUserSub = [];
  dateUserSub.push(dataUser.endSub.split("-")[0]);
  dateUserSub.push(dataUser.endSub.split("-")[1]);
  dateUserSub.push(dataUser.endSub.split("-")[2].split("T")[0]);
  console.log(dateUserSub);
  const getDate = new Date();
  const dateUserComp = [];
  dateUserComp.push(getDate.getFullYear().toString());
  dateUserComp.push(getDate.getMonth().toString());
  dateUserComp.push(getDate.getDate().toString());
  const compareYear = +dateUserSub[0] - +dateUserComp[0];
  const compareMonth = +dateUserSub[1] - (+dateUserComp[1] + 1);
  const compareDate = +dateUserSub[2] - +dateUserComp[2];

  //NOTIFICATION
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log("Autho status:", authStatus);
    }
  };

  useEffect(() => {
    //NOTIFICATION
    const getTokenAndHandleNotifications = async () => {
      await requestUserPermission(); // Await the permission request

      messaging()
        .getToken()
        .then((token) => {
          console.log(token);
          //TOLONG KETIKA TOKEN DI SAVE KE DATABASE

          dispatch(doUpdate(token))

        })
        .catch((error) => {
          console.log("Failed to get token:", error);
        });

      // Check whether an initial notification is available
      messaging()
        .getInitialNotification()
        .then(async (remoteMessage) => {
          if (remoteMessage) {
            console.log(
              "Notification caused app to open from quit state:",
              remoteMessage.notification
            );
          }
        })
        .catch((error) => {
          console.log("Failed to get initial notification:", error);
        });

      // Assume a message-notification contains a "type" property in the data payload of the screen to open
      messaging().onNotificationOpenedApp(async (remoteMessage) => {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
      });

      // Register background handler
      messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        console.log("Message handled in the background!", remoteMessage);
      });

      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        Alert.alert(
          "A new FCM message arrived!",
          JSON.stringify(remoteMessage)
        );
      });

      return unsubscribe;
    };

    getTokenAndHandleNotifications(); // Call the new function

    // Empty dependency array to run the effect only once
    return async () => {};
  }, []);

  const seeRank = () => {
    dispatch(getUserRank());
    setDisplayRank("flex");
  };

  const closeSeeRank = () => {
    setDisplayRank("none");
  };
  console.log(dataUserRanking.message);
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
      {compareYear === 0 && compareMonth === 0 && compareDate < 1 ? (
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
          <TouchableOpacity
            onPress={() => {
              navigate("Payment");
            }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
                paddingHorizontal: 20,
              }}
            >
              Your account is expired. Tap this word to make a payment.
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView style={{ marginTop: "0%" }}>
          <View
            style={{
              display: displayRank,
              position: "absolute",
              zIndex: 1,
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
              backgroundColor: "black",
              height: "100%",
              opacity: 0.9,
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
                Ranking
              </Text>
              <View
                style={{
                  // backgroundColor: "white",
                  width: 360,
                  paddingVertical: 10,
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <View style={styles.containerTable}>
                  <View style={styles.tableRow}>
                    <Text style={[styles.tableCell, styles.headerCell]}>#</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                      Name
                    </Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>
                      Total Calorie
                    </Text>
                  </View>
                  <FlatList
                    data={dataUserRanking.message?.users}
                    renderItem={({ item, index }) => {
                      return (
                        <View style={styles.tableRow}>
                          <Text style={styles.tableCell}>{index + 1}</Text>
                          <Text style={styles.tableCell}>{item?.username}</Text>
                          <Text style={styles.tableCell}>
                            {item?.totalCalorie}
                          </Text>
                        </View>
                      );
                    }}
                    keyExtractor={(item) => item.id}
                  />
                  {/* Add more rows as needed */}
                </View>
                <TouchableOpacity
                  onPress={() => closeSeeRank()}
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
                      <Text style={styles.text}>Close</Text>
                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            {/* Profile */}
            <View style={styles.containerProfile}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textProfile}>
                  Hi, {dataUser?.username}
                  <Text style={{ fontSize: 16, color: "#fff" }}>
                    {" "}
                    lvl.{dataUser?.level}
                  </Text>
                </Text>
                <Text style={styles.textHallo}>Let's check your activity</Text>
                <Text
                  style={{
                    fontSize: 12,
                    backgroundColor: "#22C49D",
                    color: "#fff",
                    marginTop: 10,
                    fontWeight: "bold",
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    paddingLeft: 15,
                    borderRadius: 16,
                    elevation: 2,
                    shadowColor: "#969696",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                    overflow: "hidden",
                  }}
                >
                  Your account will be expired at {formattedDate}
                </Text>
                {compareYear === 0 &&
                compareMonth <= 1 &&
                compareDate <= 7 &&
                compareDate > 0 ? (
                  <Text
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      marginTop: 10,
                      fontWeight: "bold",
                      paddingVertical: 4,
                      paddingHorizontal: 10,
                      borderColor: "red",
                      borderWidth: 2,
                    }}
                  >
                    Your account will be expired at {formattedDate}
                  </Text>
                ) : (
                  ""
                )}
              </View>
              <View style={{ marginRight: 10 }}>
                <Image
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: 100,
                    borderWidth: 2,
                    borderColor: "#fff",
                  }}
                  source={require("../../assets/goodview.png")}
                ></Image>
              </View>
            </View>

            {/* give rank */}
            <TouchableOpacity
              onPress={() => seeRank()}
              underlayColor="transparent"
              activeOpacity={1}
            >
              <View style={styles.containerGiveRank}>
                <Text style={styles.textGiveRank}>Check your rank</Text>
                <Ionicons
                  name="star-outline"
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    color: "blue",
                  }}
                />
              </View>
            </TouchableOpacity>

            {/* calories */}
            <View style={styles.containerCalories}>
              <View>
                <Text
                  style={{
                    fontSize: 24,
                    paddingLeft: 20,
                    paddingTop: 10,
                    fontWeight: "bold",
                  }}
                >
                  Calories
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginLeft: 30,
                  marginRight: 30,
                }}
              >
                <LinearGradient
                  colors={["#0C6EB1", "#22C49D"]}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={styles.linearStyle}
                >
                  <View style={styles.textContainer}>
                    <Text style={{ fontSize: 40, fontWeight: "bold" }}>
                      {dataUser?.totalCalorie}
                    </Text>
                    <Text style={{ fontSize: 30 }}>KCL</Text>
                  </View>
                </LinearGradient>
              </View>
            </View>

            {/* Card feature */}
            <View style={{}}>
              <Text
                style={{
                  fontSize: 24,
                  paddingTop: 10,
                  paddingBottom: 0,
                  paddingLeft: 16,
                  paddingRight: 16,
                  fontWeight: "bold",
                }}
              >
                Features
              </Text>
              <View style={styles.container}>
                {subjects.map((subject, i) => {
                  return (
                    <View
                      key={subject.id}
                      style={[
                        styles.cardContainer,
                        {
                          marginTop: cardGap,
                          marginLeft: i % 2 !== 0 ? cardGap : 0,
                          width: cardWidth,
                        },
                      ]}
                    >
                      <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigate(subject.navigate)}
                      >
                        <Image
                          key={i}
                          source={subject.image}
                          style={{ width: 60, height: 60 }}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  containerNutrition: {
    margin: 10,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "87%",
    flex: 1,
    paddingTop: 9,
  },
  inputNutrition: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  // =====================
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    height: 90,
    width: 100,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerProfile: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 30,
    paddingRight: 30,
    padding: 40,
    flex: 1,
    backgroundColor: "#1E87CE",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    marginBottom: 10,
    gap: 20,
  },
  textProfile: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 24,
  },
  textHallo: {
    color: "#fff",
    lineHeight: 25,
    fontWeight: 500,
    fontSize: 20,
  },
  containerGiveRank: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 60,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  textGiveRank: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 20,
  },
  containerCalories: {
    backgroundColor: "#FFFFFF",
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  linearStyle: {
    borderRadius: 1000,
    height: 230,
    width: 230,
    margin: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    borderRadius: 1000,
    height: 200,
    width: 200,
    margin: 30,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
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
  // table
  containerTable: {
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
    backgroundColor: "#1E87CE",
    color: "#fff",
  },
});
