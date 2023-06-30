import {View, Text,StyleSheet, ScrollView, TouchableOpacity,RefreshControl, LogBox} from 'react-native';
import React,{useState,useContext,FC} from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem,Avatar, Icon} from '@rneui/themed';
import { MainContext } from '../context/ContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {Accident, StyleButton, Theme} from '../utils/interfaces/interfaces';

const Inbox: FC = () =>{
  const navigation = useNavigation();
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary,secondary,text,background, buttonMain, buttonAlt)

  //a temporary state containing the list of items,
  const {currentUser, setCurrentUser, getUserById,deleteFromUnreadMessages,refreshCurrantUser} = useContext(MainContext);
  //TODO get messages from the server 
  const [messages, setMessages] = useState(currentUser? currentUser.unreadMessages: []);
  const [refreshing, setRefreshing] = useState(false);
   
     //convert objects from database to list items
     const convertedMessages = messages.map((message: Accident, index: number) => {
      // If the message is of type note
      if (message.type === 'note') {
        return (
          <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message._id} >
            <ListItem bottomDivider  containerStyle={[styles.item,styles.textPrimaryBorder]}>
              <Icon containerStyle={[styles.iconNote,styles.textPrimaryBorder]} name='document-outline' type='ionicon' color={buttonMain.text} />
              <ListItem.Content>
                <ListItem.Title style={styles.Title}>{message.hittingDriver.name}</ListItem.Title>
                <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron
              size={35}
              color={buttonMain.text}
              />
            </ListItem>
          </TouchableOpacity>
        );
      }
      // If the message is of type report
      else {
        return (
          <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message._id} >
            <ListItem bottomDivider  containerStyle={[styles.item,styles.textPrimaryBorder]}>
              <Icon containerStyle={[styles.iconReport,styles.textPrimaryBorder]} name='eye-outline' type='ionicon' color={buttonAlt.text} />
              <ListItem.Content>
                <ListItem.Title style={styles.Title}>{message.isIdentify ? message.hittingDriver.name : message.hittingDriver.carNumber}</ListItem.Title>
                <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron
              size={35}
              color={buttonMain.text}
              />
            </ListItem>
          </TouchableOpacity>
        );
      }
    });
    
    const handleRefresh = async () => {
      setRefreshing(true);
     await refreshCurrantUser();
     setRefreshing(false);

  };
     //create a function to handle the press of a message
     const handlePress = (item: Accident, index:number) => {
      //todo check if the message is a note or a report
      handleDelete(index, item._id);
      navigation.navigate({
        name: item.type === 'note' ? 'NoteView' : 'ReportView',
        params: { item },
        merge: true,
      });
      
      //the timeout is so the animation won't show for a brief second if the list is empty before moving to view the message.
      setTimeout(() => {
        deleteMessageFromState(index)
      }, 2000);
       //delete message from the message list
     }
     //create a function to delete the message from the message list
     const handleDelete = async (index: number, id: string) => {
    const isDeleted = await deleteFromUnreadMessages(id);
    console.log(isDeleted);
    

    };
    const deleteMessageFromState = (index: number) => {
      let updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setCurrentUser(prev=> ({
        ...prev!,
        unreadMessages: updatedMessages,
      }));
    };
    
    //check if the message list is empty or not and display the list or animation
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
        return(
          <ScrollView style={styles.scroll}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }>
          <EmptyAnimationInbox />
          </ScrollView>

        ) 
      }
    };
       return (
    <ThemedView style={styles.container}>
      {renderContent()}
    </ThemedView>
  );
}

const createStyles = (primary: string,secondary: string,text: {primary: string,secondary: string},background:string, buttonMain:StyleButton, buttonAlt:StyleButton) => 
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
    backgroundColor:buttonMain.background,

  },
  iconReport:{
    size:30,
    borderWidth:1,
    borderRadius:50,
    padding:10,
    backgroundColor:buttonAlt.background,
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
export default Inbox;