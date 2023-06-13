/* eslint-disable prettier/prettier */
import React,{useState,FC, useContext} from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input, Text, CheckBox  } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import {emailSchema,passwordSchema} from '../utils/validation/validationSchemas'
interface LoginFormValues {
  email: string;
  password: string;
}
interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}
// Starts with one or more word characters or hyphens: [\w-]+
// Can have zero or more groups of a dot followed by one or more word characters or hyphens: (\.[\w-]+)*
// Followed by the @ symbol: @
// Followed by one or more word characters or hyphens for the domain name: [\w-]+
// Can have one or more groups of a dot followed by one or more word characters or hyphens for the subdomain: (\.[\w-]+)*
// Followed by a dot and two to seven alphabetic characters for the top-level domain (e.g., .com, .co.uk): (\.[a-zA-Z]{2,7})
const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
});



const Login: FC<Props> = ({ navigation }) => {
const [hidePassowrd, setHidePassowrd] = useState(true);
const [rememberMe, setRememberMe] = useState(false);
;const {loginAttempt} = useContext(MainContext);

  const handleFormSubmit = async (values: LoginFormValues) => {
    // Handle login form submission

    console.log(values);
   await loginAttempt(values.email,values.password,rememberMe);
  };

  return (
    <View style={styles.container}>
      <Text h1>Hello welcome</Text>
      <Text h4>log in to start using the app</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <Input
              label="Email"
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              leftIcon={{type:'ionicon', name: 'mail-outline'}}
              errorMessage={errors.email}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={hidePassowrd}
              value={values.password}
              onChangeText={handleChange('password')}
              leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
           rightIcon={{type:'ionicon', name : hidePassowrd?'eye-off-outline':'eye-outline',  onPress: () => setHidePassowrd(!hidePassowrd)}}
              errorMessage={errors.password}
            />
            <CheckBox
  title="Remember Me"
  checked={rememberMe}
  onPress={() => setRememberMe(!rememberMe)}
  textStyle={{ color: 'black' }}
/>
            <Button title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <DividerWithText text={'Don\'t have an accout ?'}/>
      <Button title="Register" type="outline" onPress={()=> navigation.navigate('SignUp')} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Login;
