import {View, Text,StyleSheet, ScrollView, TouchableOpacity,RefreshControl, LogBox} from 'react-native';
import React,{useState,useContext} from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar, Icon} from '@rneui/themed';
import { MainContext } from '../context/ContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';

export default function Inbox({ navigation }) {
  const {theme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)

  //a temporary state containing the list of items,
  const {currentUser, setCurrentUser, getUserById, deleteAReportById, deleteANoteById, deleteFromUnreadMessages} = useContext(MainContext);
  //TODO get messages from the server 
  const [messages, setMessages] = useState(currentUser.unreadMessages);
  const [refreshing, setRefreshing] = useState(false);
   
     //convert objects from database to list items
     const convertedMessages = currentUser.unreadMessages.map((message, index) => {
      // If the message is of type note
      if (message.type === 'note') {
        return (
          <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message.id} >
            <ListItem bottomDivider  containerStyle={[styles.item,styles.textPrimaryBorder]}>
              <Icon containerStyle={[styles.iconNote,styles.textPrimaryBorder]} name='document-outline' type='ionicon' color={text.primary} />
              <ListItem.Content>
                <ListItem.Title style={styles.Title}>{message.hittingDriver.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }
      // If the message is of type report
      else {
        return (
          <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message.id} >
            <ListItem bottomDivider  containerStyle={[styles.item,styles.textPrimaryBorder]}>
              <Icon containerStyle={[styles.iconReport,styles.textPrimaryBorder]} name='eye-outline' type='ionicon' color={text.primary} />
              <ListItem.Content>
                <ListItem.Title style={styles.Title}>{message.isIdentify ? message.hittingDriver.name : message.hittingDriver.carNumber}</ListItem.Title>
                <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        );
      }
    });
    
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
    <ThemedView style={styles.container}>
      {renderContent()}
    </ThemedView>
  );
}

const createStyles = (primary,secondary,text,background) => 
  StyleSheet.create({
  container:{
    flex: 1,
  },
  scroll:{
    flexGrow: 1,
    padding: 10,
  },
  iconNote:{
    size:30,
    borderWidth:1,
    borderRadius:50,
    padding:10,
    backgroundColor:primary,

  },
  iconReport:{
    size:30,
    borderWidth:1,
    borderRadius:50,
    padding:10,
    backgroundColor:secondary,
  },
  Title: {
    color: text.primary,
  },
  Subtitle: {
    color: text.secondary,
  },
  item:{
    backgroundColor:background,
    borderRadius:20,
    marginBottom:5,

  },
  textPrimaryBorder:{
    borderWidth: 1, 
    borderColor: text.primary
  },
});