import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import {MainContext} from './context/ContextProvider'

export default function Main() {
  const {test, setTest} = useContext(MainContext);
  return (
    <View>
      <Text>{test}</Text>
    </View>
  )
}