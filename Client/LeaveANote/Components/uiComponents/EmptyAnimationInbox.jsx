import { View, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import animationData from '../../assets/lottie.Animation/emptybox.json';
import { Text } from '@rneui/base';

export default function EmptyAnimationInbox() {
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10,
    alignItems: 'center',
    backgroundColor:'white'
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
    color: '#D68241',
  },
});
