import { View, Text,StyleSheet,KeyboardAvoidingView } from 'react-native'
import React,{useState} from 'react'
import { Input, Icon,Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
export default function EditInfo() {

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required('fullname is required').min(1,'Name must be have at least one letter'),
    carNum: Yup.string().required('Car number is required').matches(/^[0-9]{7,8}$/, 'Invalid Car number'),
    phoneNumber: Yup.string().required('Phone number is required').matches(/^05[0-5][0-9]{7}$/, 'Invalid phone number'),
    email: Yup.string().required('Email is required').email('Invalid Email address'),
  });

  const handleFormSubmit = (values, { resetForm }) => {
    //TODO: validate password with database
      // Handle form submission
      console.log(values);

      // Clear the form inputs
      resetForm();
  };
  return (
    <View style={styles.container}>
      <Formik
      initialValues={{fullname: '', carNum: '', phoneNumber: ''}}
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
             <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              >
             <Input
            onChangeText={handleChange('email')}
            value={values.email}
            leftIcon={{type:'ionicon', name: 'mail-outline'}}
            placeholder='Email Address'
            keyboardType='email-address'
            />
             {errors.phoneNumber && <Text style={styles.error}>{errors.phoneNumber}</Text>}
             <Button  title="Submit" onPress={handleSubmit} />
             </KeyboardAvoidingView>
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