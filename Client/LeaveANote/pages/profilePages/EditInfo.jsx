
import { View, Text,StyleSheet, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import {Input} from '@rneui/themed'
import {MainContext} from '../../context/ContextProvider'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {fullNameSchema,carNumberSchema, phoneNumberSchema, emailSchema} from '../../utils/validation/validationSchemas'
import ThemedView from '../../Components/uiComponents/ThemedView';
import { ThemeContext } from '../../context/ThemeContext';
import CustomButton from '../../Components/uiComponents/CustomButton';
export default function EditInfo() {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  const {updateUserInformation} = useContext(MainContext);
  const validationSchema = Yup.object().shape({
    fullname:fullNameSchema,
    carNum: carNumberSchema,
    phoneNumber:phoneNumberSchema,
    email: emailSchema,
  });
  const {currentUser} = useContext(MainContext);

  const handleFormSubmit = async (values, { resetForm }) => {
    //TODO: update user information in database
      // Handle form submission
      console.log(values);
      const result = await updateUserInformation(values);
      if( result)
      {
      Alert.alert('Your information has been updated successfully')
      resetForm();

      }
      else{
      Alert.alert('Your information wasn\'t updated successfully try again later...')
      }
      // Clear the form inputs
  };
  return (
    <ThemedView >
      <Formik
      initialValues={{fullname: currentUser.fullname, carNum: currentUser.carNum, phoneNumber:currentUser.phoneNumber,email:currentUser.email}}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}>
        {({handleChange, handleSubmit, values, errors,resetForm}) => (
          <View style={styles.container}>
            <Input
            onChangeText={handleChange('fullname')}
            value={values.fullname}
            leftIcon={{type:'ionicon', name: 'person-outline', color:text.primary}}
            placeholder='Full-Name'
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}

            />
             {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

             <Input
            onChangeText={handleChange('carNum')}
            value={values.carNum}
            leftIcon={{type:'ionicon', name: 'car-outline', color:text.primary}}
            placeholder='Car Number'
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}


            keyboardType='numeric'
            />
             {errors.carNum && <Text style={styles.error}>{errors.carNum}</Text>}

             <Input
            onChangeText={handleChange('phoneNumber')}
            value={values.phoneNumber}
            leftIcon={{type:'ionicon', name: 'phone-portrait-outline', color:text.primary}}
            placeholder='Phone Number'
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}

            keyboardType='numeric'
            />
             {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
             <Input
            onChangeText={handleChange('email')}
            value={values.email}
            leftIcon={{type:'ionicon', name: 'mail-outline', color:text.primary}}
            placeholder='Email Address'
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}

            keyboardType='email-address'
            />
             {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
             <View style={styles.bottomContainer}>
             <CustomButton buttonStyle={styles.submitBtn}  onPress={handleSubmit} title={'Submit'} />
             </View>

          </View>
        )}
      </Formik>
    </ThemedView>
  )
}
const createStyles = (primary,secondary,text,background) =>  StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    padding:20,
  },
  inputContainer:{
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  bottomContainer:{
    width: '100%',
    alignItems: 'center',
  },
  submitBtn:{
    backgroundColor: secondary,
    borderColor:text.primary,
    borderWidth:1,
    borderRadius:10,
  },
  error:{
    color:'red'
  },
  input:{
    color:text.primary,
  },


});