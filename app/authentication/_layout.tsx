import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";
import { useState } from "react";

export default function AuthenticationLayout() {
  const [loginFocused, setLoginFocused] = useState(true);

  return (
    <Tabs>
      <Tabs.Screen
        name="login"
        options={{
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarItemStyle: loginFocused ? styles.tabBarItemStyleFocused : styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          title: "Login"
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
          tabBarItemStyle: !loginFocused ? styles.tabBarItemStyleFocused : styles.tabBarItemStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarIconStyle: styles.tabBarIconStyle,
          title: "Register"
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
    backgroundColor: Colors.smokewhite,
    height: 100,
    borderTopWidth: 0,
  },
  tabBarItemStyleFocused: {
    justifyContent: "center",
    backgroundColor: Colors.lightblue,
  },
  tabBarItemStyle: {
    justifyContent: "center",
    backgroundColor: "gray",
  },
  tabBarLabelStyle: {
    color: "black",
    fontFamily: "Montserrat",
    fontSize: 25,
  },
  tabBarIconStyle: {
    display: "none",
  },
});
