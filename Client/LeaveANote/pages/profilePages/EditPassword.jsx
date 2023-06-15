import { View, Text,StyleSheet,Alert} from 'react-native'
import React,{useState, useContext} from 'react'
import { Input, Icon,Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {passwordSchema,} from '../../utils/validation/validationSchemas'
import { MainContext } from '../../context/ContextProvider';
export default function EditPassword() {
  const [oldPasswordSecure, setOldPasswordSecure] = useState(true)
  const [newPasswordSecure, setNewPasswordSecure] = useState(true)
  const [repeatPasswordSecure, setRepeatPasswordSecure] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const {updateUserPassword} = useContext(MainContext);

 
  const validationSchema = Yup.object().shape({
    currentPassword: passwordSchema,
    newPassword: passwordSchema.notOneOf([Yup.ref('currentPassword')], 'New password cannot be the same as the old password'),
    repeatPassword: Yup.string()
      .required('Repeat password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });
    /**
  Handle the submit check if the password matches the current password in the database
 */
  const handleFormSubmit = async (values, { resetForm, setFieldError }) => {

      const result = await updateUserPassword(values.currentPassword, values.newPassword)
      switch (result) {
        case 0:
          {
            Alert.alert('successfully changed password')
            resetForm();
            break;
          }
          case 1:
            {
              setFieldError('currentPassword','password is incorrect')
              break;
            }
            case 2:
              {
                Alert.alert('There was a problem try again later..')
              }
      }

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

