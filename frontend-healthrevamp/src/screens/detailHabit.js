import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

const DetailChallange = () => {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const countRef = useRef(null);

  //start  button
  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };

  //pause button
  const handlePause = () => {
    clearInterval(countRef.current);
    setIsPaused(true);
  };

  //countinue button
  const handleContinue = () => {
    setIsPaused(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer + 1);
    }, 1000);
  };
  //reset button
  const handleReset = () => {
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const second = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${second
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <View style={{ display: "flex" }}>
      <View
        style={{
          borderRadius: 35,
          padding: 10,
          margin: 10,
          minWidth: 125,
          backgroundColor: "#fff",
          shadowColor: "#000",
          alignItems: "center",
          justifyContent: "center",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontSize: 70,
            fontWeight: "bold",
          }}
        >
          Lari
        </Text>
        <Text style={{ paddingTop: 10, fontSize: 24 }}>description</Text>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
          }}
        >
          <Text style={{ fontSize: 30 }}>Stopwatch</Text>
          <Text style={{ fontSize: 100 }}>{formatTime(timer)}</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {!isActive && !isPaused ? (
            <LinearGradient
              colors={["#0C6EB1", "#22C49D"]}
              start={[0, 0]}
              end={[1, 0]}
              style={{ borderRadius: 40, height: 70, width: 200 }}
            >
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={handleStart}
              >
                <Text style={{ fontSize: 50 }}>Start</Text>
              </TouchableOpacity>
            </LinearGradient>
          ) : (
            <View style={{ display: "flex", flexDirection: "row" }}>
              <LinearGradient
                colors={["#0C6EB1", "#22C49D"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{ borderRadius: 40, height: 50, width: 120, margin: 10 }}
              >
                <TouchableOpacity
                  onPress={handlePause}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Pause</Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["#0C6EB1", "#22C49D"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{ borderRadius: 40, height: 50, width: 120, margin: 10 }}
              >
                <TouchableOpacity
                  onPress={handleContinue}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  disabled={setIsActive}
                >
                  <Text style={{ fontSize: 30 }}>
                    {setIsActive ? "Disabled" : "Counti"}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={["#0C6EB1", "#22C49D"]}
                start={[0, 0]}
                end={[1, 0]}
                style={{ borderRadius: 40, height: 50, width: 120, margin: 10 }}
              >
                <TouchableOpacity
                  onPress={handleReset}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 30 }}>Reset</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DetailChallange;
