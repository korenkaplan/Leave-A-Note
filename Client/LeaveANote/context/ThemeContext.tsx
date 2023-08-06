import React, { createContext, useState, ReactNode } from 'react';
import { Theme, IButtonTheme } from '../utils/interfaces/interfaces';

// Create the theme context
interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
  lightTheme: Theme;
  darkTheme: Theme;
  buttonTheme: IButtonTheme;
}
export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

// Create the theme provider component
function ThemeContextProvider({ children }: { children: ReactNode }) {
  // Define the initial light mode theme
  const lightTheme: Theme = {
    colors: {
      primary: '#702963',
      secondary: '#e4e5f1',
      text: {
        primary: '#702963',
        secondary: '#333333',
      },
      background: '#FCF5E5',
      // Add more colors as needed
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Add more font styles as needed
    },
  };

  const buttonTheme: IButtonTheme = {
    buttonMain: {
      background: '#702963',
      text: '#ffffff',
    },
    buttonAlt: {
      background: '#51414F',
      text: '#ffffff',
    },
  };

  // Define the dark mode theme
  const darkTheme: Theme = {
    colors: {
      primary: '#702963',
      secondary: '#424549',
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
      },
      background: '#343434',
      // Add more colors as needed
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
      // Add more font styles as needed
    },
  };

  // Use state to manage the current theme
  const [theme, setTheme] = useState(lightTheme);

  // Prepare the context value
  const value: ThemeContextType = {
    theme,
    setTheme,
    lightTheme,
    darkTheme,
    buttonTheme,
  };

  // Provide the context value to the children
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export default ThemeContextProvider;
