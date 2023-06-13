import {StyleSheet, View} from 'react-native';
import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from '../pages/Homepage';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoteView from '../pages/NotesAndReports/NoteView';
import ReportView from '../pages/NotesAndReports/ReportView';
import CreateReport from '../pages/NotesAndReports/CreateReport';
import CreateNote from '../pages/NotesAndReports/CreateNote';
import CameraComp from '../Components/CameraComp';
import {Badge} from '@rneui/base';
import {MainContext} from '../context/ContextProvider';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function BottomTabs() {
  const {currentUser} = useContext(MainContext);
  function TabNavigator() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Homepage}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
            // ,headerLeft:()=><Ionicons name="exit" color={color} size={size}/>
          }}
        />
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={({color, size}) => {
            const unreadMessagesCount = currentUser.unreadMessages.length;
            return {
              tabBarIcon: ({color, size}) => (
                <View style={{position: 'relative'}}>
                  <Ionicons name="mail-outline" color={color} size={size} />
                  {unreadMessagesCount > 0 && (
                    <Badge
                      value={unreadMessagesCount.toString()}
                      status="error"
                      containerStyle={{
                        position: 'absolute',
                        top: -4,
                        right: -11,
                      }}
                    />
                  )}
                </View>
              ),
              title: 'Inbox',
              headerShown: true,
              headerStyle: styles.header,
              headerTitleStyle: styles.title,
              headerTintColor: 'white',
            };
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={TabNavigator} />

      <Stack.Screen
        name="NoteView"
        component={NoteView}
        options={{
          title: 'Note',
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ReportView"
        component={ReportView}
        options={{
          title: 'Report',
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="CreateReport"
        component={CreateReport}
        options={{
          title: 'New Report',
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="CreateNote"
        component={CreateNote}
        options={{
          title: 'New Note',
          headerShown: true,
          headerStyle: styles.header,
          headerTitleStyle: styles.title,
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen name="CameraComp" component={CameraComp} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3b5998',
  },
  title: {
    color: 'white',
  },
  backIcon: {
    headerTintColor: 'white',
  },
});
