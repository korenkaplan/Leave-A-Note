import { Avatar, Divider, Input, Text } from '@rneui/base';
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../../context/ContextProvider';
import { Chip, CheckBox } from '@rneui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { ReportToSend, IText,StyleButton} from '../../utils/interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
import DividerWithText from '../../Components/uiComponents/DividerWithText';

interface Params {
  image: string;
}

interface Props {
  route: RouteProp<Record<string, Params>, string>;
  navigation: StackNavigationProp<Record<string, object>, string>;
}

const CreateReport: React.FC<Props> = ({ route, navigation }) => {
  // get variables from route, context and set states
  const { image } = route.params;
  const { setCarNumInput, submitReport, uploadPhotoToStorage } = useContext(MainContext);
  //states
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(true); // toggle Submit btn if an image is taken.
  const [isChecked, setIsChecked] = useState<boolean>(false); // toggle the checkbox value
  const [imgSource, setImgSource] = useState<string>('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'); // the image source starts with en empty iamge
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false); // holds the boolean value if the keyboard is open or not
  const enum Size { AvatarBig = 250, AvatarSmall = 150, AvatarAccessoryBig = 60, AvatarAccessorySmall = 40 };// enum for sizes of the avatar when the keyboard is open / closed
  const {theme,buttonTheme} = useContext(ThemeContext);
  const {buttonMain,buttonAlt}= buttonTheme;
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background,buttonMain,buttonAlt)
  // create the schema for the values object of formik
  type Values = {
    damagedCarNumber: string,
    hittingCarNumber: string,
  }
  // useEffect to listen when the keyboard is open and closed and update the state(to shrink the image )
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardOpen(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOpen(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  // useEffect on image to set the image when returning from camera
  useEffect(() => {
    if (image) {
      setImgSource(image);
      setDisableSendBtn(false);
    }
  }, [image]);
  //function to open the camera component
  const openCamera = (): void => {
    navigation.navigate({
      name: 'CameraComp',
      params: { 'previous': 'CreateReport' },
    });
  };
  //create the alert for succesfully sending a report
  const successAlert = (carNumInput: string) =>{
    const title = 'Report  Sent Successfully';
    const alertBody = `Your report was deliverd to the owner of car number ${carNumInput}`;
 Alert.alert(title, alertBody, [
    {
    
      text: 'Back Home',
      onPress: () => navigation.navigate('Home'),
      style: 'default',
    },
   ]); } 
   const failureAlert = (carNumInput: string) =>{
    const title = 'Report wasn\'t Sent Successfully';
    const alertBody =  `Your report wasn\'t deliverd to the owner of car number ${carNumInput}`;
 Alert.alert(title, alertBody, [
    {
    
      text: 'Back Home',
      onPress: () => navigation.navigate('Home'),
      style: 'default',
    },
    {
      text: 'Try Again',
      style: 'cancel',
    },
   ]); }
  // handle the submit: cal function from context and show alert
  const handleFormSubmit = async (values: Values): Promise<void> => {
    try {
      const imageRef: string = await uploadPhotoToStorage(imgSource);
      let report: ReportToSend = {
        imageUrl: imageRef,
        damagedCarNumber: values.damagedCarNumber,
        hittingCarNumber: values.hittingCarNumber,
        isAnonymous: isChecked,
      };
      const isSent = await submitReport(report);
      //show alert
      isSent? successAlert(values.damagedCarNumber): failureAlert(values.damagedCarNumber);
      //reset car number in context and clear fields
      setCarNumInput('');
    }
    catch (error: any) {
      console.log(error.message);
    }
  };
  const toggleCheckbox = () => setIsChecked(!isChecked);
  //create the validation schema for a car number input.
  const carNumberValidationSchema = Yup.string()
    .required('Car number is required')
    .matches(/^[0-9]{7,8}$/, 'Invalid Car number');

  // create the validation schema for the form fields
  const validationSchema = Yup.object().shape({
    damagedCarNumber: carNumberValidationSchema,
    hittingCarNumber: carNumberValidationSchema.notOneOf(
      [Yup.ref('damagedCarNumber')],
      'Both car numbers cannot be identical'
    ),
  });
  return (
    <View style={styles.MainContainer}>
      <View style={styles.topContainer}>
        <Avatar
          size={keyboardOpen ? Size.AvatarSmall : Size.AvatarBig}
          rounded
          source={{ uri: imgSource }}
          containerStyle={styles.avatar}
        >
          <Avatar.Accessory
            size={keyboardOpen ? Size.AvatarAccessorySmall : Size.AvatarAccessoryBig}
            name="camera"
            onPress={openCamera}
            color={buttonMain.text}
            style={styles.avatarAccessory}
          />

        </Avatar>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.bottomContainer}>
        <Formik
          initialValues={{ damagedCarNumber: '', hittingCarNumber: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleChange, handleSubmit, values, errors, resetForm }) => (
            <View>
              <Input
                onChangeText={handleChange('damagedCarNumber')}
                value={values.damagedCarNumber}
                leftIcon={{ type: 'ionicon', name: 'car', color: text.primary }}
                placeholder="Enter Damaged Car Number"
                keyboardType="numeric"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}

              />
              {errors.damagedCarNumber && <Text style={styles.error}>{errors.damagedCarNumber}</Text>}

              <Input
                onChangeText={handleChange('hittingCarNumber')}
                value={values.hittingCarNumber}
                leftIcon={{ type: 'ionicon', name: 'car', color: text.primary }}
                placeholder="Enter Hitting Car Number"
                keyboardType="numeric"
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}

              />
              {errors.hittingCarNumber && <Text style={styles.error}>{errors.hittingCarNumber}</Text>}
              <CheckBox
                title="Remain Anonymous"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={isChecked}
                onPress={toggleCheckbox}
                containerStyle={{ backgroundColor: primary }}
                titleProps={{ style: { color: text.primary, marginLeft: 10, } }} // Specify the desired color for the title text
              />


              <Chip
                disabled={disableSendBtn}
                disabledStyle={styles.disableBtn}
                title={disableSendBtn ? 'Add Photo' : 'Send Report'}
                color={'primary'}
                icon={{
                  name: 'paper-plane',
                  type: 'font-awesome',
                  size: 20,
                  color: 'white',
                }}
                onPress={()=>handleSubmit()}
                type="outline"
                containerStyle={styles.sendBtn}
                titleStyle={styles.sendBtnTitle} // Add this line
              />
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const createStyles = (primary: string, secondary: string, text: IText, background: string,buttonMain:StyleButton,buttonAlt: StyleButton) =>
  StyleSheet.create({
    error: {
      color: 'red',
    },
    inputContainer: {
      borderWidth: 1,
      borderColor: text.primary,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    input: {
      color: text.primary,
    },

    disableBtn: {
      backgroundColor: 'lightgray',
    },
    sendBtn: {
      backgroundColor: primary,
      alignSelf: 'center',
      minWidth: '50%',
    },
    sendBtnTitle: {
      color: text.primary,
    },
    bottomContainer: {
      flex: 1,
      backgroundColor:primary,
      paddingTop: 10
    },

    divider: {
      height: 15,
      shadowColor: text.primary,
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    avatar: {
      alignSelf: 'center',
      borderColor: primary,
      borderWidth: 5,
    },
    avatarAccessory: {
      backgroundColor: primary,
    },
    topContainer: {
      height: '40%',
      width: '100%',
      justifyContent: 'center',
    },
    CameraComp: {
      flex: 1,
    },
    MainContainer: {
      flex: 1,
      backgroundColor: background,
    },

  });

export default CreateReport;
