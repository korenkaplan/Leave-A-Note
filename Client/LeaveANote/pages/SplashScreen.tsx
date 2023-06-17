import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState,useContext } from 'react';
import { View,  StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import animationData from '../assets/lottie.Animation/loadingb.json';
import { Text } from '@rneui/base';
import { ThemeContext } from '../context/ThemeContext';
import { Text as IText } from '../utils/interfaces/interfaces';
interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const [fadeAnimation] = useState(new Animated.Value(0));
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration:2000,
        useNativeDriver: true,
      }).start();
    }, 2000);

    return () => {
      clearTimeout(splashTimeout);
    };
  }, [fadeAnimation]);

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.textContainer, { opacity: fadeAnimation }]}>
        <Text h1 style={styles.text}>Leave a Note</Text>
      </Animated.View>
      <View style={styles.animationContainer}>
       <LottieView source={animationData} autoPlay loop style={styles.animation} />

      </View>
    </View>
  );
};
const createStyles = (primary:string,secondary:string,text:IText,background:string) => 
StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:background,
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '80%',
  },
  textContainer: {
    marginTop: 200,
    position: 'relative',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color:text.primary
  },
});



export default SplashScreen;
