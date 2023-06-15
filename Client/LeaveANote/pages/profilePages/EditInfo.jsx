
import { View, Text,StyleSheet, Alert } from 'react-native'
import React,{useState,useContext} from 'react'
import { Input, Icon,Button } from '@rneui/themed';
import {MainContext} from '../../context/ContextProvider'
import { Formik } from 'formik';
import * as Yup from 'yup';
import {fullNameSchema,carNumberSchema, phoneNumberSchema, emailSchema} from '../../utils/validation/validationSchemas'
export default function EditInfo() {
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
    <View style={styles.container}>
      <Formik
      initialValues={{fullname: currentUser.fullname, carNum: currentUser.carNum, phoneNumber:currentUser.phoneNumber,email:currentUser.email}}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}>
        {({handleChange, handleSubmit, values, errors,resetForm}) => (
          <View>
            <Input
            onChangeText={handleChange('fullname')}
            value={values.fullname}
            leftIcon={{type:'ionicon', name: 'person-outline'}}
            placeholder='Full-Name'
            />
             {errors.fullname && <Text style={styles.error}>{errors.fullname}</Text>}

             <Input
            onChangeText={handleChange('carNum')}
            value={values.carNum}
            leftIcon={{type:'ionicon', name: 'car-outline'}}
            placeholder='Car Number'
            keyboardType='numeric'
            />
             {errors.carNum && <Text style={styles.error}>{errors.carNum}</Text>}

             <Input
            onChangeText={handleChange('phoneNumber')}
            value={values.phoneNumber}
            leftIcon={{type:'ionicon', name: 'phone-portrait-outline'}}
            placeholder='Phone Number'
            keyboardType='numeric'
            />
             {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
             <Input
            onChangeText={handleChange('email')}
            value={values.email}
            leftIcon={{type:'ionicon', name: 'mail-outline'}}
            placeholder='Email Address'
            keyboardType='email-address'
            />
             {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
             <Button  title="Submit" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    backgroundColor:'lightgray',
    padding:20,

  },
  error:{
    color:'red'
  }
});