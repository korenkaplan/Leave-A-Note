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
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Accidents History"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'timer-outline', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Edit information"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'person-outline', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Edit Password"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'lock-closed-outline', type: 'ionicon', color: 'white' }}
        />
      </Tab>
      <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
      >
        <TabView.Item  style={styles.tabItem}>
          <AccidentsHistory />
        </TabView.Item >
        <TabView.Item  style={styles.tabItem}>
          <EditInfo />
        </TabView.Item>
        <TabView.Item  style={styles.tabItem}>
          <EditPassword />
        </TabView.Item>
      </TabView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Set flex to 1 to fill the available space
    backgroundColor: 'darkorange',
  },
  tabItem:{
    flex: 1,
  }
});
