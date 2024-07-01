import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { ScreenProps } from "../navigation/types";
import * as ImagePicker from "expo-image-picker";
import {
  Button,
  TextInput,
  HelperText,
  Menu,
  Divider,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { uploadToCloudinary } from "../ cloudinaryConfig";
import { compressImage } from "../util/ImageProcessing";

type Props = ScreenProps<"NewQuestion">;

const NewQuestionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);
  const [topic, setTopic] = useState<string | undefined>(undefined);
  const [header, setHeader] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

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
  const topics = ["Chemistry", "Physics", "Math"];

  const [topicVisible, setTopicVisible] = useState(false);

  const openTopicMenu = () => setTopicVisible(true);

  const closeTopicMenu = () => setTopicVisible(false);

  const selectTopic = (selectedTopic: string) => {
    setTopic(selectedTopic);
    setTopicVisible(false);
  };

  const handleSubmit = async () => {
    let imageLink = "";

    console.log(image == null ? "no image" : "imageLink: " + image);

    // if an image is attached, then we call uploadToCloudinary function
    if (image != null) {
      try {
        const compressedImage = await compressImage(image);
        try {
          const response = await uploadToCloudinary(compressedImage, "default");
          console.log("Upload successful:", response);
        } catch (uploadError) {
          console.error("Upload failed:", uploadError);
        }
      } catch (error) {
        console.error("Image compression failed:", error);
      }
    }
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
          label="Topic"
          mode="outlined"
          visible={topicVisible}
          showDropDown={openTopicMenu}
          onDismiss={closeTopicMenu}
          value={topic ? topic : "Select Topic"}
          setValue={setTopic}
          list={topics.map((topicOption) => ({
            label: topicOption,
            value: topicOption,
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
