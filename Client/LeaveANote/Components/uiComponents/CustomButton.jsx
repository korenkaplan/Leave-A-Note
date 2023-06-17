import React,{useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Button } from '@rneui/themed';
const CustomButton = ({ title, buttonStyle, titleStyle, containerStyle, onPress, disabled, ...rest}) => {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text } = theme.colors;

  const defaultButtonStyle = {
    backgroundColor: primary,
    borderRadius:17,
  };
 const primaryBorder1 ={
    borderColor: text.primary,
    borderWidth:1,
  };
  const defaultTitleStyle = {
    color: text.primary,
  };
const defaultContainerStyle ={
  width:200,
  height:55,
}
  return (
    <Button
      title={title}
      buttonStyle={[defaultButtonStyle, buttonStyle,primaryBorder1]}
      titleStyle={[defaultTitleStyle, titleStyle]}
      containerStyle={[defaultContainerStyle,, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    />
  );
};

export default CustomButton;
