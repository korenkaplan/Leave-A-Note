import { Avatar, Button, Divider  } from '@rneui/base';
import React, { useState,useEffect,useContext } from 'react';
import { View,StyleSheet, Alert} from 'react-native';
import {RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../../context/ContextProvider';
import { Chip } from '@rneui/themed';
import { NoteToSend, Text} from '../../utils/interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
interface Params {
  carNumber: string;
  image: string;
}
interface Props {
  route: RouteProp<Record<string, Params>, string>;
  navigation: StackNavigationProp<Record<string, object>, string>;
}
const CreateNote: React.FC<Props> = ({ route, navigation }) => {
  const { carNumber, image } = route.params;
  const { carNumInput,submitNote, uploadPhotoToStorage} = useContext(MainContext);
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(true)
  const [imgSource, setImgSource] = useState<string>('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg');
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)

  useEffect(() => {
    if (image) {
      setImgSource(image);
      setDisableSendBtn(false);
    }
  }, [image]);

  const openCamera = ():void => {
    navigation.navigate({
      name:'CameraComp',
      params:{'previous':'CreateNote'},
    });
  };
  const successAlert = () =>{
    const title = 'Note  Sent Successfully';
    const alertBody = `Your Note was deliverd to the owner of car number ${carNumInput}`;
 Alert.alert(title, alertBody, [
    {
    
      text: 'Back Home',
      onPress: () => navigation.navigate('Home'),
      style: 'default',
    },
   ]); } 
   const failureAlert = () =>{
    const title = 'Note wasn\'t Sent Successfully';
    const alertBody =  `Your Note wasn\'t deliverd to the owner of car number ${carNumInput}`;
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
const handleSubmit = async ():Promise<void> =>{

   const imageRef: string = await uploadPhotoToStorage(imgSource);
  console.log(imageRef);
    
    let note: NoteToSend = {
      damagedCarNumber: carNumInput,
      imageSource: imageRef,
    };
      // send to context function the image url
  const isSent = await submitNote(note);
  
  //show dialog
    isSent?  successAlert() : failureAlert();

};

  return (
    <View style={styles.MainContainer}>
      <View  style={styles.topContainer}>
        <Avatar
  size={300}
  rounded
  source={{ uri: imgSource }}
  containerStyle={styles.avatar}
>
  <Avatar.Accessory
    size={60}
    name="camera"
    onPress={openCamera }
    style={styles.avatarAccessory}
  />
  
</Avatar>
      </View>
      <Divider style={styles.divider}/>
      <View style={styles.bottomContainer}>
      <View >
      <Chip
  title={`Car Number ${carNumInput}`}
  icon={{
    name: 'car',
    type: 'font-awesome',
    size: 20,
    color: text.primary,
  }}
  color={secondary}
  containerStyle={styles.chip}
  titleStyle={styles.chipTitle}
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
      </View>
    </View>
  );
};

const createStyles = (primary: string, secondary: string, text: Text, background: string) =>  StyleSheet.create({
  disableBtn:{
    backgroundColor:'lightgray',
  },
  sendBtn: {
    backgroundColor: primary,
    alignSelf: 'center',
    minWidth: '50%',
  },
  sendBtnTitle: {
    color: text.primary,
  },
  bottomContainer:{
    flex:1,
  },
  chip: {
    margin: 30,
    alignSelf: 'center',
    borderColor: text.primary,
    borderWidth: 2,
  },
  
  chipTitle: {
    color: text.primary,
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
  avatar: {
    alignSelf: 'center',
    borderColor: primary,
    borderWidth: 5,
  },
  avatarAccessory: {
    backgroundColor: primary,
    borderColor: text.primary,
    borderWidth: 2,
  },
  topContainer:{
    height:'50%',
    width:'100%',
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

export default CreateNote;
