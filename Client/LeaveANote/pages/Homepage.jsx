import { View, Text } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Logo from "../assets/note-taking.svg";
export default function Homepage({ navigation }) {
  return (
    <View>
      <Text>Homepage</Text>
      <Logo width={120} height={40} />
    </View>
  )
}