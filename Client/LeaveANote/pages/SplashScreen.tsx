/* eslint-disable prettier/prettier */
import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import animationData from '../assets/lottie.Animation/safteycar.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainContext } from '../context/ContextProvider';
import { StackNavigationProp } from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
const {setAuthenticated,authenticated} = useContext(MainContext);


    useEffect(() => {
        // Perform any necessary initialization or background tasks here
        // Simulate a delay for the splash screen (e.g., 3 seconds)
        const splashTimeout = setTimeout(() => {
        // check if user is connected in async storage
        },3000);

        return () => {
          // Clean up any resources or timers if necessary
          clearTimeout(splashTimeout);
        };
      }, []);
  return (
    <View style={styles.container}>
           <LottieView
          source={animationData}
          autoPlay
          loop
        />
  </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

export default SplashScreen;
