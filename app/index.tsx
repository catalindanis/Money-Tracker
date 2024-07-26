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
            <Link href="/authentication/login">Login</Link>
            <Link href="/authentication/register">Register</Link>
        </View>
      );
}
