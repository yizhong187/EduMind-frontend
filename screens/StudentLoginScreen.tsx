import { View, Text, Button, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenProps } from "../navigation/types";
import { useStudentAuth } from "../hooks/useStudentAuth";
import { Card } from "react-native-paper";
import SmallTextInput from "../components/SmallTextInput";

type Props = ScreenProps<"StudentLogin">;

const StudentLoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login } = useStudentAuth();

  const handleLogin = async () => {
    try {
      const [status, message] = await login(username, password); // Using the login function from useAuth
      Alert.alert(message);
      if (status) {
        navigation.navigate("Home"); // Navigate to home page if successful
      }
    } catch (err: any) {
      console.error("Login error:", err); // Handle login error
    }
  };

  return (
    <View>
      <Card>
        <Text>You are not logged in! Login to see this page.</Text>
        <SmallTextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <SmallTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View>
          <View>
            <Button title="Login" onPress={handleLogin} />
          </View>
          <View>
            {/* <Button
              title="Signup"
              onPress={() => navigation.navigate("Signup")}
            /> */}
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StudentLoginScreen;
