import { View, Text,StyleSheet} from 'react-native'
import React,{useState} from 'react'
import { Input, Icon,Button } from '@rneui/themed';

export default function EditPassword() {
  const [oldPasswordSecure, setOldPasswordSecure] = useState(true)
  const [newPasswordSecure, setNewPasswordSecure] = useState(true)
  const [repeatPasswordSecure, setRepeatPasswordSecure] = useState(true)

  const  handleSubmit= () =>{
    
  }
  const validateInputs =() =>{
    
  }
  return (
    <View style={styles.container}>
      <View>
      <Text>Currant Password:</Text>
    <Input placeholder="Currant Password" secureTextEntry={oldPasswordSecure}
    leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
    rightIcon={{type:'ionicon', name : oldPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setOldPasswordSecure(!oldPasswordSecure)}}
    />
      </View>
      <View>
      <Text>New Password:</Text>
    <Input placeholder="New Password" secureTextEntry={newPasswordSecure}
    leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
    rightIcon={{type:'ionicon', name : newPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setNewPasswordSecure(!newPasswordSecure)}}
    />
      </View>
      <View>
      <Text>Repeat Password:</Text>
    <Input placeholder="Repeat Password" secureTextEntry={repeatPasswordSecure}
    leftIcon={{type:'ionicon', name: 'lock-closed-outline'}}
    rightIcon={{type:'ionicon', name : repeatPasswordSecure?'eye-off-outline':'eye-outline',  onPress: () => setRepeatPasswordSecure(!repeatPasswordSecure)}}
    />
      </View>
      <Button title='save'/>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    height: '100%',
    padding:20,
  }
});