import { View,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import ProfileTopView from '../Components/profile/ProfileTopView'
import ProfileTabView from '../Components/profile/ProfileTabView';
export default function Profile({ navigation }) {

  return (
    <View style ={styles.container}>
      {/* <ProfileTopView/> */}
      <View style={{flex: 9, }}>
     <ProfileTabView />
      </View>
    </View>
  )
}     
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
});


    