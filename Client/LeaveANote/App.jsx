import 'react-native-gesture-handler';
import {I18nManager } from 'react-native'
import React, { useContext, useState } from 'react'
import { NativeBaseProvider } from 'native-base'
import Main from './Main'
import MainContextProvider from './context/ContextProvider'
export default function App() {

  return (
    <MainContextProvider>
    <NativeBaseProvider>
      <Main/>
    </NativeBaseProvider>
    </MainContextProvider>

 
  )
}
