import { View, Text,StyleSheet} from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';
import ProfileTopView from '../Components/profile/ProfileTopView'
export default function Profile({ navigation }) {
  return (
    <View style ={styles.container}>
      <ProfileTopView/>
      <View style={{flex: 4, backgroundColor: 'darkorange'}} />
    </View>
  )
}     
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection:'column',
  },

});