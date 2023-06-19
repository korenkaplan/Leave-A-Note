import React,{useState,FC, useContext} from 'react';
import { View, StyleSheet,ScrollView,Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../context/ContextProvider';
import { emailSchema, passwordSchema, phoneNumberSchema,carNumberSchema,fullNameSchema } from '../utils/validation/validationSchemas';
import DividerWithText from '../Components/uiComponents/DividerWithText';
import CustomInput from '../Components/uiComponents/CustomInput';
import CustomButton from '../Components/uiComponents/CustomButton';
import { Text as IText } from '../utils/interfaces/interfaces';
import { ThemeContext } from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';
import { Divider } from '@rneui/themed';
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
const {theme} = useContext(ThemeContext);
const {primary,secondary,text,background} = theme.colors
const styles = createStyles(primary,secondary,text,background)
  const handleFormSubmit = async (values: SignUpFormValues,{setFieldError}: any) => {
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
  Alert.alert('Registered Successfully', 'Your account has been created, now sign in to get started', [
 
    {text: 'Move to sign in', onPress: () => navigation.navigate('Login')},
  ]);
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scroll}>
      <DividerWithText title="Sign Up And Lets Begin "/>

      <Formik
        initialValues={{ email: 'k@gmail.com', password: '123456',repeatPassword:'123456',phoneNumber:'0533406789',carNumber:'8333368',fullName:'koren kaplan' }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ handleChange, handleSubmit, values, errors }) => (
          <>
            <CustomInput
                placeholder="Enter your email"
                value={values.email}
                onChangeText={handleChange('email')}
                leftIcon={{ type: 'ionicon', name: 'mail-outline', color: text.primary }}
                errorMessage={errors.email} inputContainerStyle={undefined} inputStyle={undefined}              
            />
        
                  <CustomInput
                placeholder="Enter your full name"
                value={values.fullName}
                onChangeText={handleChange('fullName')}
                leftIcon={{ type: 'ionicon', name: 'person-outline', color: text.primary }}
                errorMessage={errors.fullName} inputContainerStyle={undefined} inputStyle={undefined}            />
            <CustomInput
                placeholder="Enter your password"
                secureTextEntry={hidePassowrd}
                value={values.password}
                onChangeText={handleChange('password')}
                leftIcon={{ type: 'ionicon', name: 'lock-closed-outline', color: text.primary }}
                rightIcon={{ type: 'ionicon', color: text.primary, name: hidePassowrd ? 'eye-off-outline' : 'eye-outline', onPress: () => setHidePassowrd(!hidePassowrd) }}
                errorMessage={errors.password} inputContainerStyle={undefined} inputStyle={undefined}            />
               <CustomInput
                placeholder="Repeat your password"
                secureTextEntry={hideRepPassowrd}
                value={values.repeatPassword}
                onChangeText={handleChange('repeatPassword')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'lock-closed-outline', color: text.primary }}
                rightIcon={{ type: 'ionicon', color: text.primary, name: hideRepPassowrd ? 'eye-off-outline' : 'eye-outline', onPress: () => setHideRepPassowrd(!hideRepPassowrd) }}
                errorMessage={errors.repeatPassword} inputContainerStyle={undefined} inputStyle={undefined}            />
             <CustomInput
                placeholder="Enter your car number"
                value={values.carNumber}
                onChangeText={handleChange('carNumber')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'car-outline' }}
                errorMessage={errors.carNumber} inputContainerStyle={undefined} inputStyle={undefined}            />
            <CustomInput
                placeholder="Enter your phone number"
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                leftIcon={{ type: 'ionicon', color: text.primary, name: 'phone-portrait-outline' }}
                errorMessage={errors.phoneNumber} inputContainerStyle={undefined} inputStyle={undefined}            />
                <View style={styles.buttonContainer}>
      <CustomButton
                  buttonStyle={[{ backgroundColor: primary }, styles.primaryBorder1]}
                  onPress={handleSubmit}
                  title={'Register'} titleStyle={undefined} containerStyle={undefined} disabled={undefined}      />
    </View>
          </>
        )}
      </Formik>
      <DividerWithText title="Already Have An Account ?"/>
      <View style={styles.buttonContainer}>
      <CustomButton
            buttonStyle={[{ backgroundColor: secondary }, styles.primaryBorder1]}
            onPress={() => navigation.navigate('Login')}
            title={'Login'} titleStyle={undefined} containerStyle={undefined} disabled={undefined}      />
    </View>
      </ScrollView>
    </ThemedView>
  );
};
const createStyles = (primary:string,secondary:string,text:IText,background:string) =>  StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  primaryBorder1:{
    borderColor: text.primary,
    borderWidth:1,
  },
  scroll:{
    flexGrow: 1,
    padding: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10,
  },
});
export default SignUp;
