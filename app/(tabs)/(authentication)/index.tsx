import { Button, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index(){
    return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </View>
      );
}
