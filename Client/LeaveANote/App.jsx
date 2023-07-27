import 'react-native-gesture-handler';
import {I18nManager, LogBox} from 'react-native';
import React, { useEffect, useState } from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';
import MainContextProvider from './context/ContextProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContextProvider from './context/ThemeContext';
import { ModalPortal } from 'react-native-modals';
import { requestUserPermission } from './utils/notification/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@rneui/base';
I18nManager.allowRTL(false);
export default function App() {
  const [token, setToken] = useState('')
  LogBox.ignoreLogs(['Require cycle: node_modules/victory']);

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, [])
  
  const getFcmToken = async () =>{
    const token = await AsyncStorage.getItem('fcmToken')
    if(token)
    {
      setToken(token)
    }
  }
  return (
    <MainContextProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <ThemeContextProvider>
            <Main />
           <ModalPortal />
          </ThemeContextProvider>
        </SafeAreaProvider>
      </NativeBaseProvider>
    </MainContextProvider>
  );
}
