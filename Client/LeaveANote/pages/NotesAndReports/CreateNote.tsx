import { Avatar} from '@rneui/base';
import React, { useState,useEffect,useContext } from 'react';
import { View,StyleSheet, Alert} from 'react-native';
import {RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MainContext } from '../../context/ContextProvider';
import { Chip } from '@rneui/themed';
import { NoteToSend, IText,StyleButton} from '../../utils/interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
import SuccessModal from '../../Components/uiComponents/SuccessModal';
import FailedModal from '../../Components/uiComponents/FailedModal';
import CustomSpinner from '../../Components/uiComponents/CustomSpinner';
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
  const {theme,buttonTheme} = useContext(ThemeContext);
  const {buttonMain,buttonAlt}= buttonTheme;
  const [isLoading, setIsLoading] = useState(false)
  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false)
  const [isVisibleFailedModal, setIsVisibleFailedModal] = useState(false)
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background,buttonMain,buttonAlt)

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

const handleSubmit = async ():Promise<void> =>{
  setIsLoading(true)
   const imageRef: string = await uploadPhotoToStorage(imgSource);
  console.log(imageRef);
    
    let note: NoteToSend = {
      damagedCarNumber: carNumInput,
      imageSource: imageRef,
    };
      // send to context function the image url
  const isSent = await submitNote(note);
  setIsLoading(false)
  isSent ? setIsVisibleSuccessModal(true) : setIsVisibleFailedModal(true);

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
      <View style={styles.bottomContainer}>
      <DividerWithText height={2} fontSize={20}  title ={disableSendBtn?'Take  📸 and send the note':'great now hit the send button'}/>
      <View >
      <Chip
  title={`Car Number ${carNumInput}`}
  icon={{
    name: 'car',
    type: 'font-awesome',
    size: 20,
    color: text.primary,
  }}
  color={background}
  containerStyle={styles.chip}
  titleStyle={styles.chipTitle}
/>

          <Chip
          disabled={disableSendBtn}
          disabledStyle={styles.disableBtn}
  title={disableSendBtn?'Add Photo' : 'Send Report'}
  icon={{
    name: 'paper-plane',
    type: 'font-awesome',
    size: 20,
    color: disableSendBtn? 'gray':buttonMain.text,
  }}
  onPress={handleSubmit}
  type="outline"
  containerStyle={styles.sendBtn}
           titleStyle={styles.sendBtnTitle} // Add this line
/>
  </View>
      </View>
      <SuccessModal body={`Your note was delivered to the owner of ${carNumInput} `} onSwipe={()=>navigation.navigate('Home')} isVisible={isVisibleSuccessModal}/>
      <FailedModal  body={`Oops its looks like we have a problem try again later...`} onSwipe={()=>navigation.navigate('Home')} footerTitle='swipe home' isVisible={isVisibleFailedModal}/>
      <CustomSpinner title='creating note' isVisible={isLoading} />
    </View>
  );
};

const createStyles = (primary: string, secondary: string, text: IText, background: string,buttonMain:StyleButton,buttonAlt:StyleButton) =>  StyleSheet.create({
  disableBtn:{
    backgroundColor:'lightgray',
    borderColor: text.primary,


  },
  sendBtn: {
    backgroundColor: buttonMain.background,
    alignSelf: 'center',
    minWidth: '50%',
    // borderColor: text.primary,
    // borderWidth: 2,


  },
  sendBtnTitle: {
    color: buttonMain.text,
  },
  bottomContainer:{
    flex:1,
    backgroundColor:background,
    
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
