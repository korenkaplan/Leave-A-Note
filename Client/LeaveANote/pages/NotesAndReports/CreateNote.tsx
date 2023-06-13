/* eslint-disable prettier/prettier */
import { Avatar, Divider  } from '@rneui/base';
import React, { useState,useEffect,useContext } from 'react';
import { View,StyleSheet, Alert} from 'react-native';
import {RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../../context/ContextProvider';
import { Chip } from '@rneui/themed';
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
  const { carNumInput,submitNote} = useContext(MainContext);
  const [disableSendBtn, setDisableSendBtn] = useState<boolean>(true)
  const [imgSource, setImgSource] = useState<string>('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg');

  type Note ={
    damagedCarNumber: string,
    imageSource: string,
    date: string,
  }
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
  const createTwoButtonAlert = () =>{
 Alert.alert('Note Sent Successfully', `Your Note was deliverd to the owner of car number ${carNumInput}`, [
    {
      text: 'Back Home',
      onPress: () => navigation.navigate('Home'),
      style: 'default',
    }
   ]); } 
 
 
const handleSubmit = async ():Promise<void> =>{
  try
  {
    let note: Note = {
      damagedCarNumber: carNumInput,
      imageSource: imgSource,
      date: new Date().toLocaleDateString('en-GB'),
    }
      // send to context function the image url
  await submitNote(note);
  //show dialog
  createTwoButtonAlert();
  }
    catch(error)
    {
      console.log(error);
    }
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
              color: 'purple',
            }}
            type="outline"
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

const styles = StyleSheet.create({
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
    height:'50%',
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

export default CreateNote;
