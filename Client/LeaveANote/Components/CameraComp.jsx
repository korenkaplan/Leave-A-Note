import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity  } from 'react-native'
import React,{useRef} from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
export default function CameraComp() {
    const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null);
  if(device == null) return <ActivityIndicator/>;
  const takePicture = async()=>{
    const snapshot = await camera.current.takePhoto()
    console.log(snapshot);
  }
  return (
    <View style={{flex:1, justifyContent:'center'}}>
    <Camera
    ref={camera}
  style={StyleSheet.absoluteFill}
  device={device}
  isActive={true}
  photo={true}
/>
   <TouchableOpacity onPress={takePicture} style={styles.button} />
</View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  camera:{
  flex: 1,

  },
  button:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'transparent',
    borderColor:'white',
    borderWidth:5,
    position: 'absolute',
    bottom:50,
    alignSelf: 'center',
  }
})