/* eslint-disable prettier/prettier */
import React, { FC, useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';
import { Text as IText } from '../../utils/interfaces/interfaces';
interface DividerWithTextProps {
  title: string;
}

const DividerWithText: FC<DividerWithTextProps> = ({ title }) => {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
	
  return (
    <View style={styles.container}>
      <Divider style={styles.divider} />
      <Text style={styles.text}>{title}</Text>
      <Divider style={styles.divider} />
    </View>
  );
};

const createStyles = (primary:string,secondary:string,text:IText,background:string) =>  StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    backgroundColor:text.primary,
  },
  text: {
    marginHorizontal: 10,
    color:text.primary,
  },
});

export default DividerWithText;
