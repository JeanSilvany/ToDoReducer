import 'react-native-gesture-handler';

import { ThemeProvider } from 'styled-components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { StatusBar } from 'react-native';

import { Home } from './src/screens/Home';

import theme from './src/global/styles/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar />
        <Home />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
