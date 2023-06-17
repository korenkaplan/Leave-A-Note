import { View, StyleSheet } from 'react-native';
import React,{useContext} from 'react';
import LottieView from 'lottie-react-native';
import animationData from '../../assets/lottie.Animation/emptybox.json';
import { Text } from '@rneui/base';
import ThemedView from './ThemedView';
import { ThemeContext } from '../../context/ThemeContext';
import { Text as IText } from '../../utils/interfaces/interfaces';
export default function EmptyAnimationInbox() {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <LottieView
          source={animationData}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <Text style={styles.header} h3={true}>
        No Messages
      </Text>
    </View>
  );
}
const createStyles = (primary,secondary,text,background) =>  StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor:background,
  },
  animationContainer: {
    height: '70%',
    justifyContent:'flex-start',
    alignItems: 'center',

  },
  animation: {
    height:'100%',

  },
  header: {
    position: 'absolute',
    bottom: '20%',
    color: text.primary,
  },
});
