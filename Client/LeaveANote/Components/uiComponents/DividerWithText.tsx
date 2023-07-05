/* eslint-disable prettier/prettier */
import React, { FC, useContext} from 'react';
import { View, StyleSheet,useColorScheme } from 'react-native';
import { Divider, Text } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';
import { IText } from '../../utils/interfaces/interfaces';
import {startCase} from 'lodash';
interface DividerWithTextProps {
  title: string;
  fontColor?:string;
  height?:number;
  fontSize?:number;
  weight?: 'bold' | 'normal';
}

const DividerWithText: FC<DividerWithTextProps> = ({ title,fontColor,height,fontSize,weight}) => {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Divider style={[styles.divider,{backgroundColor:fontColor,width:height}]} />
      <Text style={[styles.text,{color: fontColor? fontColor: colorScheme == 'dark'? text.primary : primary, fontSize,fontWeight:weight}]}>{startCase(title)}</Text>
      <Divider  style={[styles.divider,{backgroundColor: fontColor,width:height,}]} />
    </View>
  );
};

const createStyles = (primary:string,secondary:string,text:IText,background:string,) =>  StyleSheet.create({
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
