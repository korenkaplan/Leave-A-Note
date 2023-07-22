import React, { useContext, useState } from 'react';
import { Overlay,Text} from '@rneui/themed';
import { ThemeContext } from '../../context/ThemeContext';
import LottieView from 'lottie-react-native';
import { startCase } from 'lodash';
import { View, StyleSheet } from 'react-native';
import animationData from '../../assets/lottie.Animation/sandTimer.json'
import { IText, StyleButton } from '../../utils/interfaces/interfaces';
interface Props {
  title?: string;
  isVisible: boolean
  fullscreen?: boolean
  titleStyle?: object
  overlayStyle?: object
  lottieStyle?: object
  animationSpeed?: number
}

const CustomSpinner: React.FC<Props> = ({isVisible, title,titleStyle,overlayStyle,lottieStyle,animationSpeed}) => {
    const [visible, setVisible] = useState(false);
    const { theme,buttonTheme } = useContext(ThemeContext);
    const { primary, secondary, text,background } = theme.colors;
    const {buttonMain,buttonAlt } = buttonTheme;
    const styles = createStyles(primary,secondary,text,background,buttonMain,buttonAlt)

    const toggleOverlay = () => {
      setVisible(!visible);
    };

    return (
        <View >
        <Overlay overlayStyle={[styles.defaultOverlayStyle,overlayStyle]} isVisible={isVisible} onBackdropPress={toggleOverlay} >
        <LottieView  style={[styles.defaultLottieStyle,lottieStyle]} speed={animationSpeed?animationSpeed:1.10} source={animationData}  autoPlay />
        <Text style={[styles.defaultTitleStyle,titleStyle]}>{title?startCase(title):'Loading...'}</Text>
        </Overlay>
        </View>
       
    );
    };
    
   
const createStyles = (primary: string, secondary: string, text: IText, background: string,buttonMain:StyleButton,buttonAlt: StyleButton) =>
StyleSheet.create({
        defaultLottieStyle: {
            width: 110,
            
          },
          defaultTitleStyle:{
            color:buttonMain.text,
            fontSize:25,
            textAlign: 'center',
            padding:24,
            alignSelf: 'center',
            borderRadius:50,
            elevation:5,
            shadowColor:buttonMain.background
          },
          defaultOverlayStyle:{
            backgroundColor:'transparent',justifyContent:'center',alignItems:'center',elevation:0,width:'100%'
          },

    });
    

export default CustomSpinner;
