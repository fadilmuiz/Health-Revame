import { CardForm, useConfirmPayment } from "@stripe/stripe-react-native";
import { useCallback, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { BASE_URL } from "../config/base-API";
import { LinearGradient } from "expo-linear-gradient";
import { updateSubs } from "../actions/action";
import { selectData, selectLoading, selectError } from "../slice/selector";
import { useSelector, useDispatch } from "react-redux";
const PaymentScreen = () => {
  const loadingPayment = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [card, setCard] = useState({
    brand: "",
    complete: "",
    country: "",
    expiryMonth: "",
    expiryYear: "",
    last4: "",
    postalCode: "",
  });
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = useCallback(async () => {
    const response = await fetch(`${BASE_URL}/api/payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currency: "sgd",
        duration: 180,
      }),
    });
    const { clientSecret } = await response.json();
    console.log("here");

    return clientSecret;
  }, []);

  const handlePayPress = useCallback(async () => {
    if (!card) {
      return;
    }

    try {
      // Fetch Intent Client Secret from backend
      const billingDetails = {
        email: "adibhasany1501@gmail.com",
      };
      const clientSecret = await fetchPaymentIntentClientSecret();
      console.log(clientSecret);
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: "Card",
        paymentMethodData: {
          billingDetails,
        },
      });
      console.log("Success from promise", paymentIntent);
      dispatch(updateSubs(120));
      const response = await fetch(`${BASE_URL}/api/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: access_token,
        },
      });
      if (response.ok) {
        Alert.alert("Succesfully Payment");
      } else {
        throw new Error("failed payment");
      }
      // ...
    } catch (e) {
      // ...
      console.log("Payment confirmation error", e);
    }
  }, [card, fetchPaymentIntentClientSecret]);

  return (
    <>
      {loadingPayment && (
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
      <View>
        <LinearGradient
          colors={["#0C6EB1", "#22C49D"]}
          start={[0, 0]}
          end={[1, 0]}
          style={{ paddingVertical: 20 }}
        >
          <Text
            style={{
              marginTop: 30,
              textAlign: "center",
              fontSize: 18,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Subscribe for 6 Month
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Rp 200.000
          </Text>
        </LinearGradient>
      </View>
      <View style={{ padding: 20 }}>
        <CardForm
          cardStyle={{
            backgroundColor: "#FFFFFF",
          }}
          style={{
            width: "100%",
            height: 300,
          }}
          onFormComplete={(cardDetails) => {
            console.log(cardDetails);
            setCard(cardDetails);
          }}
        />
        {/* <Button onPress={handlePayPress} title="Pay"  /> */}
        <View style={{ padding: 20.0 }}>
          <LinearGradient
            colors={["#0C6EB1", "#22C49D"]}
            start={[0, 0]}
            end={[1, 0]}
            style={styles.button}
            onPress={handlePayPress}
          >
            <TouchableOpacity onPress={handlePayPress} disabled={loading}>
              <Text style={styles.text}>Pay</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </>
  );
};

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

export default PaymentScreen;
