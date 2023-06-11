/* eslint-disable prettier/prettier */
import React from 'react';
// eslint-disable-next-line prettier/prettier
import {View, StyleSheet, Linking} from 'react-native';
import { Image, ListItem,Icon } from '@rneui/themed';
import { Button } from 'native-base';

interface NoteProps {
  route: {
    params: {
        date: string;
        hittingDriver: {
          name: string;
          carNumber: string;
          phoneNumber: string;
        };
        id: string;
        type: string;
        imageSource: string;
    };
  };
}

const NoteView: React.FC<NoteProps> = ( {route}) => {
  //const message = navigation.getParam('message','no message');
  const {
    date,
    hittingDriver,
    id,
    type,
    imageSource,
  } = route.params;

const noteDetails = (
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

        <View>
       {noteDetails}
        </View>
        <View style={styles.btnContainer}>
        <ListItem style={styles.phoneRow}> 
      <Icon name="phone-portrait" type="ionicon" color="grey" />
      <ListItem.Content>
        <ListItem.Title>{hittingDriver.phoneNumber}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
          <Button style={styles.callBtn} onPress={moveToPhoneDialog}>
            <Icon name="call" type="ionicon" color="white" />
          </Button>
          <Button style={styles.textBtn} onPress={moveToSmsDialog}>
            <Icon name="sms" type="font-awesome-5" color="white" />
          </Button>
        </View>
    </View>
  );
};

export default NoteView;

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
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
  },
  divider:{
  height:10,
  backgroundColor:'red',
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
