import * as React from "react";
import {
  Button,
  Card,
  Text,
  TextInput,
  TextInputProps,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";
import { white } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

interface AskNowProps {
  navigation: any;
}

const AskNow: React.FC<AskNowProps> = ({ navigation }) => {
  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("NewQuestion")}
          style={styles.askNowButton}
          labelStyle={styles.buttonText}
        >
          Ask Now
        </Button>
        <Text style={styles.answerText}>Get an answer right away!</Text>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 16,
  },
  cardContent: {
    alignItems: "center",
  },
  askNowButton: {
    marginVertical: 16,
    borderRadius: 24,
    width: 150,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
  answerText: {
    marginTop: 4,
    fontSize: 16,
  },
});

export default AskNow;
