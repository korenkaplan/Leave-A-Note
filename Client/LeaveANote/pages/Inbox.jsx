import {View, Text,StyleSheet, ScrollView, TouchableOpacity,RefreshControl, LogBox} from 'react-native';
import React,{useState,useContext} from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar} from '@rneui/themed';
import { MainContext } from '../context/ContextProvider';

export default function Inbox({ navigation }) {
LogBox.ignoreLogs(["ReactImageView: Image source 'null' doesn't exist"]);
  //a temporary state containing the list of items,
  const {currentUser, setCurrentUser, getUserById, deleteAReportById, deleteANoteById, deleteFromUnreadMessages} = useContext(MainContext);
  //TODO get messages from the server 
  const [messages, setMessages] = useState(currentUser.unreadMessages);
  const [refreshing, setRefreshing] = useState(false);
   
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
    const handleRefresh = async () => {
     //call getUserById() that will get the user from the database and set the current user.
   await getUserById(currentUser.id);
   setTimeout(() => {
    setRefreshing(false);
   }, 3000); // Adjust the delay time as needed
  };
     //create a function to handle the press of a message
     const handlePress = (item, index) => {
      //todo check if the message is a note or a report
      navigation.navigate({
        name: item.type ==='note'? 'NoteView': 'ReportView',
        params: {item},
        merge: true,
      });
      //the timeout is so the animation won't show for a brief second if the list is empty before moving to view the message.
      setTimeout(() => {
        handleDelete(index)
      }, 2000);
       //delete message from the message list
     }
     //create a function to delete the message from the message list
     const handleDelete = async (index) => {
      try {
      //  const result = await deleteFromUnreadMessages(message[index].id)
      //  if(!result) {return; } //if delete was'nt successful from database don't delete the message.
      // Remove the message from the message list
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
      // Update the currentUser state
      setCurrentUser((prevUser) => ({
        ...prevUser,
        unreadMessages: updatedMessages,
      }));

      } catch (error) {
        
      }

    };
    //check if the message list is empty or not and dispaly the list or animation
    const renderContent = () => {
      if (messages.length > 0) {
        return (
          <ScrollView style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
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