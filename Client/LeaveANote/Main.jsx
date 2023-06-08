import React, { useContext,useEffect} from 'react'
import {MainContext} from './context/ContextProvider'
import { NavigationContainer } from "@react-navigation/native";
import NotAuthenticatedStack from './navigatorAuth/NotAuthenticatedStack';
import Login from './pages/Login'
import BottomTabBar from './navigatorAuth/BottomTabs'
import { Camera } from 'react-native-vision-camera';
export default function Main() {
  const {authenticated} = useContext(MainContext);
useEffect(() => {
  checkPermission();


}, [])
const checkPermission = async () => {
  const cameraPermission = await Camera.getCameraPermissionStatus()
const microphonePermission = await Camera.getMicrophonePermissionStatus()
}

  return (
    <NavigationContainer>
    {authenticated?<BottomTabBar />:<NotAuthenticatedStack/>}
    </NavigationContainer>
  );
}