/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/base';

interface DividerWithTextProps {
  text: string;
}

const DividerWithText: FC<DividerWithTextProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.text}>{text}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
  },
  text: {
    marginHorizontal: 10,
  },
});

export default DividerWithText;
