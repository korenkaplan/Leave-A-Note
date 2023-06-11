import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon,Divider  } from '@rneui/themed';
import ProfileLogoTop from './ProfileLogoTop'
export default function ProfileTopView() {
  return (
    <View  style={styles.topView} >
    <ProfileLogoTop />

   </View>
  )
}
const styles =  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      flexDirection:'column',
    },
    topView:{
      flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       padding:10,
    },
    topInfo:{
      flex: 1,
       justifyContent: 'space-around',
       alignItems: 'center',
      flexDirection:'row',
      width: '100%',
    },
  });