import 'react-native-gesture-handler';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar, Appearance } from 'react-native';

import { ThemeProvider } from 'styled-components';

import { Home } from './src/screens/Home';

import light from './src/global/styles/light';
import dark from './src/global/styles/dark';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const getTheme = () => {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === 'dark') return dark;
    return light;
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={getTheme()}>
        <SafeAreaProvider>
          <StatusBar />
          <Home />
        </SafeAreaProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
