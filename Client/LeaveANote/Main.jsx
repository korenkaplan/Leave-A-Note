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
  const {
    authenticated,
    setAuthenticated,
    setCurrentUser,
    getUserById,
    setToken,
    updateDeviceToken,
  } = useContext(MainContext);
  const {setTheme, lightTheme, darkTheme, } =
    useContext(ThemeContext);
  // Use isLoading state to control the loading screen
  const [isLoading, setIsLoading] = useState(true);
  // Get the current device color scheme.
  const colorScheme = useColorScheme();
  // Set theme based on the device's color scheme.

  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(darkTheme);
    } else if (colorScheme === 'light') {
      setTheme(lightTheme);
    }
  }, [colorScheme]);
  
  // Fetch user data and manage authentication on app start.
  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem('connectedUser');
        if (token !== null) {
          const decoded = jwt_decode(token); // Decode JWT token to get user ID.
          setToken(token); // Store the token in the context.
          const currantUser = await getUserById(decoded.id, token); // Fetch the user's data using the decoded user ID and the token.

          if (currantUser != null) {
            setCurrentUser(currantUser); // Update current user in context.
            await updateDeviceToken(currantUser._id); // Update device token for push notifications.
            setAuthenticated(true); // Set the user as authenticated.
          }
        }
        setIsLoading(false); // Data fetching is complete, update isLoading.
      } catch (error) {
        // Handle any errors that occur during data fetching.
        console.error('Error fetching data:', error);

        // Set isLoading to false even in case of an error.
        setIsLoading(false);
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
