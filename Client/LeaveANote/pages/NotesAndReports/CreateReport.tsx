/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  name: string;
}

const CreateReport: React.FC<Props> = ({name}) => {
  return (
    <View>
      <Text>Hello, {name}!</Text>
    </View>
  );
};

export default CreateReport;
