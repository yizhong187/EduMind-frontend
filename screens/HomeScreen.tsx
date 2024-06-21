import { View, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ScreenProps } from "../navigation/types";
import { useStudentAuth } from "../hooks/useStudentAuth";
import { customText } from "react-native-paper";
import AskNow from "../components/AskNow";
import ChatCard from "../components/ChatCard";

const Text = customText<"customVariant">();

type Props = ScreenProps<"Home">;

const HomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { student, loading } = useStudentAuth();
  useEffect(() => {
    if (!loading && !student) {
      // Redirect logic here, for example, navigate to a login screen
      navigation.navigate("StudentLogin");
    }
  }, [loading, student]);

  if (loading) {
    return <Text variant="bodyLarge">Loading...</Text>;
  }

  return (
    <ScrollView>
      <Text variant="headlineLarge">This will be the HomeScreen</Text>
      <Text variant="bodyLarge">{student?.username} is logged in.</Text>
      <AskNow navigation={navigation} />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
      <ChatCard
        photoUrl={
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmedium.com%2F%40allrounddiksha%2Fwhat-is-react-native-1d564da4a3bd&psig=AOvVaw2duOUqnu13cR4z1DPgNrYo&ust=1718852819536000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMi-te_X5oYDFQAAAAAdAAAAABAE"
        }
        title={"What is React Native?"}
        latestMessage={
          "React Native is a framework for building native apps using React."
        }
        navigation={navigation}
      />
    </ScrollView>
  );
};

export default HomeScreen;
