import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Divider} from '@rneui/base';
export default function Header(props) {
const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: props.backgroundColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 30,
  },
})
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>{props.text}</Text>
      </View>
      <Divider color={props.dividerColor} />
    </View>
  );
}

