import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "./types";
import ChatScreen from "../screens/ChatScreen";
import StudentLoginScreen from "../screens/StudentLoginScreen";
import StartScreen from "../screens/StartScreen";
import StudentRegisterScreen from "../screens/StudentRegisterScreen";
import { useStudentAuth } from "../hooks/useStudentAuth";
import NewQuestionScreen from "../screens/NewQuestionScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const { student } = useStudentAuth();

  return (
    <Stack.Navigator>
      {student == null ? (
        <>
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="StudentLogin" component={StudentLoginScreen} />
          <Stack.Screen
            name="StudentRegister"
            component={StudentRegisterScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="NewQuestion" component={NewQuestionScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
