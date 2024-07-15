import { View, Button, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenProps } from "../navigation/types";
import { useStudentAuth } from "../hooks/useStudentAuth";
import { customText } from "react-native-paper";
import AskNow from "../components/AskNow";
import ChatCard from "../components/ChatCard";
import { Chat, parseChat } from "../models/ChatModel";
import apiClient from "../util/apiClient";
import axios from "axios";

const Text = customText<"customVariant">();

type Props = ScreenProps<"Home">;

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { student, loading } = useStudentAuth();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (!loading && !student) {
      navigation.navigate("StudentLogin");
    }
  }, [loading, student]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await apiClient.get("/chat", {});
        if (response.status === 200) {
          console.log("Chats fetched successfully:", response.data);
          const parsedChats = response.data.map(parseChat);
          setChats(parsedChats);
        } else {
          console.error("Failed to fetch chat");
          Alert.alert("Failed to fetprasedch chat");
        }
      } catch (err: any) {
        const errorMessage = axios.isAxiosError(err)
          ? err.response?.data?.message ||
            "Failed to fetch chat due to network error"
          : err.message || "An unexpected error occurred";

        console.error("Error fetching chat:", errorMessage);
        Alert.alert("Error", errorMessage);
      }
    };

    fetchChats();
  }, []);

  if (loading) {
    return <Text variant="bodyLarge">Loading...</Text>;
  }

  return (
    <ScrollView>
      <Text variant="headlineLarge">This will be the HomeScreen</Text>
      <Text variant="bodyLarge">{student?.username} is logged in.</Text>
      <AskNow navigation={navigation} />
      {chats.map((chat) => (
        <ChatCard
          chatId={chat.chat_id}
          key={chat.chat_id}
          photoUrl={chat.photo_url || ""}
          title={chat.header}
          latestMessage={chat.subject}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;
