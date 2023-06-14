import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Tab, TabView } from '@rneui/themed';
import AccidentsHistory from '../../pages/profilePages/AccidentsHistory';
import EditInfo from '../../pages/profilePages/EditInfo';
import EditPassword from '../../pages/profilePages/EditPassword';

export default function ProfileTabView() {
  const [index, setIndex] = useState(0);

  return (
    <View style={styles.container}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        style={styles.tabMenu}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 6,
        }}
        variant="primary"
      >
                 <Tab.Item
        style={styles.tabItem}
          title="Accidents History"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer-outline', type: 'ionicon', color: 'white' }}
        />
            <Tab.Item
        style={styles.tabItem}
          title="Edit information"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'person-outline', type: 'ionicon', color: 'white' }}
        />
         <Tab.Item
        style={styles.tabItem}
          title="Edit Password"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'lock-closed-outline', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe={true} 
          >
        <TabView.Item  style={styles.tabView}>
        <AccidentsHistory />
        </TabView.Item>
        <TabView.Item  style={styles.tabView}>
        <EditPassword />
        </TabView.Item>
        <TabView.Item     style={styles.tabView}
        >
        <EditInfo />
        </TabView.Item >
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Set flex to 1 to fill the available space
  },
  tabView:{
    flex: 1,

  },
  tabItem:{
    flex: 1,
    backgroundColor:'red'
  },
  tabMenu:{
   
  }
});
