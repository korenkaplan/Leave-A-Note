import { View,StyleSheet} from 'react-native'
import React,{useContext} from 'react'
import Lottie from 'lottie-react-native'
import animationData from '../../assets/lottie.Animation/redcar.json';
import { Text } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';

export default function EmptyListAnimation() {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  return (
    <View style={styles.container}>
      <Text style={styles.text} h3={true}>No Accidents Stay Safe</Text>
      <Lottie source={animationData} autoPlay/>
    </View>
  )
}
const createStyles = (primary,secondary,text,background) => StyleSheet.create({
    container:{
      flex:1,
      width: '100%',
      height: '100%',
      padding:10,
      backgroundColor:background,
      alignItems: 'center',
    },
    animation:{
      width:200,
      height:200,
    },
    text:{
      color:text.primary,
    },
  });