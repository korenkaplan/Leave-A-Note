import { View, Text,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { Input, Icon,Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {passwordSchema,} from '../../utils/validation/validationSchemas'
export default function EditPassword() {
  const [oldPasswordSecure, setOldPasswordSecure] = useState(true)
  const [newPasswordSecure, setNewPasswordSecure] = useState(true)
  const [repeatPasswordSecure, setRepeatPasswordSecure] = useState(true)
  const [isValid, setIsValid] = useState(false)
 

 
  const validationSchema = Yup.object().shape({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    repeatPassword: Yup.string()
      .required('Repeat password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match')
  });

    /**
  Handle the sbumit check if the password matches the current password in the database
 */
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
      initialValues={{ currentPassword: '', newPassword: '', repeatPassword: '' }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleSubmit, values, errors,resetForm }) => (
        <View>
          <Input
            onChangeText={handleChange('currentPassword')}
            value={values.currentPassword}
            secureTextEntry={oldPasswordSecure}
            leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
           rightIcon={{type:'ionicon', name : oldPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setOldPasswordSecure(!oldPasswordSecure)}}
            placeholder="Enter current password"
          />
          {errors.currentPassword && <Text style={styles.error}>{errors.currentPassword}</Text>}

          <Input
            onChangeText={handleChange('newPassword')}
            value={values.newPassword}
            secureTextEntry={newPasswordSecure}
            leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
            rightIcon={{type:'ionicon', name : newPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setNewPasswordSecure(!newPasswordSecure)}}
            placeholder="Enter new password"
          />
          {errors.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}

          <Input
            onChangeText={handleChange('repeatPassword')}
            value={values.repeatPassword}
            secureTextEntry={repeatPasswordSecure}
            leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
            rightIcon={{type:'ionicon', name : repeatPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setRepeatPasswordSecure(!repeatPasswordSecure)}}
            placeholder="Repeat new password"
          />
          {errors.repeatPassword && <Text style={styles.error} >{errors.repeatPassword}</Text>}

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
    padding:20,
  },
  error:{
    color:'red'
  }
});

