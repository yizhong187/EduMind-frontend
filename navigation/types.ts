import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Defines the parameters that are passed into the screens
export type RootStackParamList = {
  Home: undefined;
  Chat: undefined;
  Start: undefined;
  StudentLogin: undefined;
  StudentRegister: undefined;
  NewQuestion: undefined;
};

export type ScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, Screen>;

