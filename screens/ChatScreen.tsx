import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ScreenProps } from "../navigation/types";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ScreenProps<"Chat">;

const ChatScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <View>
      <Text>This will be the ChatScreen</Text>
    </View>
  );
};

export default ChatScreen;
