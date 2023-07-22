import React, { useState, FC, useContext} from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../context/ContextProvider';
import { emailSchema, passwordSchema, phoneNumberSchema, carNumberSchema, nameSchema } from '../utils/validation/validationSchemas';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import CustomInput from '../Components/uiComponents/CustomInput';
import CustomButton from '../Components/uiComponents/CustomButton';
import { IText, SignUpFormValues } from '../utils/interfaces/interfaces';
import { ThemeContext } from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';
import Toast from 'react-native-toast-message';
import CustomSpinner from '../Components/uiComponents/CustomSpinner';
interface Props {
  navigation: StackNavigationProp<Record<string, object>, string>;
}
const validationSchema = Yup.object().shape({
  email: emailSchema,
  password: passwordSchema,
  repeatPassword: Yup.string().required('Field is required').oneOf([Yup.ref('password')], 'Must match the password'),
  phoneNumber: phoneNumberSchema,
  carNumber: carNumberSchema,
  name: nameSchema,
});


const SignUp: FC<Props> = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideRepPassword, setHideRepPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const { signupAttempt, autoLoginNewUser, showToast } = useContext(MainContext);
  const { theme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors
  const styles = createStyles(primary, secondary, text, background)
  const handleFormSubmit = async (values: SignUpFormValues, { setFieldError }: any) => {
    setIsLoading(true)
    const [isRegistered, message, token] = await signupAttempt(values);
    const [messageToast, statusToast, headerToast] = isRegistered ? [`${message} moving to homepage`, 'success', 'Sign-Up Successfully 👋'] : [message, 'error', 'Sign-Up failed'];
    setIsLoading(false)
    showToast(messageToast, statusToast, headerToast);
    if (!isRegistered || !token) return
    setTimeout(() => {
      autoLoginNewUser(token)
    }, 3000)

  };


  return (
    <ThemedView style={styles.container}>
      <DividerWithText weight='bold' fontSize={20} title="Sign Up And Lets Begin " />
      <ScrollView style={styles.scroll}>

        <Formik
          initialValues={{ email: '', password: '', repeatPassword: '', phoneNumber: '', carNumber: '', name: '' }}
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
                leftIcon={{ type: 'ionicon', name: 'mail-outline', color: text.primary }}
                errorMessage={errors.email} />

              <CustomInput
                placeholder="Enter your full name"
                value={values.name}
                placeholderTextColor={text.primary}
                onChangeText={handleChange('name')}
                leftIcon={{ type: 'ionicon', name: 'person-outline', color: text.primary }}
                errorMessage={errors.name} />
              <CustomInput
                placeholder="Enter your password"
                secureTextEntry={hidePassword}
                value={values.password}
                placeholderTextColor={text.primary}
                onChangeText={handleChange('password')}
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: text.primary }}
                rightIcon={{ type: 'ionicon', color: text.primary, name: hidePassword ? 'eye-off-outline' : 'eye-outline', onPress: () => setHidePassword(!hidePassword) }}
                errorMessage={errors.password} />
              <CustomInput
                placeholder="Repeat your password"
                secureTextEntry={hideRepPassword}
                value={values.repeatPassword}
                placeholderTextColor={text.primary}
                onChangeText={handleChange('repeatPassword')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'lock-closed-outline' }}
                rightIcon={{ type: 'ionicon', color: text.primary, name: hideRepPassword ? 'eye-off-outline' : 'eye-outline', onPress: () => setHideRepPassword(!hideRepPassword) }}
                errorMessage={errors.repeatPassword} />
              <CustomInput
                placeholder="Enter your car number"
                value={values.carNumber}
                placeholderTextColor={text.primary}
                onChangeText={handleChange('carNumber')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'car-outline' }}
                errorMessage={errors.carNumber} />
              <CustomInput
                placeholder="Enter your phone number"
                value={values.phoneNumber}
                placeholderTextColor={text.primary}
                onChangeText={handleChange('phoneNumber')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'phone-portrait-outline' }}
                errorMessage={errors.phoneNumber} />
              <View style={styles.buttonContainer}>
                <CustomButton
                  type='main'
                  onPress={handleSubmit}
                  title={'Register'} />
              </View>
            </>
          )}
        </Formik>
        <DividerWithText title="Already Have An Account ?" />
        <View style={styles.buttonContainer}>
          <CustomButton
            type='alt'
            onPress={() => navigation.navigate({ name: 'Login', params: {} })}
            title={'Login'} />
        </View>
      </ScrollView>
      <Toast />
      <CustomSpinner title='Creating Your User' isVisible={isLoading}/>
    </ThemedView>
  );
};
const createStyles = (primary: string, secondary: string, text: IText, background: string) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  primaryBorder1: {
    borderColor: text.primary,
    borderWidth: 1,
  },
  scroll: {
    flexGrow: 1,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
export default SignUp;
