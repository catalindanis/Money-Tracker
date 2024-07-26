import { Button, Text, View } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function LoginScreen(){
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.smokewhite
          }}
        >
            <Text>Login</Text>
        </View>
      );
}
