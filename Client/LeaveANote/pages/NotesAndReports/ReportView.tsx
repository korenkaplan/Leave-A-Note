import React,{useContext} from 'react';
import { View, StyleSheet,Linking } from 'react-native';
import { Image, ListItem,Icon,Divider } from '@rneui/themed';
import { Button } from 'native-base';
import {MessageProps } from '../../utils/interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';

const ReportView: React.FC<MessageProps> = ({route}) => {
  const {item} = route.params;
    const {hittingDriver, date, imageSource,isAnonymous,isIdentify, reporter} = item;
    const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
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
        <View style={styles.detailsContainer}>
         <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="calendar" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="person-outline" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>Unknown Driver</ListItem.Title>
        <ListItem.Subtitle style={styles.Subtitle}>Damaging Driver</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="car-outline" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{hittingDriver.carNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
        </View>
      );

      //return in case that the damaging driver is in the system
      const knownDamagingReport = (
        <View style={styles.detailsContainer}>
         <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="calendar" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="person-outline" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{hittingDriver.name}</ListItem.Title>
        <ListItem.Subtitle style={styles.Subtitle}>Damaging Driver</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
    <ListItem containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="car-outline" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{hittingDriver.carNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <View style={[styles.btnContainer,styles.ListItem,styles.textPrimaryBorder]}>
          <ListItem  containerStyle={[styles.ListItem,styles.phoneRow,]}> 
        <Icon name="person" type="ionicon" color={text.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}> {hittingDriver.phoneNumber}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
            <Button style={styles.callBtn} onPress={()=>{moveToPhoneDialog(hittingDriver.phoneNumber)}}>
              <Icon name="call" type="ionicon" color={text.primary} />
            </Button>
            <Button style={styles.textBtn} onPress={()=>{moveToSmsDialog(hittingDriver.phoneNumber,hittingDriver.name)}}>
              <Icon name="sms" type="font-awesome-5" color={text.primary} />
            </Button>
          </View>
    
        </View>
      );
      //reporter information , if anonymous display information else don't display
      const reporterInformation = ()=>{
        //if reporter is anonymous don't display information
        if(isAnonymous)
        {
            return (
                <ListItem containerStyle={styles.reporterItem}>
                <Icon name="person" type="ionicon" color={text.primary} />
                <ListItem.Content>
                  <ListItem.Title style={styles.Title}>Anonymous Reporter</ListItem.Title>
                  <ListItem.Subtitle style={styles.Subtitle}>Reporter</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
        }
        //if reporter is not anonymous display infomration
        else{
            return (
                <View style={[styles.btnContainer,styles.reporterItem]}>
          <ListItem containerStyle={[styles.ListItem,styles.phoneRow,]}> 
        <Icon name="person" type="ionicon" color={text.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{reporter.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.Subtitle}>Reporter</ListItem.Subtitle>
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
          <Divider style={styles.divider}/>
            {reporterInformation()}
            <Divider style={styles.divider}/>
            {isIdentify ? knownDamagingReport : unknownDamagingReport}
          <View>
        </View>
      </View>
  );
};

const createStyles = (primary,secondary,text,background) => 
 StyleSheet.create({
  Title:{
    color:text.primary,
  }, 
  detailsContainer:{
    backgroundColor:secondary, 
    paddingTop:20, 
      },
      callBtn:{
        height:50,
        marginRight:10,
        width:55,
        backgroundColor:primary,
        borderWidth: 1, 
        borderColor: text.primary,
    
      },
    textPrimaryBorder:{
      borderWidth: 1, 
      borderColor: text.primary,
      marginBottom:10,
      
  
    },
    textBtn:{
      height:50,
      marginRight:10,
      width:75,
      backgroundColor:secondary,
      borderWidth: 1, 
      borderColor: text.primary,
    },
    phoneRow:{
      width:200,
    },
    imageContainer:{
      backgroundColor:background,
      alignItems: 'center',
      padding:20,
      shadowColor:primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
    },
    divider:{
    height:2,
    backgroundColor:text.primary,
    shadowColor: text.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    },
    btnContainer:{
      flexDirection:'row',
      alignItems: 'center',
      backgroundColor:background,
      
    },
    MainContainer: {
      flex: 1,
    backgroundColor:secondary,
    },
    container: {
    flex: 1,
      marginTop: 60,
    },
    image:{
      aspectRatio: 1,
      borderWidth:10,
      borderColor:text.primary,
      width: 200,
       height: 200,
       borderRadius:20,
    },
    reporterItem: {
      backgroundColor: background,
      minHeight: 'auto', // Adjust the minHeight property to achieve the desired effect
    },
    
    ListItem: {
      backgroundColor:background,
      width:'90%',
      alignSelf: 'center',
      borderRadius:10,
  
    },
    Subtitle:{
      color:text.primary,
    },
  });
  

export default ReportView;
