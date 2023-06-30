import { View, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { Tab, TabView } from '@rneui/themed';
import AccidentsHistory from '../../pages/profilePages/AccidentsHistory';
import EditInfo from '../../pages/profilePages/EditInfo';
import EditPassword from '../../pages/profilePages/EditPassword';
import { ThemeContext } from '../../context/ThemeContext';

export default function ProfileTabView() {
  const [index, setIndex] = useState(0);
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary,secondary,text,background, buttonMain, buttonAlt)


  return (
    <View style={styles.container}>
            <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe={true}
      >
        <TabView.Item style={styles.tabView}>
          <AccidentsHistory />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <EditInfo />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <EditPassword />
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        style={styles.tabMenu}
        initialValue={1}
        indicatorStyle={{
          backgroundColor: buttonMain.text,
          height: 4,
          borderRadius:50,
          width:'10%',
          marginLeft:'8%',
          marginBottom: 5,
          elevation:10
        }}
      >
        <Tab.Item
          style={styles.tabItem}
          // titleStyle={styles.tabLabel}
          // activeTitleStyle={styles.activeTabLabel} // Apply activeTabLabel style when the tab is active
          icon={{
            name: 'timer-outline',
            type: 'ionicon',
            color: buttonMain.text,
            style: [styles.tabIcon, index === 0 && styles.activeTabIcon], // Apply activeTabIcon style when the tab is active
          }}
        />
        <Tab.Item
          style={styles.tabItem}
          // title="Edit information"
          // titleStyle={styles.tabLabel}
          activeTitleStyle={styles.activeTabLabel} // Apply activeTabLabel style when the tab is active
          icon={{
            name: 'person-outline',
            type: 'ionicon',
            color: buttonMain.text,
            style: [styles.tabIcon, index === 1 && styles.activeTabIcon], // Apply activeTabIcon style when the tab is active
          }}
        />
        <Tab.Item
          style={styles.tabItem}
          // title="Edit Password"
          // titleStyle={styles.tabLabel}
          activeTitleStyle={styles.activeTabLabel} // Apply activeTabLabel style when the tab is active
          icon={{
            name: 'lock-closed-outline',
            type: 'ionicon',
            color: buttonMain.text,
            style: [styles.tabIcon, index === 2 && styles.activeTabIcon], // Apply activeTabIcon style when the tab is active
          }}
        />
      </Tab>
    </View>
  );
}


const createStyles = (primary, secondary, text, background, buttonMain, buttonAlt) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    tabView: {
      flex: 1,
    },
    tabItem: {
      flex: 1,
      backgroundColor: primary,
    },
    tabMenu: {
      backgroundColor: primary,
      borderRadius: 50, // Apply border radius to create a pill shape
      borderColor:text.primary,
      borderWidth:1.5,
      margin:5,
      elevation:10,
      height:52,
      marginBottom:15,
      width:'60%',
      alignSelf: 'center',
    },
    tabLabel: {
      color: buttonMain.text,
      fontSize: 12,
    },
    tabIcon: {
      color: buttonMain.text,
    },
    activeTabIcon: {
      color: secondary, // Set the color of the active tab icon to secondary
    },
    
  });


