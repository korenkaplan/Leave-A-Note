/* eslint-disable prettier/prettier */
import { Button } from '@rneui/themed';
import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  name: string;
}

const CreateReport: React.FC<Props> = ({name , navigation}) => {

  const openCamera = ()=>{
    navigation.navigate({
      name:'CameraComp',
    });
  };
  return (
    <View>
      <Button onPress={openCamera} title={'camera'}/>
    </View>
  );
};

export default CreateReport;
