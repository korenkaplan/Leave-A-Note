import React from 'react';
import { Input, Icon, Stack, Pressable,View, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const InputWithIcons = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Ionicons name="ios-person" size={24} color="black" style={{ marginHorizontal: 10 }} />
      <TextInput
        style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10 }}
        placeholder="Username"
      />
      <Ionicons name="ios-lock-closed" size={24} color="black" style={{ marginHorizontal: 10 }} />
    </View>
  );
};

export default InputWithIcons;
