import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Input, InputProps } from '@rneui/themed';

interface CustomInputProps extends InputProps {
  inputContainerStyle?: object;
  inputStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  inputContainerStyle,
  inputStyle,
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text } = theme.colors;

  const inputContainer: object = {
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  };

  const input: object = {
    color: text.primary,
  };


  return (
    <Input
      inputContainerStyle={[inputContainer, inputContainerStyle]}
      inputStyle={[input, inputStyle]}
      {...rest}
    />
  );
};

export default CustomInput;
