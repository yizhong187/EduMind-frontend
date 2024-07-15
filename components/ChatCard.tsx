import * as React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { Card, Text, Title } from "react-native-paper";

interface ChatCardProps {
  chatId: number;
  photoUrl?: string | null;
  title: string;
  latestMessage: string;
  navigation: any;
}

const ChatCard: React.FC<ChatCardProps> = ({
  chatId,
  photoUrl,
  title,
  latestMessage,
  navigation,
}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Chat", { chatId })}>
      <Card style={styles.card}>
        <View style={styles.container}>
          {photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.photo} />
          ) : (
            <View style={styles.placeholder} />
          )}
          <View style={styles.textContainer}>
            <Title style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {title}
            </Title>
            <Text style={styles.latestMessage} numberOfLines={2}>
              {latestMessage}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  latestMessage: {
    fontSize: 14,
    color: "gray",
  },
  placeholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
    backgroundColor: "lightgray",
  },
});

export default ChatCard;
