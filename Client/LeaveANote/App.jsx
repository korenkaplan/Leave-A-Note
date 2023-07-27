import 'react-native-gesture-handler';
import {I18nManager, LogBox} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import {NativeBaseProvider} from 'native-base';
import Main from './Main';
import MainContextProvider from './context/ContextProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ThemeContextProvider from './context/ThemeContext';
import { ModalPortal } from 'react-native-modals';
import { requestUserPermission, sendNotification } from './utils/notification/notificationHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging'
import DropdownAlert from 'react-native-dropdownalert';
import { Text } from '@rneui/base';
import { Button } from '@rneui/themed';
I18nManager.allowRTL(false);
export default function App() {
  LogBox.ignoreLogs(['Require cycle: node_modules/victory']);
  let dropDownAlertRef = useRef();
  useEffect(() => {
    requestUserPermission();
    listenToForegroundNotifications()
  }, [])
  //foreground notification listener: will alert on new messages 
  const listenToForegroundNotifications = async () =>{
// onMessage event handler for foreground notifications
messaging().onMessage(async remoteMessage => {
  // Show an alert to the user when a new foreground message is received
  const {title, body} = remoteMessage.notification
  dropDownAlertRef.alertWithType('info', title, body);

});

  };

  const handlePress = () => {
    sendNotification('title123','body123','eVuAVLwzRIGxlYxBc1Npn7:APA91bFR2P8TWN8SNtWT-TfD7G_WYI2LQ9ThcMj3U36KZV2_8bhayuQ1tUNMSmMuQfmnZqEJrKRB3is23nJQRDcRIO1b_qcHP4SCLOom2_HBWajsFIXdmz1Y7tlAyXElSLum6XJcShQZ')
  }
  return (
    <MainContextProvider>
      <NativeBaseProvider>
        <SafeAreaProvider>
          <ThemeContextProvider>
            <Main />
            <Button onPress={handlePress} title={'send notification'}/>
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
