import { StyleSheet } from 'react-native';
import {useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';
const {theme} = useContext(ThemeContext);
const {text} = theme.colors
export const inputStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  input: {
    color:text.primary,
  },
});

export const buttonStyles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
