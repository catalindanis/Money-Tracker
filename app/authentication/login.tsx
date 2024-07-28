import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
} from "react-native";
import { Link, router } from "expo-router";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { useFonts } from "expo-font";
import loginMessage from "../messages/login";
import authenticationDB from "../database/authentication";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default function LoginScreen() {
  let [fontsLoaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [hidePassword, setHidePassword] = useState(true);

  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const [submitButton, setSubmitButton] = useState(false);

  const [message, setMessage] = useState(" ");
  const [messageColor, setMessageColor] = useState(0);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        paddingTop: 50,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: 25,
          }}
        >
          Already have an account?
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Email</Text>
        <View>
          <View
            style={{
              height: 50,
              width: 40,
              position: "absolute",
              zIndex: 1,
              left: -1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome size={22} name="envelope" />
          </View>
          <TextInput
            style={styles.textInput}
            autoComplete="email"
            placeholder="Type your email"
            placeholderTextColor={Colors.gray}
            onChangeText={(text) => {
              setEmailField(text);
            }}
          ></TextInput>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Password</Text>
        <View>
          <View
            style={{
              height: 50,
              width: 40,
              position: "absolute",
              zIndex: 1,
              left: 0,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome size={27} name="lock" />
          </View>
          <TextInput
            style={styles.textInput}
            autoComplete="current-password"
            secureTextEntry={hidePassword}
            placeholder="Type your password"
            placeholderTextColor={Colors.gray}
            onChangeText={(text) => {
              setPasswordField(text);
            }}
          ></TextInput>
          <View
            style={{
              height: 50,
              width: 40,
              position: "absolute",
              zIndex: 1,
              right: 6,
            }}
          >
            <Pressable
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
              style={{
                height: 50,
                width: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesome
                size={27}
                name={!hidePassword ? "eye-slash" : "eye"}
              />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ width: 350 }}>
        <Pressable
          style={{
            justifyContent: "flex-end",
          }}
          onPress={() => {
            if (
              !checkForgotPassword(
                authenticationDB.auth,
                emailField,
                setMessage,
                setMessageColor
              )
            )
              return;
          }}
        >
          <Text
            style={{
              fontFamily: "Montserrat",
              fontSize: 15,
              color: Colors.red,
            }}
          >
            Forgot your password?
          </Text>
        </Pressable>
      </View>

      <View style={submitButton ? styles.submitFocus : styles.submit}>
        <Pressable
          style={{
            width: 250,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPressIn={() => {
            setSubmitButton(true);
            setTimeout(() => {
              setSubmitButton(false);
            }, 150);
          }}
          onPress={() => {
            Keyboard.dismiss();
            if (
              !checkIfValid(
                authenticationDB.auth,
                emailField,
                passwordField,
                setMessage,
                setMessageColor
              )
            )
              return;
          }}
        >
          <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
            Sign in
          </Text>
        </Pressable>
      </View>

      <Text
        style={{
          color: messageColor == 0 ? Colors.darkred : Colors.green,
          fontFamily: "MontserratSemiBold",
          textAlign: "center",
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        {message}
      </Text>
    </View>
  );
}

function checkForgotPassword(auth, email, setMessage, setMessageColor) {
  if (email === "") {
    setMessage(loginMessage.resetPasswordEmailEmpty);
    setMessageColor(0);
    return false;
  }

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (reg.test(email) === false) {
    setMessage(loginMessage.emailInvalidFormat);
    setMessageColor(0);
    return false;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      setMessage(loginMessage.resetPasswordSuccess);
      setMessageColor(1);
    })
    .catch((error) => {
      setMessage(loginMessage.unknownError);
      setMessageColor(0);
    });
}

function checkIfValid(auth, email, password, setMessage, setMessageColor) {
  if (email === "" || password === "") {
    setMessage(loginMessage.fieldEmpty);
    setMessageColor(0);
    return false;
  }

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  if (reg.test(email) === false) {
    setMessage(loginMessage.emailInvalidFormat);
    setMessageColor(0);
    return false;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //TODO after sign in screen
      if (!userCredential.user.emailVerified) {
        setMessage(loginMessage.emailNotVerified);
        setMessageColor(0);
        return false;
      }
      // setMessage(loginMessage.loginSucces);
      // setMessageColor(1);
      router.replace("../home/home");
    })
    .catch((error) => {
      setMessage(loginMessage.accountNotFound);
      setMessageColor(0);
      return false;
    });

  return true;
}

const styles = StyleSheet.create({
  icon: {
    height: 95,
    width: 95,
  },
  field: {
    margin: 10,
  },
  fieldTitle: {
    fontSize: 25,
    fontFamily: "MontserratBold",
  },
  textInput: {
    height: 50,
    width: 350,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 35,
    paddingRight: 40,
    fontFamily: "MontserratSemiBold",
    backgroundColor: Colors.lightgray,
  },
  submit: {
    height: 70,
    width: 250,
    borderRadius: 10,
    backgroundColor: Colors.yellow,
    margin: 10,
  },
  submitFocus: {
    height: 70,
    width: 250,
    borderRadius: 10,
    backgroundColor: Colors.darkyellow,
    margin: 10,
  },
});
