import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { useFonts } from "expo-font";

export default function RegisterScreen() {
  let [fontsLoaded] = useFonts({
    MontserratLight: require("../../assets/fonts/Montserrat-Light.ttf"),
    Montserrat: require("../../assets/fonts/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    MontserratBold: require("../../assets/fonts/Montserrat-Bold.ttf"),
  });

  const [hidePassword, setHidePassword] = useState(true);

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
          Create a new account
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Email</Text>
        <View>
          <FontAwesome
            style={{
              position: "absolute",
              zIndex: 1,
              top: 14,
              left: 10,
            }}
            size={20}
            name="envelope"
          />
          <TextInput
            style={styles.textInput}
            autoComplete="email"
            placeholder="Type your email"
            placeholderTextColor={Colors.gray}
          ></TextInput>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Password</Text>
        <View>
          <FontAwesome
            style={{
              position: "absolute",
              zIndex: 1,
              top: 12,
              left: 11,
            }}
            size={27}
            name="lock"
          />
          <TextInput
            style={styles.textInput}
            autoComplete="current-password"
            secureTextEntry={hidePassword}
            placeholder="Type your password"
            placeholderTextColor={Colors.gray}
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
          <FontAwesome
            style={{
              position: "absolute",
              zIndex: 1,
              top: 12,
              left: 11,
            }}
            size={27}
            name="lock"
          />
          <TextInput
            style={styles.textInput}
            autoComplete="current-password"
            secureTextEntry={hidePassword}
            placeholder="Type your password"
            placeholderTextColor={Colors.gray}
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

      <View style={styles.submit}>
        <Pressable
          style={{
            width: 250,
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "MontserratBold", fontSize: 20 }}>
            Register
          </Text>
        </Pressable>
      </View>
    </View>
  );
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
});
