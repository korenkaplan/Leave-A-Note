import React, { useState, FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import {Text, CheckBox } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import { emailSchema, passwordSchema } from '../utils/validation/validationSchemas';
import { ThemeContext } from '../context/ThemeContext';
import { IText, StyleButton } from '../utils/interfaces/interfaces';
import CustomButton from '../Components/uiComponents/CustomButton';
import CustomInput from '../Components/uiComponents/CustomInput';
import Toast from 'react-native-toast-message';
import CustomSpinner from '../Components/uiComponents/CustomSpinner';
interface LoginFormValues {
  email: string;
  password: string;
}

interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}

const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});


const Login: FC<Props> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const { loginAttempt, setAuthenticated,showToast } = useContext(MainContext);
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors
  const styles = createStyles(primary, secondary, text, background);
  const messageToast='Sorry... wrong email or password';
  const statusToast='error';
  const headerToast='Login Failed';
  const handleFormSubmit = async (values: LoginFormValues) => {
    // Handle login form submission
    setIsLoading(true)
    const result = await loginAttempt(values.email, values.password, rememberMe);
    setIsLoading(false)
    if (result === false) {
      showToast(messageToast,statusToast,headerToast);
      return;
    }
    setAuthenticated(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading} h1>
        Hello, Welcome
      </Text>
      <Text style={styles.subHeading} h4>
        Log in to start using the app
      </Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <CustomInput
              placeholder="Enter your email"
              placeholderTextColor={text.primary}
              value={values.email}
              onChangeText={handleChange('email')}
              leftIcon={{ type: 'ionicon', name: 'mail-outline', color: text.primary, }}
              errorMessage={errors.email} />
            <CustomInput
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
              value={values.password}
              placeholderTextColor={text.primary}
              onChangeText={handleChange('password')}
              leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: text.primary }}
              rightIcon={{
                type: 'ionicon',
                name: hidePassword ? 'eye-off-outline' : 'eye-outline',
                color: text.primary,
                onPress: () => setHidePassword(!hidePassword),
              }}
              errorMessage={errors.password}/>
            <CheckBox
              title="Remember Me"
              checked={rememberMe}
              checkedColor={text.primary}
              checkedTitle='Great we will remember you'
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={{ backgroundColor: background }}
              textStyle={{ color: text.primary, backgroundColor: 'transparent' }}
            />
            <View style={styles.buttonContainer}>
              <CustomButton
                type={'main'}
                onPress={handleSubmit}
                title={'Login'}  />
            </View>

          </>
        )}
      </Formik>
      <DividerWithText title="Don't have an account?" />
      <View style={styles.buttonContainer}>
        <CustomButton
          type='alt'
          onPress={() => navigation.navigate({name:'SignUp', params:{}})}
          title={'Register'}/>
      </View>
      <Toast/>
      <CustomSpinner title='making sure its you...' isVisible={isLoading}/>

    </View>
  );
};

const createStyles = (primary: string, secondary: string, text: IText, background: string) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: background,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBorder1: {
    borderColor: text.primary,
    borderWidth: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: text.primary,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 20,
    color: text.secondary,

  },
  inputContainer: {
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    color: text.primary,
  },

});

export default Login;
