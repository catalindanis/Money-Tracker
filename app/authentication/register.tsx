import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { useFonts } from "expo-font";
import registerErrorMessage from "../messages/register"

export default function RegisterScreen() {
  let [fontsLoaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [hidePassword, setHidePassword] = useState(true);

  const [usernameField, setusernameField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");

  const [submitButton, setSubmitButton] = useState(false);

  const [errorMessage, setErrorMessage] = useState(" ");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginTop: -50,
      }}
    >
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontFamily: "Montserrat",
            fontSize: 25,
          }}
        >
          Create a new account
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Username</Text>
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
            <FontAwesome size={21} name="address-card" />
          </View>
          <TextInput
            style={styles.textInput}
            autoComplete="username"
            placeholder="Type your username"
            placeholderTextColor={Colors.gray}
            onChangeText={(text) => {
              setusernameField(text);
            }}
          ></TextInput>
        </View>
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

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Confirm Password</Text>
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
            secureTextEntry={hidePassword}
            placeholder="Type your password"
            placeholderTextColor={Colors.gray}
            onChangeText={(text) => {
              setConfirmPasswordField(text);
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
            if(!checkIfValid(usernameField, emailField, passwordField, confirmPasswordField, setErrorMessage))
              return;
          }}
        >
          <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
            Register
          </Text>
        </Pressable>
      </View>

      <Text style={{color: Colors.darkred, fontFamily: "MontserratSemiBold", textAlign: "center", marginLeft: 10, marginRight: 10,}}>{errorMessage}</Text>
    </View>
  );
}

function checkIfValid(username, email, password, confirmPassword, setErrorMessage){
  if(username === "" || email === "" || password === "" || confirmPassword === ""){
    setErrorMessage(registerErrorMessage.fieldEmpty);
    return false;
  }

  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  
  if (reg.test(email) === false){
    setErrorMessage(registerErrorMessage.emailInvalidFormat);
    return false;
  }

  if(password !== confirmPassword){
    setErrorMessage(registerErrorMessage.passwordsNotMatch);
    return false;
  }

  reg = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  if(reg.test(password) === false){
    setErrorMessage(registerErrorMessage.passwordSecurityLevel);
    return false;
  }
  
  //TODO connection with database and push credentials
  return false;

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
    backgroundColor: Colors.lightred,
    margin: 10,
  },
  submitFocus: {
    height: 70,
    width: 250,
    borderRadius: 10,
    backgroundColor: Colors.red,
    margin: 10,
  },
});
