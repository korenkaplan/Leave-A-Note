import React, { createContext, useState, ReactNode} from 'react';
import {Theme} from '../utils/interfaces/interfaces'
import { useSafeArea } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the theme context
interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    lightTheme: Theme;
    darkTheme: Theme;

}
type ColorScheme = 'dark' | 'light';
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);
// Create the theme provider component
function ThemeContextProvider({ children }: { children: ReactNode; }) {
    // Define the initial light mode theme
      const lightTheme: Theme = {
        colors: {
          primary: '#8b9dc3',
          secondary: '#e4e5f1',
          text: {
            primary: '#000000',
            secondary: '#333333',
          },
          background: '#fafafa',
          // Add more colors as needed
        },
        fonts: {
          regular: 'Roboto-Regular',
          bold: 'Roboto-Bold',
          // Add more font styles as needed
        },
      };
      
      // Define the dark mode theme
      const darkTheme: Theme = {
        colors: {
          primary: 'purple',
          secondary: '#424549',
          text: {
            primary: '#ffffff',
            secondary: '#cccccc',
          },
          background: '#222222',
          // Add more colors as needed
        },
        fonts: {
          regular: 'Roboto-Regular',
          bold: 'Roboto-Bold',
          // Add more font styles as needed
        },
      };
      
  const [theme, setTheme] = useState(lightTheme);
  const [icon, setIcon] = useState('');

const setColorScheme= async (colorScheme:ColorScheme) => {
}
const saveColorSchemePreference = async (colorScheme:string) => {
  try {
    await AsyncStorage.setItem('colorScheme', colorScheme);
  } catch (error) {
    // Handle the error
    console.log('Error saving color scheme preference:', error);
  }
};
const getColorSchemePreference = async () => {
  try {
    const colorScheme: string | null = await AsyncStorage.getItem('colorScheme');
    return colorScheme;
  } catch (error) {
    // Handle the error
    return null;
    console.log('Error retrieving color scheme preference:', error);
  }
};

  const value: ThemeContextType = {
    theme,
    setTheme,
    lightTheme,
    darkTheme,
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export default ThemeContextProvider;