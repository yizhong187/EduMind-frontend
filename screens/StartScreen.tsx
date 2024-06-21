import { View, Text, Button, ScrollView } from "react-native";
import React from "react";
import { ScreenProps } from "../navigation/types";

type Props = ScreenProps<"Start">;

const StartScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <ScrollView>
      <Text>This is the start screen</Text>
      <Button
        title="Login"
        onPress={() => navigation.navigate("StudentLogin")}
      />
      <Button
        title="Register"
        onPress={() => navigation.navigate("StudentRegister")}
      />
    </ScrollView>
  );
};

export default StartScreen;
