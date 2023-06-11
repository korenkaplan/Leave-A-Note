import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../pages/Homepage';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AccidentsHistory from '../pages/profilePages/AccidentsHistory';
import NoteView from '../pages/NotesAndReports/NoteView';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function BottomTabs() {

 function TabNavigator () {
  return(
    <Tab.Navigator initialRouteName='Inbox'
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: true,
    }}
     >
      <Tab.Screen  name ='Home' component={Homepage}
      options={{
        tabBarIcon:({color, size}) =>(
          <Ionicons name="home-outline" color ={color} size={size}/>
        )
      }}
      />
      <Tab.Screen name ='Inbox' component={Inbox}
        options={{
          tabBarIcon:({color, size}) =>(
            <Ionicons name="mail-outline" color ={color} size={size}/>
          )
        }}
      />
      <Tab.Screen name ='Profile' component={Profile}
        options={{
          tabBarIcon:({color, size}) =>(
            <Ionicons name="person-outline" color ={color} size={size}/>
          )
        }}
      />
     </Tab.Navigator>
  )
 }
  return (
 <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
  <Stack.Screen name='Tabs' component={TabNavigator}/>
  <Stack.Screen name="NoteView" component={NoteView} />
 </Stack.Navigator>
  )
}