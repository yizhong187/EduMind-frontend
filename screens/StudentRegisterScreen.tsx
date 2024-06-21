import { View, Text, Button, TextInput, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenProps } from "../navigation/types";
import { useStudentAuth } from "../hooks/useStudentAuth";
import { Card } from "react-native-paper";
import SmallTextInput from "../components/SmallTextInput";

type Props = ScreenProps<"StudentRegister">;

const StudentRegisterScreen: React.FC<Props> = ({ route, navigation }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const { register } = useStudentAuth();

  const handleRegister = async () => {
    try {
      const [status, message] = await register(username, password, name, email); // Using the register function from useAuth
      Alert.alert(message);
      if (status) {
        navigation.navigate("StudentLogin"); // Navigate to home page if successful
      }
    } catch (err: any) {
      console.error("Registration error:", err); // Handle register error
    }
  };

  return (
    <View>
      <Card>
        <Text>You are not logged in! Register to see this page.</Text>
        <SmallTextInput
          autoCapitalize="none"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <SmallTextInput
          autoCapitalize="none"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <SmallTextInput
          autoCapitalize="none"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <SmallTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View>
          <View>
            <Button title="Register" onPress={handleRegister} />
          </View>
        </View>
      </Card>
    </View>
  );
};

export default StudentRegisterScreen;
