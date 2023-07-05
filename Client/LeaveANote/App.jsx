import 'react-native-gesture-handler';
import {I18nManager, LogBox} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';
import MainContextProvider from './context/ContextProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContextProvider from './context/ThemeContext';
I18nManager.allowRTL(false);
export default function App() {
  LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
  return (
    <MainContextProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <ThemeContextProvider>
            <Main />
          </ThemeContextProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </MainContextProvider>
  );
}
