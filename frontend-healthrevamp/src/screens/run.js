import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { googleMapApi } from "../config/apiKey";
import Geolocation from "react-native-geolocation-service";
import * as Location from "expo-location";
import { getDistance } from "geolib";
import { LinearGradient } from "expo-linear-gradient";
import { updateRun } from "../actions/action";
import { selectData, selectLoading, selectError } from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
export default function Run() {
  const { navigate } = useNavigation();
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [prevLocation, setPrevLocation] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [polylineMap, setPolylineMap] = useState([]);
  const [placeIdOrigin, setPlaceIdOrigin] = useState("");
  const [placeIdDestination, setPlaceIdDestination] = useState("");
  const [Run, setRun] = useState(false);
  const [heightRun, setHeightRun] = useState(800);
  const [seeTotalDistance, setSeeTotalDistance] = useState("none");
  const [fixTotalDistance, setfixTotalDistance] = useState(0);
  const locationChange = (location) => {
    console.log(location);
  };
  const onPress = () => {
    postMap(placeIdOrigin, placeIdDestination);
  };
  const updateUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync();
        const { latitude, longitude } = location.coords;

        setUserLocation({ latitude, longitude });

        if (prevLocation) {
          const distance = calculateDistance(
            prevLocation.latitude,
            prevLocation.longitude,
            latitude,
            longitude
          );

          console.log(distance, totalDistance);

          if (distance > 0.0001) {
            setTotalDistance(totalDistance + distance);
          }
        }

        setPrevLocation({ latitude, longitude });
      } else {
        console.log("Permission denied");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Earth's radius in kilometers
    // console.log(lat2 - lat1, '<<<< ini lat 1')
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const postMap = async (placeIdOrigin, placeIdDestination) => {
    try {
      const { data } = await axios({
        url: `https://routes.googleapis.com/directions/v2:computeRoutes`,
        method: "post",
        data: {
          origin: {
            // Union field location_type can be only one of the following:
            placeId: placeIdOrigin,
            // End of list of possible types for union field location_type.
          },
          destination: {
            // Union field location_type can be only one of the following:
            placeId: placeIdDestination,
            // End of list of possible types for union field location_type.
          },
        },
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": googleMapApi,
          "X-Goog-FieldMask":
            "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
        },
      });

      console.log(data.routes[0]?.polyline?.encodedPolyline);
      const decodedPolyline = polyline
        .decode(data.routes[0]?.polyline?.encodedPolyline)
        .map(([latitude, longitude]) => ({
          latitude,
          longitude,
        }));
      setPolylineMap(decodedPolyline);
      mapRef.current.fitToCoordinates(decodedPolyline, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
      console.log(decodedPolyline);
    } catch (err) {
      console.log("here");
      console.log(err);
    }
  };

  const startRun = () => {
    setTotalDistance(0);
    updateUserLocation();
    setHeightRun(600);
    setRun(true);
  };
  const finishRun = async () => {
    // setfixTotalDistance(totalDistance)
    const AlertSuccess = () => {
      Alert.alert(`Your total distance ${totalDistance}`);
    };
    dispatch(updateRun(totalDistance, AlertSuccess));
    setRun(false);
    navigate("Dashboard");
    // setSeeTotalDistance("flex");
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
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <View
          style={{
            display: seeTotalDistance,
            position: "absolute",
            zIndex: 1,
            flex: 1,
            alignItems: "center",
            // justifyContent: "flex-start",
            width: "100%",
            backgroundColor: "black",
            height: 1000,
            opacity: 0.9,
          }}
        >
          <View style={{ marginTop: 60 }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 10,
                color: "#fff",
              }}
            >
              Your total distance
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {Math.ceil(fixTotalDistance * 1000)}
            </Text>
          </View>
        </View>
        <View style={{ height: heightRun }}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            userLocationUpdateInterval={0}
            onUserLocationChange={() => updateUserLocation()}
            style={styles.map}
          >
            {polylineMap.length > 0 && (
              <>
                <Marker
                  coordinate={{
                    latitude: polylineMap[0].latitude,
                    longitude: polylineMap[0].longitude,
                  }}
                  title="Origin"
                  pinColor="blue"
                />
                <Marker
                  coordinate={{
                    latitude: polylineMap[polylineMap.length - 1].latitude,
                    longitude: polylineMap[polylineMap.length - 1].longitude,
                  }}
                  title="Destination"
                  pinColor="green"
                />
              </>
            )}

            <Polyline
              coordinates={polylineMap}
              strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
              strokeWidth={3}
            />
          </MapView>
          {Run ? (
            <>
              <View style={{ padding: 10, backgroundColor: "#22C49D" }}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: 10,
                    color: "#fff",
                  }}
                >
                  Total Distance
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  {`${Math.ceil(totalDistance * 1000)}  m`}
                </Text>
              </View>
              <View style={styles.autocompleteContainer}>
                <TouchableOpacity
                  onPress={() => finishRun()}
                  underlayColor="transparent"
                  activeOpacity={1}
                >
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Finish</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View style={styles.container}>
              <GooglePlacesAutocomplete
                listViewDisplayed={false}
                placeholder="Location Start"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setPlaceIdOrigin(data?.place_id);
                  console.log(data?.place_id);
                  console.log(details?.geometry);
                }}
                query={{
                  key: googleMapApi,
                  language: "en",
                }}
                styles={{
                  container: {
                    flex: 1,
                    backgroundColor: "white",
                    zIndex: 3,
                    position: "absolute",
                    top: 0,
                    width: "100%",
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
                    pointerEvents: "auto",
                  },
                  textInputContainer: {
                    backgroundColor: "#EEEEEE",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: 18,
                  },
                  textInput: {
                    margin: 12,
                    borderWidth: 8,
                    paddingLeft: 20,
                    backgroundColor: "#EEEEEE",
                    borderColor: "#EEEEEE",
                    shadowColor: "#9B9B9B",
                  },
                  predefinedPlacesDescription: {
                    color: "#333333",
                  },
                }}
              />
              <GooglePlacesAutocomplete
                listViewDisplayed={false}
                placeholder="Destination"
                onPress={(data, details = null) => {
                  // 'details' is provided when fetchDetails = true
                  setPlaceIdDestination(data?.place_id);
                  console.log(data?.place_id);
                  console.log(details?.geometry);
                }}
                query={{
                  key: googleMapApi,
                  language: "en",
                }}
                styles={{
                  container: {
                    flex: 1,
                    backgroundColor: "white",
                    zIndex: 2,
                    position: "absolute",
                    top: 90,
                    width: "100%",
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
                    pointerEvents: "auto",
                  },
                  textInputContainer: {
                    backgroundColor: "#EEEEEE",
                    borderTopWidth: 0,
                    borderBottomWidth: 0,
                    borderRadius: 18,
                  },
                  textInput: {
                    margin: 12,
                    borderWidth: 1,
                    paddingLeft: 20,
                    backgroundColor: "#EEEEEE",
                    borderColor: "#EEEEEE",
                    shadowColor: "#9B9B9B",
                  },
                  predefinedPlacesDescription: {
                    color: "#333333",
                  },
                  description: {
                    fontWeight: "bold",
                  },
                }}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={{ zIndex: 0 }}
                  onPress={() => onPress()}
                  underlayColor="transparent"
                  activeOpacity={1}
                >
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Set Route</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ zIndex: 0 }}
                  onPress={() => startRun()}
                  underlayColor="transparent"
                  activeOpacity={1}
                >
                  <LinearGradient
                    colors={["#0C6EB1", "#22C49D"]}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={styles.button}
                  >
                    <Text style={styles.text}>Start</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    marginTop: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 18,
    elevation: 3,
    backgroundColor: "#0C6EB1",
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  autocompleteContainer: {
    height: 200,
    paddingHorizontal: 32,
  },
});
