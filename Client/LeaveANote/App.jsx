import 'react-native-gesture-handler';
import {I18nManager, LogBox} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';
import MainContextProvider from './context/ContextProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContextProvider from './context/ThemeContext';
import { ModalPortal } from 'react-native-modals';
import { requestUserPermission } from './utils/notification/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import DropdownAlert from 'react-native-dropdownalert';

import { Text } from '@rneui/base';
I18nManager.allowRTL(false);
export default function App() {
  const [token, setToken] = useState('')
  LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
  let dropDownAlertRef = useRef();
  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    listenToForegroundNotifications()
  }, [])
  
  const getFcmToken = async () =>{
    const token = await AsyncStorage.getItem('fcmToken')
    if(token)
    {
      setToken(token)
    }
  }

  //foreground notification listener: will alert on new messages 
  const listenToForegroundNotifications = async () =>{
// onMessage event handler for foreground notifications
messaging().onMessage(async remoteMessage => {
  const {title, body} = remoteMessage.notification;
  // Show an alert to the user when a new foreground message is received
  console.log('here');
  dropDownAlertRef.alertWithType('info', title, body);
});
  };
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
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </MainContextProvider>
  );
}
