import { View, Text,StyleSheet} from 'react-native'
import React from 'react'

export default function EditPassword() {
  return (
    <View style={styles.container}>
      <Text>EditPassword</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor:'lightyellow',
    padding:20,
  }
});