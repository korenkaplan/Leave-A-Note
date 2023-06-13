/* eslint-disable prettier/prettier */
import { Avatar, Divider, Input, Text } from '@rneui/base';
import React, { useState,useEffect,useContext } from 'react';
import { View,StyleSheet, Alert, Keyboard} from 'react-native';
import {RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../../context/ContextProvider';
import { Chip, CheckBox  } from '@rneui/themed';
import { Formik} from 'formik';
import * as Yup from 'yup';
interface Params {
  carNumber: string;
  image: string;
}

interface Props {
  route: RouteProp<Record<string, Params>, string>;
  navigation: StackNavigationProp<Record<string, object>, string>;
}

const CreateReport: React.FC<Props> = ({ route, navigation }) => {
  // get variables from route, context and set states
  const { carNumber, image } = route.params;
  const { carNumInput,submitReport} = useContext(MainContext);
  //states
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(true); // toggle Submit btn if an image is taken.
  const [isChecked, setIsChecked] = useState<boolean>(false); // toggle the checkbox value
  const [imgSource, setImgSource] = useState<string>('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg'); // the image source starts with en empty iamge
  const enum Size {AvatarBig = 250, AvatarSmall =150,AvatarAccessoryBig =60, AvatarAccessorySmall =40};// enum for sizes of the avatar when the keyboard is open / closed
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>(false); // holds the boolean value if the keyboard is open or not
  type Report ={
    imageUrl: string,
    damagedCarNumber: string,
    hittingCarNumber: string,
    date: string,
    isAnonymous: boolean,
  }
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
  const openCamera = ():void => {
    navigation.navigate({
      name:'CameraComp',
      params:{'previous':'CreateReport'},
    });
  };
  //create the alert for succesfully sending a report
  const createTwoButtonAlert = (carNumberToShow: string): void => {
 Alert.alert('Note Sent Successfully', `Your Note was deliverd to the owner of car number ${carNumberToShow}`, [
    {
      text: 'Back Home',
      onPress: () => navigation.navigate('Home'),
      style: 'default',
    }
   ]); };
 
 // handle the submit: cal function from context and show alert
const handleFormSubmit = async (values: Values,{ resetForm }):Promise<void> =>{
  try {
    let report: Report = {
      imageUrl: imgSource,
      damagedCarNumber: values.damagedCarNumber,
      hittingCarNumber: values.hittingCarNumber,
      date: new Date().toLocaleDateString('en-GB'),
      isAnonymous: isChecked,
    };
    await submitReport(report);

    // Clear the form inputs
    resetForm();
    //show alert
    createTwoButtonAlert(values.damagedCarNumber);
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
      <View  style={styles.topContainer}>
        <Avatar
  size={keyboardOpen ? Size.AvatarSmall : Size.AvatarBig}
  rounded
  source={{ uri: imgSource }}
  containerStyle={styles.avatar}
>
  <Avatar.Accessory
     size={keyboardOpen ? Size.AvatarAccessorySmall : Size.AvatarAccessoryBig}
    name="camera"
    onPress={openCamera }
    style={styles.avatarAccessory}
  />
  
</Avatar>
      </View>
      <Divider style={styles.divider}/>
      <View style={styles.bottomContainer}>
        <Formik
        initialValues={{damagedCarNumber: carNumber, hittingCarNumber: ''}}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        >
      {({ handleChange, handleSubmit, values, errors,resetForm }) => (
        <View>
          <Input
            onChangeText={handleChange('damagedCarNumber')}
            value={values.damagedCarNumber}
            leftIcon={{type:'ionicon', name: 'car'}}
            placeholder="Enter Damaged Car Number"

          />
          {errors.damagedCarNumber && <Text style={styles.error}>{errors.damagedCarNumber}</Text>}

          <Input
            onChangeText={handleChange('hittingCarNumber')}
            value={values.hittingCarNumber}
            leftIcon={{type:'ionicon', name: 'car'}}
            placeholder="Enter Hitting Car Number"
          />
          {errors.hittingCarNumber && <Text style={styles.error}>{errors.hittingCarNumber}</Text>}
          <CheckBox
                center
                title="Remain Anonymous"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={isChecked}
                onPress={toggleCheckbox}
              />

          <Chip
          disabled={disableSendBtn}
          disabledStyle={styles.disableBtn}
  title={disableSendBtn?'Add Photo' : 'Send Report'}
  color={'primary'}
  icon={{
    name: 'paper-plane',
    type: 'font-awesome',
    size: 20,
    color: 'white',
  }}
  onPress={handleSubmit}
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

const styles = StyleSheet.create({
  error:{
    color:'red',
  },
  disableBtn:{
    backgroundColor:'lightgray',
  },
  sendBtn: {
    backgroundColor: 'purple',
    alignSelf:'center',
    minWidth:'50%',
  },
  sendBtnTitle: {
    color: 'white',
  },
  bottomContainer:{
    flex:1,
  },
  chip: {
    margin:30,
 alignSelf:'center',
 color:'purple',
  },
  chipTitle: {
    color: 'purple',
  },
  divider: {
    height: 5,
    shadowColor: 'purple',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar:{
    alignSelf: 'center',
    borderColor:'purple',
    borderWidth:5,
  },
  avatarAccessory:{
backgroundColor:'purple',
  },
  topContainer:{
    height:'40%',
    width:'100%',
    justifyContent: 'center',
  },
  CameraComp: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
  },

});

export default CreateReport;
