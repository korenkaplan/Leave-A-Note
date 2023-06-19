import React, { useState, FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import { emailSchema, passwordSchema } from '../utils/validation/validationSchemas';
import { ThemeContext } from '../context/ThemeContext';
import { Text as IText } from '../utils/interfaces/interfaces';
import CustomButton from '../Components/uiComponents/CustomButton';
import ThemedView from '../Components/uiComponents/ThemedView';
import CustomInput from '../Components/uiComponents/CustomInput';

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
  const { loginAttempt } = useContext(MainContext);
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background);

  const handleFormSubmit = async (values: LoginFormValues) => {
    // Handle login form submission
    console.log(values);
    await loginAttempt(values.email, values.password, rememberMe);
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
              value={values.email}
              onChangeText={handleChange('email')}
              leftIcon={{ type: 'ionicon', name: 'mail-outline', color: text.primary, }}
              errorMessage={errors.email} inputContainerStyle={undefined} inputStyle={undefined}            />
            <CustomInput
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange('password')}
              leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: text.primary }}
              rightIcon={{
                type: 'ionicon',
                name: hidePassword ? 'eye-off-outline' : 'eye-outline',
                color: text.primary,
                onPress: () => setHidePassword(!hidePassword),
              }}
              errorMessage={errors.password} inputContainerStyle={undefined} inputStyle={undefined}            />
            <CheckBox
              title="Remember Me"
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              containerStyle={{ backgroundColor: background }}
              textStyle={{ color:text.primary, backgroundColor: 'transparent' }}
            />
       <View style={styles.buttonContainer}>
      <CustomButton
                buttonStyle={[{ backgroundColor: primary }, styles.primaryBorder1]}
                onPress={handleSubmit}
                title={'Login'} titleStyle={undefined} containerStyle={undefined} disabled={undefined}      />
    </View>

          </>
        )}
      </Formik>
      <DividerWithText title="Don't have an account?" />
      <View style={styles.buttonContainer}>
      <CustomButton
          buttonStyle={[{ backgroundColor: secondary }, styles.primaryBorder1]}
          onPress={() => navigation.navigate('SignUp')}
          title={'Register'} titleStyle={undefined} containerStyle={undefined} disabled={undefined}      />
    </View>

    </View>
  );
};

const createStyles = (primary:string,secondary:string,text:IText,background:string) =>  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:background,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
  primaryBorder1:{
    borderColor: text.primary,
    borderWidth:1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color:text.primary,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 20,
    color:text.secondary,

  },
  inputContainer:{
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input:{
    color:text.primary,
  },

});

export default Login;
