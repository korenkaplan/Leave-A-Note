import { View, Text,StyleSheet} from 'react-native'
import React from 'react'

export default function EditInfo() {
  return (
    <View style={styles.container}>
      <Text>EditInfo</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor:'lightgray',
    padding:20,

  }
});