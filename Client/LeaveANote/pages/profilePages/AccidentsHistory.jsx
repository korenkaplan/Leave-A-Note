import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Avatar, Icon, Button} from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import {useNavigation} from '@react-navigation/native';

export default function AccidentsHistory() {
  const navigation = useNavigation();
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
        carNumber:'8333368',
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
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg'
    },
  ])

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
             containerStyle={{ backgroundColor:'lightblue'}}
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
    if(message.type === 'note')
    {
      //move to view the message
     moveToNoteView(message)
    }
    else{
      moveToReportView(message)
    }
    
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
   //create a function to move to a view of a message on press 
   const moveToNoteView = (message) => {
    navigation.navigate({
      name: 'NoteView',
      params: {...message},
      merge: true,
    }
    );

    
  };
   //create a funtion to move to a view of a report on press
   const moveToReportView = (message) => {
        navigation.navigate({
          name: 'ReportView',
          params: {...message},
          merge: true,
        });
      }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {messages.length > 0 ? convertedMessages : <EmptyListAnimation />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
