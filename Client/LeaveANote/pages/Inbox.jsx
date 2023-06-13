import {View, Text,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar} from '@rneui/themed';

export default function Inbox({ navigation }) {
  //a temporary state containing the list of items,
  //TODO get messages from the server 
  const [messages, setMessages] = useState([
    {
      id: '1',
      hittingDriver:{
        name:'Koren Kaplan',
        carNumber:'8333368',
        phoneNumber:'0533406789',
      },
      date: '02/12/2023',
      type: 'note',
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg'
    },
    {
      id: '2',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg'
    },
    {
      id: '3',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-2.jpg'
    },
    {
      id: '4',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467044/cld-sample.jpg'
    },
    {
      id: '5',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467034/samples/landscapes/nature-mountains.jpg'
    },
  ])
     //convert objects from database to list items
     const convertedMessages = messages.map((message,index) => {
      //if the message is of type note 
      if(message.type === 'note')
      {
        return (
          <TouchableOpacity onPress={()=> {handlePress(message,index)}}  key={message.id} >
            <ListItem  bottomDivider>
            <Avatar
               size={64}
               rounded
               icon={{ name:'document-outline', type: 'ionicon' }}
               containerStyle={{ backgroundColor:'lightgray'}}
             />
             <ListItem.Content>
               <ListItem.Title>{message.hittingDriver.name}</ListItem.Title>
               <ListItem.Subtitle>{message.date}</ListItem.Subtitle>
             </ListItem.Content>
             <ListItem.Chevron />
           </ListItem>
          </TouchableOpacity>
    )
    }
    //if the message is of type report
    else{
      return(
        <TouchableOpacity onPress={()=> {handlePress(message,index)}}  key={message.id} >
            <ListItem  bottomDivider>
            <Avatar
               size={64}
               rounded
               icon={{ name:'eye-outline', type: 'ionicon' }}
               containerStyle={{ backgroundColor:'lightblue'}}
             />
             <ListItem.Content>
               <ListItem.Title>{message.isIdentify? message.hittingDriver.name : message.hittingDriver.carNumber}</ListItem.Title>
               <ListItem.Subtitle>{message.date}</ListItem.Subtitle>
             </ListItem.Content>
             <ListItem.Chevron />
           </ListItem>
          </TouchableOpacity>
      )
    }
     })
     //create a function to handle the press of a message
     const handlePress = (message, index) => {
      //todo check if the message is a note or a report
      navigation.navigate({
        name: message.type ==='note'? 'NoteView': 'ReportView',
        params: {...message},
        merge: true,
      });
       //delete message from the message list
       handleDelete(index)
     }
     //create a function to delete the message from the message list
     const handleDelete = index => {
      //TODO: delete frm database
      let updatedMessages = [...messages]
      updatedMessages.splice(index,1)
      setMessages(updatedMessages)
    };

    //check if the message list is empty or not and dispaly the list or animation
    const renderContent = () => {
      if (messages.length > 0) {
        return (
          <ScrollView style={styles.scroll}>
            {convertedMessages}
          </ScrollView>
        );
      } else {
        return <EmptyAnimationInbox />;
      }
    };
       return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  scroll:{
    flexGrow: 1,
    padding: 10,
  },

});