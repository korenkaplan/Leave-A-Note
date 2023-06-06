import React from 'react';
import { Input, Icon, Stack, Pressable,View, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import Lottie from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function SearchBar(){
  return (
    <View style={style.Assembler}>
      <View style={style.Main} >
          <TextInput placeholder='Enter car number' style={style.Input}></TextInput>
      </View>
      <TouchableOpacity  style={style.buttonP}>
     {/* <Lottie  source={require('../../assets/lottie.Animation/search.json')} autoPlay={true} loop={true} /> */}
     <Ionicons name="search-outline" color ={'gray'} size={24}/>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  Assembler:{
    flexDirection:'row',
  },
  Main:{
    backgroundColor:'#fff',
    width:250,
    height:60,
    borderWidth:1,
    borderColor:'#c0c0c0',
    borderTopLeftRadius:40,
    borderBottomLeftRadius:40,

  },
  Input:{
    marginLeft:10,
    marginTop:5,
  },
  buttonP:{
    height:60,
    width:60,
    backgroundColor:'#fff',
    borderWidth:1,
    borderBottomRightRadius:30,
    borderTopRightRadius:30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
  },
})