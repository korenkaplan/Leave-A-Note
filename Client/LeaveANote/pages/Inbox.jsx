import {View, Text,StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React,{useState,useContext} from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar} from '@rneui/themed';
import { MainContext } from '../context/ContextProvider';
export default function Inbox({ navigation }) {
  //a temporary state containing the list of items,
  const {currentUser, setCurrentUser} = useContext(MainContext);
  //TODO get messages from the server 
  const [messages, setMessages] = useState(currentUser.unreadMessages);
     //convert objects from database to list items
     const convertedMessages = currentUser.unreadMessages.map((message,index) => {
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
     const handlePress = (item, index) => {
      //todo check if the message is a note or a report
      navigation.navigate({
        name: item.type ==='note'? 'NoteView': 'ReportView',
        params: {item},
        merge: true,
      });
       //delete message from the message list
       handleDelete(index)
     }
     //create a function to delete the message from the message list
     const handleDelete = (index) => {
      // Remove the message from the message list
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
    
      // Update the currentUser state
      setCurrentUser((prevUser) => ({
        ...prevUser,
        unreadMessages: updatedMessages,
      }));
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