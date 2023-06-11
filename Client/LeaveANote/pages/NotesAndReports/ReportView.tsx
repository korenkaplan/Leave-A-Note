/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet,Linking } from 'react-native';
import { Image, ListItem,Icon,Divider } from '@rneui/themed';
import { Button } from 'native-base';
interface ComponentProps {
  // Define your component props here
  route:{
    params:{
        id:string,
        hittingDriver:{
            name:string
            carNumber:string
            phoneNumber:string
        }
        date:string
        type:string
        imageSource:string
        isAnonymous:boolean
        isIdentify:boolean
        reporter:{
            name:string
            phoneNumber:string
        }
    }
  }
};

const ReportView: React.FC<ComponentProps> = ({route}) => {
    const {id, hittingDriver, date, type, imageSource,isAnonymous,isIdentify, reporter} = route.params;
        //return the header of the page
  
      //return the image
      const image = (
        <Image
          transitionDuration={360}
          transition={true}
          style={styles.image}
          source={{ uri: imageSource }}
        />
      );
      // function to move to SMS dialog when button is pressed
      const moveToPhoneDialog = (phoneNumber:string) => {
        const phoneNumberUrl = `tel:${phoneNumber}`;
        Linking.openURL(phoneNumberUrl);
      };
      // function to move to phone dialog when button is pressed
      const moveToSmsDialog = (phoneNumber:string, name:string) => {
        const messageUrl = `sms:${phoneNumber}?body=${encodeURIComponent(
          `Hello ${name}...`
        )}`;
        Linking.openURL(messageUrl);
      };
      //return in case that the damaging driver is not in the system
      const unknownDamagingReport = (
        <>
         <ListItem>
      <Icon name="calendar" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{date}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <ListItem>
      <Icon name="person-outline" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>Unknown Driver</ListItem.Title>
        <ListItem.Subtitle>Damaging Driver</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <ListItem>
      <Icon name="car-outline" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{hittingDriver.carNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
        </>
      );

      //return in case that the damaging driver is in the system
      const knownDamagingReport = (
        <>
         <ListItem>
      <Icon name="calendar" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{date}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <ListItem>
      <Icon name="person-outline" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{hittingDriver.name}</ListItem.Title>
        <ListItem.Subtitle>Damaging Driver</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <ListItem>
      <Icon name="car-outline" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{hittingDriver.carNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <View style={styles.btnContainer}>
          <ListItem style={styles.phoneRow}> 
        <Icon name="person" type="ionicon" color="grey" />
        <ListItem.Content>
          <ListItem.Title>{hittingDriver.phoneNumber}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
            <Button style={styles.callBtn} onPress={()=>{moveToPhoneDialog(hittingDriver.phoneNumber)}}>
              <Icon name="call" type="ionicon" color="white" />
            </Button>
            <Button style={styles.textBtn} onPress={()=>{moveToSmsDialog(hittingDriver.phoneNumber,hittingDriver.name)}}>
              <Icon name="sms" type="font-awesome-5" color="white" />
            </Button>
          </View>
    
        </>
      );
      //reporter information , if anonymous display information else don't display
      const reporterInformation = ()=>{
        //if reporter is anonymous don't display information
        if(isAnonymous)
        {
            return (
                <ListItem>
                <Icon name="person" type="ionicon" color="grey" />
                <ListItem.Content>
                  <ListItem.Title>Anonymous Reporter</ListItem.Title>
                  <ListItem.Subtitle>Reporter</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
        }
        //if reporter is not anonymous display infomration
        else{
            return (
                <View style={styles.btnContainer}>
          <ListItem style={styles.phoneRow}> 
        <Icon name="person" type="ionicon" color="grey" />
        <ListItem.Content>
          <ListItem.Title>{reporter.name}</ListItem.Title>
          <ListItem.Subtitle>Reporter</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
            <Button style={styles.callBtn} onPress={()=>{moveToPhoneDialog(reporter.phoneNumber)}}>
              <Icon name="call" type="ionicon" color="white" />
            </Button>
            <Button style={styles.textBtn} onPress={()=>{moveToSmsDialog(reporter.phoneNumber,reporter.name)}}>
              <Icon name="sms" type="font-awesome-5" color="white" />
            </Button>
          </View>
            );     
        }
      };
    return (
        <View style={styles.MainContainer}>
   
        <View style={styles.imageContainer}>
          {image}
          </View>
            {reporterInformation()}
            <Divider style={styles.divider}/>
            {isIdentify ? knownDamagingReport : unknownDamagingReport}
          <View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    callBtn:{
      height:50,
      marginRight:10,
      backgroundColor:'#3b5998',
  
    },
    textBtn:{
      height:50,
      marginRight:10,
      backgroundColor:'#8b9dc3',
    },
    phoneRow:{
      width:'50%',
    },
    imageContainer:{
      backgroundColor:'#dfe3ee',
      alignItems: 'center',
      padding:20,
      marginBottom:20,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
    },
    divider:{
    height:2,
    backgroundColor:'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    },
    btnContainer:{
      flexDirection:'row',
      height:60,
    },
    MainContainer: {
      flex: 1,
      backgroundColor:'white',
    },
    container: {
    flex: 1,
      marginTop: 60,
    },
    image:{
      aspectRatio: 1,
      borderWidth:10,
      borderColor:'black',
      width: 200,
       height: 200,
       borderRadius:20,
    }
  });
  

export default ReportView;
