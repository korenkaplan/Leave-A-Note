import {View, Text,StyleSheet} from 'react-native';
import React from 'react';
import { Divider } from '@rneui/base';
export default function Inbox() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Inbox</Text>
      </View>
      <Divider color='black'/>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  header:{
    width: '100%',
    height: '10%',
    backgroundColor:'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText:{
    color:'white',
    fontSize:25,
  }
});
