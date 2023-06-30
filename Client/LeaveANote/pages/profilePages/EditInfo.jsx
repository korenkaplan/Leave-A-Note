import {View, Text, StyleSheet, Alert,ScrollView} from 'react-native';
import React, {useState, useContext, useRef} from 'react';
import {Input} from '@rneui/themed';
import {MainContext} from '../../context/ContextProvider';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  nameSchema,
  carNumberSchema,
  phoneNumberSchema,
  emailSchema,
} from '../../utils/validation/validationSchemas';
import ThemedView from '../../Components/uiComponents/ThemedView';
import {ThemeContext} from '../../context/ThemeContext';
import CustomButton from '../../Components/uiComponents/CustomButton';
import Toast from 'react-native-toast-message';
import DropdownAlert from 'react-native-dropdownalert';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
export default function EditInfo() {
  let dropDownAlertRef = useRef();
  const {theme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const styles = createStyles(primary, secondary, text, background);
  const {updateUserInformation} =useContext(MainContext);
  const validationSchema = Yup.object().shape({
    name: nameSchema,
    carNumber: carNumberSchema,
    phoneNumber: phoneNumberSchema,
    email: emailSchema,
  });
  const {currentUser} = useContext(MainContext);
  const handleFormSubmit = async (values, { resetForm }) => {
    const [isUpdated, message] = await updateUserInformation(values);
    const [messageToast,statusToast,headerToast] = isUpdated? [`${message}`,'success','Updated Successfully 👋']:[message,'error','Update failed'];
    dropDownAlertRef.alertWithType(statusToast, headerToast, messageToast);
    //showToast(messageToast,statusToast,headerToast);
    console.log(values);

    // setSlideMessage(message);
    // setSlideStatus(isUpdated ? 'success' : 'error');
    // showSlide()
  };
  const showToast =  (message , status,header) => {
    console.log('showToast  ');
    Toast.show({
     type: status,
     text1:  header,
     text2: message,
   });
 }
  return (
    <ThemedView>
      <DividerWithText  fontSize={20} title='Edit Personal Information'/>
      <ScrollView style={styles.scroll}>
      <Formik
        initialValues={{
          name: currentUser.name,
          carNumber: currentUser.carNumber,
          phoneNumber: currentUser.phoneNumber,
          email: currentUser.email,
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}>
        {({handleChange, handleSubmit, values, errors, resetForm}) => (
          <View style={styles.container}>
            <Input
              onChangeText={handleChange('name')}
              value={values.name}
              leftIcon={{
                type: 'ionicon',
                name: 'person-outline',
                color: text.primary,
              }}
              placeholder="Name"
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.input}
            />
            {errors.name && <Text style={styles.error}>{errors.name}</Text>}

            <Input
              onChangeText={handleChange('carNumber')}
              value={values.carNumber}
              leftIcon={{
                type: 'ionicon',
                name: 'car-outline',
                color: text.primary,
              }}
              placeholder="Car Number"
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="numeric"
            />
            {errors.carNumber && (
              <Text style={styles.error}>{errors.carNumber}</Text>
            )}

            <Input
              onChangeText={handleChange('phoneNumber')}
              value={values.phoneNumber}
              leftIcon={{
                type: 'ionicon',
                name: 'phone-portrait-outline',
                color: text.primary,
              }}
              placeholder="Phone Number"
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="numeric"
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.phoneNumber}</Text>
            )}
            <Input
              onChangeText={handleChange('email')}
              value={values.email}
              leftIcon={{
                type: 'ionicon',
                name: 'mail-outline',
                color: text.primary,
              }}
              placeholder="Email Address"
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              keyboardType="email-address"
            />
            {errors.phoneNumber && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <View style={styles.bottomContainer}>
              <CustomButton
               type='main'
                onPress={handleSubmit}
                title={'Submit'}
              />
            </View>
          </View>
        )}
      </Formik>
</ScrollView>
   <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
    </ThemedView>
  );
}
const createStyles = (primary, secondary, text, background) =>
  StyleSheet.create({
    error: {
      marginTop: -20,
      marginBottom: 5,
      color: 'red',
      fontSize: 13,
    },
    scroll:{
      flexGrow: 1,
      padding: 10,
    },
    container: {
      width: '100%',
      height: '100%',
      padding: 20,
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: text.primary,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    bottomContainer: {
      width: '100%',
      alignItems: 'center',
    },
    submitBtn: {
      backgroundColor: secondary,
      borderColor: text.primary,
      borderWidth: 1,
      borderRadius: 10,
    },
    input: {
      color: text.primary,
    },
  });
