import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const ThemedView = ({ children, style }: { children: React.ReactNode, style?: any }) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: background,
      color: text,
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }, style]}>
      {children}
    </View>
  );
};

export default ThemedView;
