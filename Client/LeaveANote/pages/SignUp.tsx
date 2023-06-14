/* eslint-disable prettier/prettier */
import React,{useState,FC, useContext} from 'react';
import { View, StyleSheet,ScrollView,Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button, Input, Text, CheckBox  } from '@rneui/base';
import { MainContext } from '../context/ContextProvider';
import { emailSchema, passwordSchema, phoneNumberSchema,carNumberSchema,fullNameSchema } from '../utils/validation/validationSchemas';
import DividerWithText from '../Components/uiComponents/DividerWithText';
interface SignUpFormValues {
  email: string;
  password: string;
  repeatPassword: string;
  phoneNumber: string;
  carNumber: string;
  fullName: string;
}

interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}
const validationSchema = Yup.object().shape({
  email:emailSchema,
  password:passwordSchema,
  repeatPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')],'Must match the password'),
  phoneNumber: phoneNumberSchema,
  carNumber: carNumberSchema,
  fullName:fullNameSchema,
});

const SignUp: FC<Props> = ({ navigation }) => {
const [hidePassowrd, setHidePassowrd] = useState(true);
const [hideRepPassowrd, setHideRepPassowrd] = useState(true);
const {signupAttempt} = useContext(MainContext);
  const handleFormSubmit = async (values: SignUpFormValues,{setFieldError}) => {
    try {
      let result: number = await signupAttempt(values);

      switch (result) {
        case 0: //0 -> success
          // show success message and move to login

          break;
        case 1://1 -> phone number already in use
          // show error message phone number already in use
    setFieldError('phoneNumber','This phone number is already in use');

          break;
        case 2:// 2 -> email already in use
          // show error message email already in use
    setFieldError('email','This email address is already in use');

          break;
        case 3:// 3 -> car number already in use
          // show error message car number already in use
    setFieldError('carNumber','This car number is already in use');
          break;
      }
      if (result === 0)
         createAlert();
      

    } catch (error: any) {
      console.log(error.message);
    }
    console.log(values);
  };
  const createAlert = () =>
  Alert.alert('Registered Successfully', 'Toy account has been created, now sign in to get started', [
 
    {text: 'Move to sign in', onPress: () => navigation.navigate('Login')},
  ]);
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      <Formik
        initialValues={{ email: 'k@gmail.com', password: '123456',repeatPassword:'123456',phoneNumber:'0533406789',carNumber:'8333368',fullName:'koren kaplan' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <Input
              placeholder="Enter your email"
              value={values.email}
              onChangeText={handleChange('email')}
              leftIcon={{type:'ionicon', name: 'mail-outline'}}
              errorMessage={errors.email}
            />
                  <Input
              placeholder="Enter your full name"
              value={values.fullName}
              onChangeText={handleChange('fullName')}
              leftIcon={{type:'ionicon', name: 'person-outline'}}
              errorMessage={errors.fullName}
            />
            <Input
              placeholder="Enter your password"
              secureTextEntry={hidePassowrd}
              value={values.password}
              onChangeText={handleChange('password')}
              leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
           rightIcon={{type:'ionicon', name : hidePassowrd ? 'eye-off-outline' : 'eye-outline',  onPress: () => setHidePassowrd(!hidePassowrd)}}
              errorMessage={errors.password}
            />
               <Input
              placeholder="Repeat your password"
              secureTextEntry={hideRepPassowrd}
              value={values.repeatPassword}
              onChangeText={handleChange('repeatPassword')}
              leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
           rightIcon={{type:'ionicon', name : hideRepPassowrd ? 'eye-off-outline' : 'eye-outline',  onPress: () => setHideRepPassowrd(!hideRepPassowrd)}}
              errorMessage={errors.repeatPassword}
            />
             <Input
              placeholder="Enter your car number"
              value={values.carNumber}
              onChangeText={handleChange('carNumber')}
              leftIcon={{type:'ionicon', name: 'car-outline'}}
              errorMessage={errors.carNumber}
            />
            <Input
              placeholder="Enter your phone number"
              value={values.phoneNumber}
              onChangeText={handleChange('phoneNumber')}
              leftIcon={{type:'ionicon', name: 'phone-portrait-outline'}}
              errorMessage={errors.phoneNumber}
            />
            <Button title="Sign Up" onPress={handleSubmit} />
          </>
        )}
      </Formik>
      <DividerWithText text="Already Have An Account ?"/>
      <Button title="Sign in" type="outline" onPress={() => navigation.navigate('Login')} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scroll:{
    flexGrow: 1,
    padding: 10,
  },
});
export default SignUp;
