import React,{useContext} from 'react';
import {View, StyleSheet, Linking} from 'react-native';
import { Image, ListItem,Icon } from '@rneui/themed';
import { Button } from 'native-base';
import { number } from 'yup';
import { ThemeContext } from '../../context/ThemeContext';
import ThemedView from '../../Components/uiComponents/ThemedView';
import CustomButton from '../../Components/uiComponents/CustomButton';
import { MessageProps } from '../../utils/interfaces/interfaces';

const NoteView: React.FC<MessageProps> = ( {route}) => {
  //const message = navigation.getParam('message','no message');

  
  const {item } = route.params;
  const {hittingDriver, date, imageSource} = item;
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)

const noteDetails = (
  <View  >
    <ListItem  containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="calendar" type="ionicon" color={text.primary}  />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
      </ListItem.Content>
    </ListItem >
    <ListItem  containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="person-outline" type="ionicon" color={text.primary}  />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{hittingDriver.name}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
    <ListItem  containerStyle={[styles.ListItem,styles.textPrimaryBorder]}>
      <Icon name="car-outline" type="ionicon" color={text.primary} />
      <ListItem.Content>
        <ListItem.Title style={styles.Title}>{hittingDriver.carNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>

  </View>
);
const image = (
  <Image
    transitionDuration={360}
    transition={true}
    style={styles.image}
    source={{ uri: imageSource }}
  />
);

const moveToPhoneDialog = () => {
  const phoneNumberUrl = `tel:${hittingDriver.phoneNumber}`;
  Linking.openURL(phoneNumberUrl);
};

const moveToSmsDialog = () => {
  const messageUrl = `sms:${hittingDriver.phoneNumber}?body=${encodeURIComponent(
    `Hello ${hittingDriver.name}...`
  )}`;
  Linking.openURL(messageUrl);
};

  return (
    <View style={styles.MainContainer}>
      <View style={styles.imageContainer}>
        {image}
        </View>
        <View  style={styles.detailsContainer}>
       {noteDetails}
        </View>
        <View style={[styles.btnContainer,styles.ListItem,styles.textPrimaryBorder]}>
        <ListItem containerStyle={[styles.ListItem,styles.phoneRow,]}> 
      <Icon name="phone-portrait" type="ionicon" color={text.primary}  />
      <ListItem.Content >
        <ListItem.Title style={styles.Title}>{hittingDriver.phoneNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem >
          <Button style={[styles.callBtn]}  onPress={moveToPhoneDialog}>
            <Icon name="call" type="ionicon" color={text.primary} />
          </Button>
          <Button style={[styles.textBtn]} onPress={moveToSmsDialog}>
            <Icon name="sms" type="font-awesome-5" color={text.primary} />
          </Button>
        </View>
    </View>
  );
};

export default NoteView;

const createStyles = (primary,secondary,text,background) => 
 StyleSheet.create({
  Title:{
    color:text.primary,
  },

  detailsContainer:{
backgroundColor:secondary, 
paddingTop:20, 
  },
  textPrimaryBorder:{
    borderWidth: 1, 
    borderColor: text.primary,
    marginBottom:10,
    

  },
  ListItem: {
    backgroundColor:background,
    width:'90%',
    alignSelf: 'center',
    borderRadius:10,

  },
  callBtn:{
    height:50,
    marginRight:10,
    width:55,
    backgroundColor:primary,
    borderWidth: 1, 
    borderColor: text.primary,

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
  btnContainer:{
    flexDirection:'row',
    height:60,
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
  }
});
