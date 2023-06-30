import { View, Text,StyleSheet,Alert,ScrollView} from 'react-native'
import React,{useState, useContext} from 'react'
import { Input, Icon,Button } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {passwordSchema,} from '../../utils/validation/validationSchemas'
import { MainContext } from '../../context/ContextProvider';
import { ThemeContext } from '../../context/ThemeContext';
import CustomButton from '../../Components/uiComponents/CustomButton';
import CustomSlide from '../../Components/uiComponents/CustomSlide';
import Toast from 'react-native-toast-message';
export default function EditPassword() {
  const [oldPasswordSecure, setOldPasswordSecure] = useState(true)
  const [newPasswordSecure, setNewPasswordSecure] = useState(true)
  const [repeatPasswordSecure, setRepeatPasswordSecure] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
  const [slideMessage, setSlideMessage] = useState('');
  const [slideStatus, setSlideStatus] = useState('error');;
  const {updateUserPassword, showToast} = useContext(MainContext);
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
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
  const [isUpdated, message] = await updateUserPassword(values.currentPassword, values.newPassword)
  const [messageToast,statusToast,headerToast] = isUpdated? [`${message}`,'success','Updated Successfully 👋']:[message,'error','Update failed'];
  showToast(messageToast,statusToast,headerToast);
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
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
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}

            leftIcon={{type:'ionicon',color:text.primary, name: 'lock-closed-outline'}}
           rightIcon={{type:'ionicon',color:text.primary, name : oldPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setOldPasswordSecure(!oldPasswordSecure)}}
            placeholder="Enter current password"
          />
          {errors.currentPassword && <Text style={styles.error}>{errors.currentPassword}</Text>}

          <Input
            onChangeText={handleChange('newPassword')}
            value={values.newPassword}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            secureTextEntry={newPasswordSecure}
            leftIcon={{type:'ionicon', name: 'lock-closed-outline',color:text.primary}}
            rightIcon={{type:'ionicon',color:text.primary, name : newPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setNewPasswordSecure(!newPasswordSecure)}}
            placeholder="Enter new password"
          />
          {errors.newPassword && <Text style={styles.error}>{errors.newPassword}</Text>}

          <Input
            onChangeText={handleChange('repeatPassword')}
            value={values.repeatPassword}
            secureTextEntry={repeatPasswordSecure}
            leftIcon={{type:'ionicon',color:text.primary, name: 'lock-closed-outline'}}
            rightIcon={{type:'ionicon',color:text.primary, name : repeatPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setRepeatPasswordSecure(!repeatPasswordSecure)}}
            inputStyle={styles.input}
            placeholder="Repeat new password"
            inputContainerStyle={styles.inputContainer}

          />
          {errors.repeatPassword && <Text style={styles.error} >{errors.repeatPassword}</Text>}

          <View style={styles.bottomContainer}>
             <CustomButton type='main' onPress={handleSubmit} title={'Submit'} />
             </View>

        </View>
      )}
    </Formik>
      </ScrollView>
      <Toast/>
    </View>
  )
}
const createStyles = (primary,secondary,text,background) =>  StyleSheet.create({
  scroll:{
    flexGrow: 1,
    padding: 10,
  },
  container:{
    width: '100%',
    height: '100%',
    padding:20,
  },
  error:{
    marginTop: -20,
    marginBottom: 5,
    color: 'red',
    fontSize: 13,
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
  input:{
    color:text.primary,
  },
});

