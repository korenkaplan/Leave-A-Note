import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from '../pages/Homepage';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import AccidentsHistory from '../pages/profilePages/AccidentsHistory';
const Drawer = createDrawerNavigator();
export default function AppStack() {
  return (
   <Drawer.Navigator>
    <Drawer.Screen name ='Home' component={Homepage}/>
    <Drawer.Screen name ='Inbox' component={Inbox}/>
    <Drawer.Screen name ='Profile' component={Profile}/>
    <Stack.Screen name="AccidentsHistory" component={AccidentsHistory} />
   </Drawer.Navigator>
  )
}