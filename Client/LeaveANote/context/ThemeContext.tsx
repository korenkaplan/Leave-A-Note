import React, { createContext, useState, ReactNode} from 'react';
import {Theme} from '../utils/interfaces/interfaces'

// Create the theme context
interface ThemeContextType {
    theme: Theme;
    setTheme:  React.Dispatch<React.SetStateAction<Theme>>;
    darkTheme: Theme;
    lightTheme: Theme;
    toggleTheme: () => void;
}

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
          primary: '#7289da',
          secondary: '#424549',
          text: {
            primary: '#ffffff',
            secondary: '#cccccc',
          },
          background: '#000000',
          // Add more colors as needed
        },
        fonts: {
          regular: 'Roboto-Regular',
          bold: 'Roboto-Bold',
          // Add more font styles as needed
        },
      };
      
  
  const [theme, setTheme] = useState(lightTheme);
  
  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    console.log('here');
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
};

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    lightTheme,
    darkTheme
  };
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export default ThemeContextProvider;
