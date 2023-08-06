import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React, {useState, useContext, useRef} from 'react';
import {Input} from '@rneui/themed';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {passwordSchema} from '../../utils/validation/validationSchemas';
import {MainContext} from '../../context/ContextProvider';
import {ThemeContext} from '../../context/ThemeContext';
import CustomButton from '../../Components/uiComponents/CustomButton';
import DropdownAlert from 'react-native-dropdownalert';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
import CustomSpinner from '../../Components/uiComponents/CustomSpinner';
export default function EditPassword() {
    // Access required state and context
  let dropDownAlertRef = useRef();
  const [oldPasswordSecure, setOldPasswordSecure] = useState(true);
  const [newPasswordSecure, setNewPasswordSecure] = useState(true);
  const [repeatPasswordSecure, setRepeatPasswordSecure] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const {updateUserPassword} = useContext(MainContext);
  const {theme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const styles = createStyles(primary, secondary, text, background);

  // Define validation rules for password fields
  const validationSchema = Yup.object().shape({
    currentPassword: passwordSchema,
    newPassword: passwordSchema.notOneOf(
      [Yup.ref('currentPassword')],
      'New password cannot be the same as the old password',
    ),
    repeatPassword: Yup.string()
      .required('Repeat password is required')
      .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
  });
  /**
  Handle the submit check if the password matches the current password in the database
 */
  const handleFormSubmit = async (values, {resetForm, setFieldError}) => {
    setIsLoading(true);

    const [isUpdated, message] = await updateUserPassword(
      values.currentPassword,
      values.newPassword,
    );
    setIsLoading(false);
    const [messageToast, statusToast, headerToast] = isUpdated
      ? [`${message}`, 'success', 'Updated Successfully 👋']
      : [message, 'error', 'Update failed'];
    dropDownAlertRef.alertWithType(statusToast, headerToast, messageToast);
  };
  return (
    <View style={styles.container}>
      <DividerWithText fontSize={20} title="Edit Your Password" />
      <ScrollView style={styles.scroll}>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            repeatPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}>
          {({handleChange, handleSubmit, values, errors, resetForm}) => (
            <View>
              <Input
                onChangeText={handleChange('currentPassword')}
                value={values.currentPassword}
                secureTextEntry={oldPasswordSecure}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholderTextColor={text.primary}
                leftIcon={{
                  type: 'ionicon',
                  color: text.primary,
                  name: 'lock-closed-outline',
                }}
                rightIcon={{
                  type: 'ionicon',
                  color: text.primary,
                  name: oldPasswordSecure ? 'eye-off-outline' : 'eye-outline',
                  onPress: () => setOldPasswordSecure(!oldPasswordSecure),
                }}
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <Text style={styles.error}>{errors.currentPassword}</Text>
              )}

              <Input
                onChangeText={handleChange('newPassword')}
                value={values.newPassword}
                inputContainerStyle={styles.inputContainer}
                placeholderTextColor={text.primary}
                inputStyle={styles.input}
                secureTextEntry={newPasswordSecure}
                leftIcon={{
                  type: 'ionicon',
                  name: 'lock-closed-outline',
                  color: text.primary,
                }}
                rightIcon={{
                  type: 'ionicon',
                  color: text.primary,
                  name: newPasswordSecure ? 'eye-off-outline' : 'eye-outline',
                  onPress: () => setNewPasswordSecure(!newPasswordSecure),
                }}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <Text style={styles.error}>{errors.newPassword}</Text>
              )}

              <Input
                onChangeText={handleChange('repeatPassword')}
                value={values.repeatPassword}
                placeholderTextColor={text.primary}
                secureTextEntry={repeatPasswordSecure}
                leftIcon={{
                  type: 'ionicon',
                  color: text.primary,
                  name: 'lock-closed-outline',
                }}
                rightIcon={{
                  type: 'ionicon',
                  color: text.primary,
                  name: repeatPasswordSecure
                    ? 'eye-off-outline'
                    : 'eye-outline',
                  onPress: () => setRepeatPasswordSecure(!repeatPasswordSecure),
                }}
                inputStyle={styles.input}
                placeholder="Repeat new password"
                inputContainerStyle={styles.inputContainer}
              />
              {errors.repeatPassword && (
                <Text style={styles.error}>{errors.repeatPassword}</Text>
              )}

              <View style={styles.bottomContainer}>
                <CustomButton
                  type="main"
                  onPress={handleSubmit}
                  title={'Submit'}
                />
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
      <DropdownAlert
        ref={ref => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      <CustomSpinner isVisible={isLoading} title="updating password..." />
    </View>
  );
}
const createStyles = (primary, secondary, text, background) =>
  StyleSheet.create({
    scroll: {
      flexGrow: 1,
      padding: 10,
    },
    container: {
      width: '100%',
      height: '100%',
    },
    error: {
      marginTop: -20,
      marginBottom: 5,
      color: 'red',
      fontSize: 13,
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
