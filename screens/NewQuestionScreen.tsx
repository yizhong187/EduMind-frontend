import { View, ScrollView, Image, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { ScreenProps } from "../navigation/types";
import * as ImagePicker from "expo-image-picker";
import { Button, TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { uploadToCloudinary } from "../ cloudinaryConfig";
import { compressImage } from "../util/ImageProcessing";
import axios from "axios";
import apiClient from "../util/apiClient";

type Props = ScreenProps<"NewQuestion">;

const NewQuestionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [header, setHeader] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const { width, height } = result.assets[0];
      const ratio = width / height;
      setAspectRatio(ratio);
    }
  };
  const subjects = ["Chemistry", "Physics", "Math"];

  const [subjectVisible, setSubjectVisible] = useState(false);

  const openSubjectMenu = () => setSubjectVisible(true);

  const closeSubjectMenu = () => setSubjectVisible(false);

  const selectSubject = (selectedSubject: string) => {
    setSubject(selectedSubject);
    setSubjectVisible(false);
  };

  const handleSubmit = async () => {
    let imageLink = "";
    let chatID = -1;

    // if an image is attached, then we call uploadToCloudinary function
    if (image != null) {
      try {
        const compressedImage = await compressImage(image);
        try {
          const response = await uploadToCloudinary(compressedImage, "default");
          console.log("Image Upload successful");
          imageLink = response.secure_url;
        } catch (uploadError) {
          console.error("Upload failed:", uploadError);
          Alert.alert("Image uploading failed");
          return;
        }
      } catch (error) {
        console.error("Image compression failed:", error);
        Alert.alert("Image compression failed");
        return;
      }
    }

    // Creating new chat
    try {
      const response = await apiClient.post("/chat/new", {
        subject: subject?.toLowerCase(),
        header,
        photo_url: imageLink,
      });
      if (response.status === 201) {
        console.log("New chat created successfully: ", response.data);
        chatID = response.data.chat_id;
      } else {
        console.error("Failed to create new chat");
        Alert.alert("Failed to create new chat");
        return;
      }
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          "Chat creation failed due to network error"
        : err.message || "An unexpected error occurred";
      console.error("Chat creation error:", err);
      return;
    }

    // Sending the first message
    try {
      const response = await apiClient.post(`/chat/${chatID}/new`, {
        content: message,
      });
      if (response.status === 201) {
        console.log("First message sent successfully: ", response.data);
        chatID = response.data.chat_id;
      } else {
        console.error("Failed to send the first message");
        Alert.alert("Failed to send the first message");
        return;
      }
    } catch (err: any) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message ||
          "Sending of first message failed due to network error"
        : err.message || "An unexpected error occurred";
      console.error("Message sending error:", err);
      return;
    }

    Alert.alert("Question submitted successfully!");
    setImage(null);
    setHeader("");
    setMessage("");
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.box}>
        <Button icon="camera" onPress={pickImage}>
          Upload a photo of your question!
        </Button>
        {image && aspectRatio && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={{
                aspectRatio: aspectRatio,
                width: "100%", // Ensure the image takes the full width available
              }}
            />
          </View>
        )}
      </View>
      <View style={styles.inputContainer}>
        <DropDown
          label="Subject"
          mode="outlined"
          visible={subjectVisible}
          showDropDown={openSubjectMenu}
          onDismiss={closeSubjectMenu}
          value={subject ? subject : "Select Subject"}
          setValue={setSubject}
          list={subjects.map((subjectOption) => ({
            label: subjectOption,
            value: subjectOption,
          }))}
        />

        <TextInput
          label="Header"
          value={header}
          onChangeText={setHeader}
          style={styles.textInput}
          multiline={true}
          numberOfLines={1}
          maxLength={100}
        />
        <TextInput
          label="Message"
          value={message}
          onChangeText={setMessage}
          style={[styles.textInput, styles.messageInput]}
          multiline={true}
          numberOfLines={6}
          textAlignVertical={"top"}
        />
      </View>
      <Button
        icon="upload"
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        labelStyle={styles.buttonText}
      >
        Submit Question
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 10,
    flexGrow: 1,
    alignItems: "center",
  },
  box: {
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    margin: 2,
  },
  inputContainer: {
    width: "100%",
    margin: 20,
  },
  textInput: {
    marginTop: 15,
    marginBottom: 10,
  },
  messageInput: {
    height: 150,
  },
  submitButton: {
    borderRadius: 24,
    height: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
  },
});

export default NewQuestionScreen;
