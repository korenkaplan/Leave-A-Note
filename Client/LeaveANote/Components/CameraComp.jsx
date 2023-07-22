import { View,StyleSheet,ActivityIndicator,TouchableOpacity,  } from 'react-native'
import React,{useRef,useState,useEffect,useContext} from 'react'
import { Camera, useCameraDevices} from 'react-native-vision-camera'
import { Icon, Image,Slider,Badge } from '@rneui/base';
import { ThemeContext } from '../context/ThemeContext';
import CustomButton from './uiComponents/CustomButton';
export default function CameraComp({ navigation, route }) {
  const {previous} = route.params;
  const [cameraPermission, setCameraPermission] = useState("not-determined");
  const [imageData, setImageData] = useState('')
  const [torchStatus, setTorchStatus] = useState('off');
  const [isTorch, setIsTorch] = useState(false);
  const [flipCamera, setFlipCamera] = useState(true)
  const [takePhotoClicked, setTakePhotoClicked] = useState(false)
  const [zoomValue, setZoomValue] = useState(1.0);
  const {theme,buttonTheme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const {buttonMain,buttonAlt}= buttonTheme;
  const styles = createStyles(primary,secondary,text,background,buttonMain,buttonAlt)
  const devices = useCameraDevices()
  const deviceFront = devices.front
  const deviceBack = devices.back
  const camera = useRef(null);
  useEffect(() => {
    const requestPermissions = async () => {
      const permission = await Camera.requestCameraPermission();

      if (permission !== "authorized") {
          setError("Not allowed to access camera");
      }

      setCameraPermission(permission);
  }
  
  requestPermissions();
    
    
    }, [])

 
  if(!(deviceFront && deviceBack)) return <ActivityIndicator/>;

  const takePicture = async()=>{
    if(camera != null){
      if(isTorch)
      setTorchStatus('on')
      setTimeout(async() => {
        const snapshot = await camera.current.takePhoto()
        const imagePath = 'file://' + snapshot.path;
        setImageData(imagePath);
        setTorchStatus('off')
        setTakePhotoClicked(true);
      }, 300);
    }
    
  }


  const moveBackToPreviousScreen=()=>{
    setTimeout(() => {
      navigation.navigate({
        name:previous,
        params:{image:imageData}
      });
    }, 400);
 
  }
  const renderScreen = ()=>{
    
    if(takePhotoClicked)
    {
      return (
        <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:imageData}} alt='image here'/>
        <View style={styles.buttonContainer}>
        <CustomButton type='main' containerStyle={{width:150}} title={'Use Photo'} onPress={moveBackToPreviousScreen}/>
        <CustomButton type='alt' containerStyle={{width:150}} title={'Retake Photo'} onPress={()=> setTakePhotoClicked(false)}/>
        </View>
      </View>
      );
    }

    else{
      return(
        <View style={{flex:1, backgroundColor:'black', alignItems:'center'}}>
          <View style={{height:'80%', width:'100%'}}>
          <Camera
        ref={camera}
        torch={torchStatus}
      style={styles.camera}
      device={flipCamera? deviceBack: deviceFront}
      isActive={true}
      photo={true}
      zoom={zoomValue}
      focusable={true}
    />
          </View>
        <View style={{backgroundColor:primary,borderTopColor:buttonMain.text,borderTopWidth:2, height:'20%' ,width:'100%'}}>
        <Slider
      
            style={styles.slider}
            value={zoomValue}
            onValueChange={setZoomValue}
            maximumValue={5}
            minimumValue={1}
            step={0.5}
            allowTouchTrack
            thumbStyle={{backgroundColor: 'transparent',  }}
            thumbProps={{
              children: (
                <Badge textStyle={{color:buttonMain.background}} badgeStyle={{backgroundColor:buttonMain.text,position:'relative',top:5,width:30,height:30,borderRadius:50}} value={zoomValue}  />
                
              ),
            }}
            />
            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
              <TouchableOpacity onPress={toggleFlipCamera} style={styles.sideButton}>
              <Icon onPress={toggleFlipCamera} name={'camera-reverse-sharp'} type='ionicon' color={buttonMain.background} size={35}  />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture} style={styles.button} />
            <TouchableOpacity onPress={toggleTorch} style={styles.sideButton}>
              <Icon name={isTorch? 'flash-on': 'flash-off'} color={buttonMain.background} size={35}  />
            </TouchableOpacity>
            </View>
            
        </View>
   
    </View>
      );
    }
  }
  const toggleFlipCamera = async () => {
    try {
      setFlipCamera(!flipCamera);
    } catch (error) {
      console.log('Failed to toggle camera:', error);
    }
  };
  const toggleTorch = async () => {
    try {
      setIsTorch(!isTorch);
    } catch (error) {
      console.log('Failed to toggle flashlight:', error);
    }
  };
  
  return (
    <>
    {renderScreen()}
    </>
  )
}
const createStyles = (primary,secondary,text,background,buttonMain,buttonAlt) =>  StyleSheet.create({
  thumbZoom:{
    backgroundColor:'red',
    textAlign:'center',
    fontSize:15,
    borderRadius:50
  },
  slider:{
    padding: 10,
    zIndex: 1,
    borderRadius:50,
    width:'50%',
    alignSelf:'center',
  },

  sideButton: {
    backgroundColor:buttonMain.text,
    borderRadius:50,
    padding:5
  },

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
    alignSelf: 'center',
  },
  image:{
    width:'100%',
    height:'100%',
  }
})