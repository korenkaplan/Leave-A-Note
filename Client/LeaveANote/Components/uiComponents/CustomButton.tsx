import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { Button} from '@rneui/themed';

interface CustomButtonProps{
  title: string;
  type: 'main' | 'alt';
  buttonStyle?: object;
  titleStyle?: object;
  containerStyle?: object;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  buttonStyle,
  titleStyle,
  containerStyle,
  onPress,
  disabled,
  type,
  ...rest
}) => {
  const { theme,buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text } = theme.colors;
  const {buttonMain,buttonAlt } = buttonTheme;
  const defaultButtonStyle = {
    backgroundColor: type === 'main'? buttonMain.background: buttonAlt.background,
    borderRadius: 17,
  };

  const primaryBorder1 = {
    borderColor: text.primary,
    borderWidth: 1,
  };

  const defaultTitleStyle = {
    color:type ===  'main'? buttonMain.text: buttonAlt.text,
  };

  const defaultContainerStyle = {
    width: 200,
    height: 55,
  };

  return (
    <Button
      title={title}
      buttonStyle={[defaultButtonStyle, buttonStyle, primaryBorder1]}
      titleStyle={[defaultTitleStyle, titleStyle]}
      containerStyle={[defaultContainerStyle, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    />
  );
};

export default CustomButton;
