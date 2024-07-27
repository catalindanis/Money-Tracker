import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";
import Colors from "../../constants/Colors";
import { useEffect, useRef, useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

export default function AuthenticationLayout() {
  const [loginFocused, setLoginFocused] = useState(true);

  return (
    <Tabs screenOptions={{ tabBarHideOnKeyboard: true }}>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: loginFocused
            ? styles.tabBarItemStyleFocused
            : styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: () => <FontAwesome size={35} name="user" />,
          title: "Login",
          
        }}
        listeners={{
          tabPress: () => {
            setLoginFocused(true);
          },
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: !loginFocused
            ? styles.tabBarItemStyleFocused
            : styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIcon: () => <FontAwesome size={33} name="user-plus" />,
          tabBarIconStyle: styles.tabBarIconStyle,
          title: "Register",
        }}
        listeners={{
          tabPress: () => {
            setLoginFocused(false);
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    borderTopWidth: 0,
  },
  tabBarItemStyleFocused: {
    justifyContent: "center",
    backgroundColor: Colors.gray,
  },
  tabBarItemStyle: {
    justifyContent: "center",
    backgroundColor: Colors.lightgray,
  },
  tabBarLabelStyle: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: 25,
    display: "none",
  },
  tabBarIconStyle: {
    backgroundColor: "black",
  },
});


