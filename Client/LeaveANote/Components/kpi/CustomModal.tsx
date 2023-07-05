/* eslint-disable prettier/prettier */
import { Button } from 'native-base';
import React, { useState } from 'react';
import {View} from 'react-native';
import { Modal, ModalContent,ModalTitle,ModalFooter, ModalButton} from'react-native-modals'
import {startCase} from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { IModalButton } from '../../utils/interfaces/interfaces';
import { Text } from '@rneui/base';


import animationData from '../../assets/lottie.Animation/success.json';
import LottieView from 'lottie-react-native';

interface Props {
  title: string;
  body: string;
  buttons:IModalButton[]
}
const CustomModal: React.FC<Props> = ({title, body,buttons}) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(true)
  console.log(isVisible);
  const footerButtons = buttons.map(button =>{
    return(
      <ModalButton text={button.title} onPress={()=>navigation.navigate({name:button.navigateTo,params:{}})}/>
    )
  })
  return (
    <View>
      <Modal
          visible={isVisible}
          modalStyle={{ width:'80%' }}
          swipeDirection={['up', 'down','left','right']} // can be string or an array
          swipeThreshold={200} // default 100
          onSwipeOut={() => {
            setIsVisible(false)
          }}
          modalTitle={<ModalTitle title={startCase(title)}/>}
          footer={
            <ModalFooter style={{justifyContent:'center',alignItems:'center',height:70}} >
             <ModalButton  text={startCase('Swipe to close')}/>
            </ModalFooter>
          }
      >
        <ModalContent style={{ justifyContent:'center',alignItems:'center'}}>
            <LottieView style={{width:200, height:100}} speed={0.8} source={animationData} loop={false}  autoPlay  style={{width:'80%'}} />
            <Text h4Style={{fontSize:16,textAlign:'center'}} h4 >{body}</Text>

        </ModalContent>
      </Modal>
      <Button onPress={()=>{setIsVisible(!isVisible)}}>Show Model</Button>
    </View>
  );
};

export default CustomModal;
