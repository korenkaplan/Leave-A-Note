import React,{useContext} from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Input } from '@rneui/themed';
const CustomInput = ({ inputContainerStyle,inputStyle, ...rest}) => {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text } = theme.colors;

  const inputContainer = {
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  };

  const input = {
    color:text.primary,

  };
const defaultContainerStyle ={
  width:200,
  height:55,
}
  return (
    <Input
    inputContainerStyle={[inputContainer,inputContainerStyle]}
    inputStyle={[input, ]}
      {...rest}
    />
  );
};

export default CustomInput;
