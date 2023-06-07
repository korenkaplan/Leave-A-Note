import { View,StyleSheet} from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native'
import animationData from '../../assets/lottie.Animation/redcar.json';
import { Text } from '@rneui/base';
export default function EmptyListAnimation() {
  return (
    <View style={styles.container}>
      <Text h3={true}>No Accidents Stay Safe</Text>
      <Lottie source={animationData} autoPlay/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      width: '100%',
      height: '100%',
      padding:10,
      backgroundColor:'white',
      alignItems: 'center',
    },
    animation:{
      width:200,
      height:200,
    }
  });