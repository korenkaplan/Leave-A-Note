import { View, Text,StyleSheet,ActivityIndicator,TouchableOpacity  } from 'react-native'
import React,{useRef,useState,useEffect} from 'react'
import { Camera, useCameraDevices,CameraPermissionStatus } from 'react-native-vision-camera'
import { Button, Icon, Image } from '@rneui/base';
export default function CameraComp({ navigation, route }) {
  const {previous} = route.params;
  const [cameraPermission, setCameraPermission] = useState("not-determined");
  const [imageData, setImageData] = useState('')
  const [takePhotoClicked, setTakePhotoClicked] = useState(false)
  const devices = useCameraDevices()
  const device = devices.back
  const camera = useRef(null);
  useEffect(() => {
    const requestPermissions = async () => {
      console.log("Requesting camera permission");
      const permission = await Camera.requestCameraPermission();
      console.log("Permission given: ", permission);

      if (permission !== "authorized") {
          setError("Not allowed to access camera");
      }

      setCameraPermission(permission);
  }
  
  requestPermissions();
    
    
    }, [])

 
  if(device == null) return <ActivityIndicator/>;

  const takePicture = async()=>{
    if(camera != null){
      const snapshot = await camera.current.takePhoto()
      const imagePath = 'file://' + snapshot.path;
      setImageData(imagePath);
      setTakePhotoClicked(true);
    }
    
  }

  const cameraView = (
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

  const imageView=(
    <View style={{flex:1, justifyContent:'center'}}>
      <Image style={styles.image} source={imageData}/>
    </View>
  )
  const moveBackToPreviousScreen=()=>{
    navigation.navigate({
      name:previous,
      params:{image:imageData}
    });
  }
  const renderScreen = ()=>{
    if(takePhotoClicked)
    {
      return (
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:imageData}} alt='image here'/>
        <View style={styles.buttonContainer}>
        <Button title={'Use Photo'} onPress={moveBackToPreviousScreen}/>
        <Button title={'Retake Photo'} onPress={()=> setTakePhotoClicked(false)}/>
        </View>
      </View>
      );
    }
    else{
      return(
        <View style={{flex:1, justifyContent:'center',backgroundColor:'black', alignItems:'center'}}>
        <Camera
        ref={camera}
      style={styles.camera}
      device={device}
      isActive={true}
      photo={true}
    />
       <TouchableOpacity onPress={takePicture} style={styles.button} />
    </View>
      );
    }
  }
  return (
    <>
    {renderScreen()}
    </>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    flexDirection:'row',
    width: '100%',
  justifyContent: 'space-around',
  },
  imageContainer:{
    width: '100%',
    height: '100%',
  },
  camera:{
  height: '100%',
  width: '100%',
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
  },
  image:{
    width:'100%',
    height:'100%',
  }
})