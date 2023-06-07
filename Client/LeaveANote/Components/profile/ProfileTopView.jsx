import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon,Divider  } from '@rneui/themed';
import ProfileLogoTop from './ProfileLogoTop'
export default function ProfileTopView() {
  return (
    <View  style={styles.topView} >
    <ProfileLogoTop />
    <View style={styles.topInfo}>
      <View>
      <Icon
    name='person' />
      <Text>Koren Kaplan</Text>
      </View>
      <View>
      <Icon
  name='car'
  type='ionicon' />
      <Text>8333368</Text>
      </View>
    </View>
    <Divider width={5} />
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
       backgroundColor: 'red',
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