import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../pages/Homepage';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NoteView from '../pages/NotesAndReports/NoteView';
import ReportView from '../pages/NotesAndReports/ReportView';
import CreateReport from '../pages/NotesAndReports/CreateReport';
import CreateNote from '../pages/NotesAndReports/CreateNote';
import CameraComp from '../Components/CameraComp';
import { Badge } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import KpiStats from '../Components/kpi/KpiStats';
import Main from '../Main'
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const { currentUser } = useContext(MainContext);
  const { theme, buttonTheme } = useContext(ThemeContext);
  const {buttonMain, buttonAlt} = buttonTheme
  const { primary, secondary, text, background} = theme.colors;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);

  function TabNavigator() {
    const getTabBarIcon = (routeName, focused, color, size) => {
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
      }
      else if (routeName === 'Profile') {
        iconName = 'person';
      }
      else if (routeName === 'Inbox') {
        iconName = 'mail';
      } 
      else if (routeName === 'Stats') {
        iconName = 'stats-chart';
      }

      return (
        <View style={[styles.tabIconWrapper, focused && styles.activeTabIcon]}>
          <Ionicons name={iconName} color={color} size={size} />
        </View>
      );
    };
    return (
      <Tab.Navigator
        initialRouteName="Stats"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: primary,
            height:60,
            borderTopWidth:2,
            borderTopLeftRadius:5,
            borderTopRightRadius:5,
            
          },
          tabBarActiveTintColor: buttonMain.background,
          tabBarInactiveTintColor: buttonMain.text,
          tabBarIcon: ({ color, size, focused }) =>
            getTabBarIcon(route.name, focused, color, size),
        })}
      >
        <Tab.Screen name="Home" component={Homepage} />
        <Tab.Screen
          name="Inbox"
          component={Inbox}
          options={() => {
            const unreadMessagesCount = currentUser.unreadMessages.length;
            return {
              tabBarIcon: ({ color, size, focused }) => (
                <View style={[styles.tabIconWrapper, focused && styles.activeTabIcon]}>
                 <Ionicons name="mail" color={color} size={size} />
                  {unreadMessagesCount > 0 && (
                    <Badge
                    value={unreadMessagesCount.toString()}
                    containerStyle={styles.badgeContainer}
                    badgeStyle={styles.badge} // Add this line to apply custom styles to the badge
                  />
                  
                  )}
                </View>
              ),
            };
          }}
        />
        <Tab.Screen name="Profile" component={Profile} />
        {currentUser.role === 'admin' && (
        <Tab.Screen name="Stats" component={KpiStats} />
      )}

      </Tab.Navigator>
    );
  }

  return (
    <Stack.Navigator initialRouteName="Tabs" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="ReportView" component={ReportView} />
      <Stack.Screen name="NoteView" component={NoteView} />
      <Stack.Screen name="CreateReport" component={CreateReport} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
      <Stack.Screen name="CameraComp" component={CameraComp} />
    </Stack.Navigator>
  );
}

const createStyles = (primary, secondary, text, background,buttonMain, buttonAlt) =>
  StyleSheet.create({
    iconContainer: {
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      padding: 4,
    },
    header: {
      backgroundColor: primary,
    },
    title: {
      color: buttonMain.text,
    },
    tabIconWrapper: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 5,
      margin: 12,
      
    },
    activeTabIcon: {
      backgroundColor: buttonMain.text,
      elevation: 20,
      margin: 12,
      borderRadius: 20,
      shadowColor: '#FFFFFF', // White shadow color
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 1,
      shadowRadius: 10,
      color: buttonMain.text,
    },
    
    badgeContainer: {
      position: 'absolute',
      top: -4,
      right: -11,
      borderWidth:1.5,
      borderRadius: 20,
      borderColor:buttonMain.text
    },
    badge: {
      backgroundColor: buttonAlt.background, // Change the background color of the badge
    },
  });

