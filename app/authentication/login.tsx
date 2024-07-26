import { Button, Image, StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";
import { TextInput } from "react-native-gesture-handler";

export default function LoginScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.darkblue,
      }}
    >
      <View>
        <Image
          source={require("../../assets/images/wallet.png")}
          style={styles.icon}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Email</Text>
        <TextInput style={styles.textInput}></TextInput>
      </View>

      <View style={styles.field}>
        <Text style={styles.fieldTitle}>Password</Text>
        <TextInput style={styles.textInput}></TextInput>
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
    fontFamily: "Montserrat",
  },
  textInput: {
    height: 50,
    width: 350,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 25,
    padding: 3,
    fontFamily: "NunitoSans",
    backgroundColor: Colors.lightgray,
  },
});
