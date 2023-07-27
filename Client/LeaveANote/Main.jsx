import React, {useContext, useEffect, useRef, useState} from 'react';
import {MainContext} from './context/ContextProvider';
import {useColorScheme, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NotAuthenticatedStack from './navigatorAuth/NotAuthenticatedStack';
import BottomTabBar from './navigatorAuth/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from './context/ThemeContext';
import SplashScreen from './pages/SplashScreen';
import jwt_decode from 'jwt-decode';
export default function Main() {
  let dropDownAlertRef = useRef();

  const {
    authenticated,
    setAuthenticated,
    setCurrentUser,
    getUserById,
    setToken,
    updatedDeviceToken
  } = useContext(MainContext);
  const { setTheme, lightTheme, darkTheme, buttonTheme} =
    useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const colorScheme = useColorScheme();
  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(darkTheme);
    } else if (colorScheme === 'light') {
      setTheme(lightTheme);
    }
  }, [colorScheme]);

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('connectedUser');
        if (token !== null) {
          const decoded = jwt_decode(token);
          setToken(token);
          const currantUser = await getUserById(decoded.id, token);

          if (currantUser != null) {
            setCurrentUser(currantUser);
            await updatedDeviceToken(currantUser._id);
            setAuthenticated(true);
          }
        }
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
  
    getData();
  }, []);
  if (isLoading) {
    // Render a loading indicator while data is being retrieved
    return <SplashScreen />;
  }



  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={
          colorScheme !== 'dark'
            ? darkTheme.colors.primary
            : lightTheme.colors.primary
        }
      />
      <View style={{borderBottomColor: 'white', borderBottomWidth: 1}} />
      {authenticated ? <BottomTabBar /> : <NotAuthenticatedStack />}
    </NavigationContainer>
  );
}
