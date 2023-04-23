import "react-native-gesture-handler";
import "react-native-reanimated";

import { useEffect, useState } from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar, Appearance } from "react-native";

import { ThemeProvider } from "styled-components";

import { Home } from "./src/screens/Home";

import light from "./src/global/styles/light";
import dark from "./src/global/styles/dark";

export default function App() {
  const [scheme, setScheme] = useState();

  const getTheme = () => {
    if (Appearance.getColorScheme() === "light") {
      return light;
    }
    return dark;
  };

  useEffect(() => {
    const subscription = Appearance.addChangeListener((preferences) => {
      const { colorScheme: scheme } = preferences;

      if (scheme === "light") return setScheme(light);
      return setScheme(dark);
    });

    return () => subscription?.remove();
  }, [setScheme]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={scheme || getTheme()}>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <Home />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
