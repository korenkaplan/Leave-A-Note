import { View, Text,StyleSheet} from 'react-native'
import React from 'react'

export default function AccidentsHistory() {
  return (
    <View style={styles.container}>
      <Text>AccidentsHistory</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor:'lightblue',
    padding:20,

  }
});