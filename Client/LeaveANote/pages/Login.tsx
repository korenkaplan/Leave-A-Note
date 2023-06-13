/* eslint-disable prettier/prettier */
import React, { useState, FC, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input, Text, CheckBox } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import { emailSchema, passwordSchema } from '../utils/validation/validationSchemas';

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
            <Input
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              leftIcon={{ type: 'ionicon', name: 'mail-outline' }}
              errorMessage={errors.email}
            />
            <Input
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
              value={values.password}
              onChangeText={handleChange('password')}
              leftIcon={{ type: 'ionicon', name: 'lock-closed-outline' }}
              rightIcon={{
                type: 'ionicon',
                name: hidePassword ? 'eye-off-outline' : 'eye-outline',
                onPress: () => setHidePassword(!hidePassword),
              }}
              errorMessage={errors.password}
            />
            <CheckBox
              title="Remember Me"
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              textStyle={{ color: 'black', backgroundColor: 'transparent' }}
            />
            <Button title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <DividerWithText text="Don't have an account?" />
      <Button title="Register" type="outline" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Login;
