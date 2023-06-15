import 'react-native-gesture-handler';
import {I18nManager} from 'react-native';
import React, {useContext, useState,useEffect} from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';
import MainContextProvider from './context/ContextProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContextProvider from './context/ThemeContext';
export default function App() {


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
