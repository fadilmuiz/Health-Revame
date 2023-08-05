import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectGetActivities } from "../slice/selector";
import { getActivities } from "../actions/action";
import Ionicons from "@expo/vector-icons/Ionicons";
import { selectData, selectLoading, selectError } from "../slice/selector";
export default function ChallengeScreen() {
  const [cardPressed, setCardPressed] = useState("");
  const navigation = useNavigation();
  const activities = useSelector(selectGetActivities);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  // console.log(activities, "<< dtaa");

  const navigateOnPressed = (id) => {
    navigation.navigate("ChallengeStart", { id });
    // console.log(id);
  };

  const onPressedIn = (i) => {
    setCardPressed(i);
  };

  const onPressedOut = () => {
    setCardPressed(null);
  };

  useEffect(() => {
    dispatch(getActivities());
  }, []);

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
      <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* images */}
        <View>
          <View
            style={{
              paddingLeft: 50,
              paddingRight: 50,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Image
              style={{ width: "100%", height: 250, resizeMode: "contain" }}
              source={require("../../assets/challange-page.png")}
            />
          </View>
          {/* Card */}
          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Challenges
          </Text>
          <View style={styles.container}>
            {activities?.map((el) => (
              <TouchableHighlight
                key={el._id}
                style={[
                  styles.cardContainer,
                  cardPressed === el.id && styles.cardContainerPressed,
                ]}
                onPressIn={() => onPressedIn(el._id)}
                onPressOut={onPressedOut}
                onPress={() => navigateOnPressed(el._id)}
                underlayColor="#dcdcdc"
              >
                <View style={styles.card}>
                  <Image
                    source={require("../../assets/activity.png")}
                    style={{ width: 50, height: 50 }}
                  />
                  <Text
                    style={{ textTransform: "capitalize", textAlign: "center" }}
                  >
                    {el.activity}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    marginBottom: 40,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 26,
  },
  cardContainer: {
    height: 100,
    width: 150,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 16,
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
  cardContainerPressed: {
    backgroundColor: "#dcdcdc",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
});
