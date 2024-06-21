import { TailwindProvider } from "tailwind-rn";
import utilities from "./tailwind.json";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation/StackNavigator";
import { setupAxiosInterceptors } from "./util/TokenHandling";
import { useEffect } from "react";
import { StudentAuthProvider } from "./hooks/useStudentAuth";
import { PaperProvider } from "react-native-paper";

const App = () => {
  useEffect(() => {
    // Call setupAxiosInterceptors when the application starts
    setupAxiosInterceptors();
  }, []);

  return (
    <PaperProvider>
      <StudentAuthProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </StudentAuthProvider>
    </PaperProvider>
  );
};

export default App;
