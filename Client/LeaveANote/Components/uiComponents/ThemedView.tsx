import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const ThemedView = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useContext(ThemeContext);
    const {primary,secondary,text,background} = theme.colors;


const styles = StyleSheet.create({
  container: {
    flex:1,
   backgroundColor: background,
   color:text,
  },
});
return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {children}
    </View>
  );
};
export default ThemedView;
