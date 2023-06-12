import React, { useContext,useEffect} from 'react'
import {MainContext} from './context/ContextProvider'
import { NavigationContainer } from "@react-navigation/native";
import NotAuthenticatedStack from './navigatorAuth/NotAuthenticatedStack';
import BottomTabBar from './navigatorAuth/BottomTabs'
export default function Main() {
  const {authenticated} = useContext(MainContext);


  return (
    <NavigationContainer>
    {authenticated?<BottomTabBar />:<NotAuthenticatedStack/>}
    </NavigationContainer>
  );
}