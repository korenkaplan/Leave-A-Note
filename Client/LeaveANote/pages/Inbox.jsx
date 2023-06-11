import {View, Text,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import Header from '../Components/uiComponents/Header';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar} from '@rneui/themed';
export default function Inbox() {
  //a temporary state containing the list of items,
  //TODO get messages from the server 
  const [messages, setMessages] = useState([
    {
      key: '1',
      hittingDriver: 'koren kaplan',
      date: '02/12/2023',
      type: 'note',
    },
    {
      key: '2',
      hittingDriver: '83-333-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: '3',
      hittingDriver: 'Ravid kaplan',
      date: '02/12/2023',
      type: 'report',
    },
    {
      key: '4',
      hittingDriver: '83-222-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: 'q',
      hittingDriver: 'koren kaplan',
      date: '02/12/2023',
      type: 'note',
    },
    {
      key: 'w',
      hittingDriver: '83-333-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: 'e',
      hittingDriver: 'Ravid kaplan',
      date: '02/12/2023',
      type: 'report',
    },
    {
      key: 'r',
      hittingDriver: '83-222-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: 't',
      hittingDriver: 'koren kaplan',
      date: '02/12/2023',
      type: 'note',
    },
    {
      key: 'y',
      hittingDriver: '83-333-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: 'u',
      hittingDriver: 'Ravid kaplan',
      date: '02/12/2023',
      type: 'report',
    },
    {
      key: 'a',
      hittingDriver: '83-222-68',
      date: '03/12/2023',
      type: 'report',
    },
  ])

  //convert objects from database to list items
  const convertedMessages = messages.map((message,index) => {
    return (
     <TouchableOpacity  key={message.key} onPress={()=>console.log(message)}>
       <ListItem  bottomDivider>
       <Avatar
          size={64}
          rounded
          icon={{ name:message.type === 'report'? 'eye-outline' : 'document-outline', type: 'ionicon' }}
          containerStyle={{ backgroundColor: message.type === 'report'? 'lightblue' : 'lightgray'}}
        />
        <ListItem.Content>
          <ListItem.Title>{message.hittingDriver}</ListItem.Title>
          <ListItem.Subtitle>{message.date}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
     </TouchableOpacity>

    )
    
     });

     //create a function to handle the press of a message
     const handlePress = (message, index) => {
       //move to view the message
       moveToNoteView(message)
      //delete message from the message list
      handleDelete(index)
     

     }
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
    
       return (
    <View style={styles.container}>
      <Header style={styles.header} dividerColor='black' backgroundColor='lightblue' text='Inbox'/>
      <ScrollView style={styles.scroll}>
        { messages.length > 0 ? convertedMessages :<EmptyAnimationInbox/>}
      </ScrollView>
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
    backgroundColor: 'white',
  }
});