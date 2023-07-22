import { View,StyleSheet  } from 'react-native'
import React from 'react'
import ProfileTabView from '../Components/profile/ProfileTabView';
import ThemedView from '../Components/uiComponents/ThemedView';

export default function Profile({ navigation }) {
  return (
    <ThemedView style ={styles.container}>
      <View style={{flex: 9, }}>
     <ProfileTabView />
      </View>
    </ThemedView>
  )
}     
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
  },
});


    