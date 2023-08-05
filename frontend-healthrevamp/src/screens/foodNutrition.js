import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { doSearch } from "../actions/action";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectData,
  selectLoading,
  selectError,
  selectDataSearch,
} from "../slice/selector";
import { LinearGradient } from "expo-linear-gradient";
export default function FoodNutrition() {
  const [search, setSearch] = useState("");
  const dataSearch = useSelector(selectDataSearch);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const onClickSearch = async () => {
    AsyncStorage.getItem("access_token")
      .then((value) => {
        if (value !== null) {
          console.log("access_token:", value);
          dispatch(doSearch(search, value));
        } else {
          console.log("No data found");
        }
      })
      .catch((error) => {
        console.log("Error retrieving data:", error);
      });
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
      <ScrollView>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            paddingTop: 40,
            paddingBottom: 20,
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          Find your nutrition
        </Text>
        <TextInput
          placeholder="search"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
        />
        <View style={{ padding: 20.0 }}>
          <TouchableOpacity onPress={() => onClickSearch()}>
            <LinearGradient
              colors={["#0C6EB1", "#22C49D"]}
              start={[0, 0]}
              end={[1, 0]}
              style={styles.button}
            >
              <Text style={styles.text}>Search</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        {dataSearch ? (
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <View style={styles.card}>
              <View style={styles.image}>
                <Image
                  source={{ uri: dataSearch.images[0].image }}
                  style={{ width: "100%", height: 200, resizeMode: "cover" }}
                />
              </View>
              <View style={styles.body}>
                <Text style={styles.title}>
                  {dataSearch.nutrition.items[0]?.name}
                </Text>
                <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
                  Calories: {dataSearch.nutrition.items[0]?.calories} kcal
                </Text>
                <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
                  Protein: {dataSearch.nutrition.items[0]?.protein_g} gram
                </Text>
                <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
                  Cholesterol: {dataSearch.nutrition.items[0]?.cholesterol_mg}{" "}
                  miligram
                </Text>
                <Text style={{ marginBottom: 8, fontWeight: "bold" }}>
                  Sugar: {dataSearch.nutrition.items[0]?.sugar_g} gram
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              margin: 40,
            }}
          >
            <Image
              source={require("../../assets/find-nutrition.png")}
              style={{ width: 100, height: 100 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: 'center'}}>
              Good food makes you healthy. Find your nutrition here.
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
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
    marginBottom: 20,
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
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "grey",
  },
  body: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#000000",
    textTransform: 'capitalize'
  },
  description: {
    fontSize: 16,
    color: "#000000",
    lineHeight: 20,
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
