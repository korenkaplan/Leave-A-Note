import React, { useContext, useEffect, useState } from 'react';
import { MainContext } from './context/ContextProvider';
import { useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import NotAuthenticatedStack from './navigatorAuth/NotAuthenticatedStack';
import BottomTabBar from './navigatorAuth/BottomTabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from 'react-native-svg';
import { ThemeContext } from './context/ThemeContext';
import SplashScreen from './pages/SplashScreen';
export default function Main() {
  const { authenticated, setAuthenticated } = useContext(MainContext);
  const {theme,setTheme,lightTheme,darkTheme} = useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const colorScheme = useColorScheme();
  useEffect(() => {
       if(colorScheme === 'dark')
       {

        setTheme(darkTheme)
       }
       else if (colorScheme === 'light')
       {
        setTheme(lightTheme)
       }
  }, [colorScheme])
  
  useEffect(() => {
    const getData = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('connectedUser');
        if (isLoggedIn !== null) {
          setAuthenticated(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
          setTimeout(() => {
          // check if user is connected in async storage
          setIsLoading(false); // Set isLoading to false when data retrieval is complete
          },3200);
      }
    };
  getData();
  }, []);

  if (isLoading) {
    // Render a loading indicator while data is being retrieved
    return <SplashScreen/>;
  }

  return (
    <NavigationContainer>
      {authenticated ? <BottomTabBar /> : <NotAuthenticatedStack />}
    </NavigationContainer>
  );
}
