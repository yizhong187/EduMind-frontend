import * as React from "react";
import { TextInput, TextInputProps } from "react-native-paper";
import { StyleSheet } from "react-native";

interface SmallTextInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SmallTextInput: React.FC<SmallTextInputProps> = ({ style, ...rest }) => {
  return <TextInput style={[styles.input, style]} {...rest} />;
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    height: 40,
    paddingHorizontal: 10,
  },
});

export default SmallTextInput;
