import { View,StyleSheet} from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native'
import animationData from '../../assets/lottie.Animation/emptybox.json';
import { Text } from '@rneui/base';
export default function EmptyAnimationInbox() {
  return (
    <View style={styles.container}>
    <Lottie source={animationData} autoPlay/>
    <Text style={styles.header} h3={true}>No Messages</Text>

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
    },
    header:{
      position: 'absolute',
      bottom:50,
      color:'#D68241'

    }
  });