import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Alert, Slide } from 'native-base';
import { Text } from '@rneui/base';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton } from '../../utils/interfaces/interfaces';
interface Props {
  title: string;
  status: string;
  isShowing: boolean;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

const CustomSlide: React.FC<Props> = ({ title, status, isShowing, placement }) => {
    const{buttonTheme} = useContext(ThemeContext);
    const{buttonMain,buttonAlt} = buttonTheme;
    const styles = createStyles(buttonMain,buttonAlt)
  return (
    <Slide in={isShowing} placement={placement}>
      <Alert style={status === 'success'?styles.alertContainerSuccess:styles.alertContainerError } status={status} safeAreaTop={4}>
        <Text style={styles.titleText} color="error.600" fontWeight="medium">
          {title}
        </Text>
      </Alert>
    </Slide>
  );
};

const createStyles = (buttonMain:StyleButton,buttonAlt:StyleButton,status: string) =>  StyleSheet.create({
    alertContainerError: {
        justifyContent: 'center',
        backgroundColor:  '#8B0000',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderColor:'white',
        borderWidth:2
        // Add additional styles as needed
      },
  titleText: {
    // Add additional styles for the title text
    fontSize:18,
    color:buttonMain.text
  },
  alertContainerSuccess: {
    justifyContent: 'center',
    backgroundColor:'#228B22',
    borderBottomLeftRadius:10,
    borderBottomRightRadius:10,
    borderColor:'white',
    borderWidth:2
    // Add additional styles as needed
  },

});

export default CustomSlide;
