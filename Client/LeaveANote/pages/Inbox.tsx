import { StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import React, { useState, useContext, FC } from 'react';
import EmptyAnimationInbox from '../Components/uiComponents/EmptyAnimationInbox';
import { ListItem, Icon } from '@rneui/themed';
import { MainContext } from '../context/ContextProvider';
import { ThemeContext } from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';
import { useNavigation } from '@react-navigation/native';
import { Accident, StyleButton } from '../utils/interfaces/interfaces';
import DividerWithText from '../Components/uiComponents/DividerWithText';

const Inbox: FC = () => {
  const navigation = useNavigation();
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors
  const { buttonMain, buttonAlt } = buttonTheme;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt)

  //a temporary state containing the list of items,
  const { currentUser, setCurrentUser, deleteFromUnreadMessages, refreshCurrantUser } = useContext(MainContext);
  // get messages from the server 
  const [messages, setMessages] = useState(currentUser ? currentUser.unreadMessages : []);
  const [refreshing, setRefreshing] = useState(false);

  //convert objects from database to list items
  const convertedMessages = messages.map((message: Accident, index: number) => {
    // If the message is of type note
    if (message.type === 'note') {
      return (
        <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message.id} >
          <ListItem bottomDivider containerStyle={[styles.item, styles.textPrimaryBorder]}>
            <Icon containerStyle={[styles.iconNote, styles.textPrimaryBorder]} name='document-outline' type='ionicon' color={buttonMain.text} />
            <ListItem.Content>
              <ListItem.Title style={styles.Title}>{message.hittingDriverName}</ListItem.Title>
              <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
              size={35}
              color={text.primary}
            />
          </ListItem>
        </TouchableOpacity>
      );
    }
    // If the message is of type report
    else {
      return (
        <TouchableOpacity onPress={() => { handlePress(message, index) }} key={message.id} >
          <ListItem bottomDivider containerStyle={[styles.item, styles.textPrimaryBorder]}>
            <Icon containerStyle={[styles.iconReport, styles.textPrimaryBorder]} name='eye-outline' type='ionicon' color={buttonAlt.text} />
            <ListItem.Content>
              <ListItem.Title style={styles.Title}>{message.isIdentify ? message.hittingDriverName : message.hittingCarNumber}</ListItem.Title>
              <ListItem.Subtitle style={styles.Subtitle}>{message.date}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron
              size={35}
              color={text.primary}
            />
          </ListItem>
        </TouchableOpacity>
      );
    }
  });
  /**
  * Handle the pull-to-refresh action.
  */
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCurrantUser();
    setRefreshing(false);

  };
  /**
* Handle the press of a message item.
* @param item - The message item being pressed.
* @param index - The index of the message item in the list.
*/
  const handlePress = (item: Accident, index: number) => {
    handleDelete(index, item.id);
    navigation.navigate(
      {
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
  /**
* Delete a message from the server and state.
* @param index - The index of the message item to be deleted.
* @param id - The id of the message item to be deleted.
*/
  const handleDelete = async (index: number, id: string) => {
    await deleteFromUnreadMessages(id);

  };
  /**
 * Delete a message from the component state.
 * @param index - The index of the message item to be deleted.
 */
  const deleteMessageFromState = (index: number) => {
    let updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setCurrentUser(prev => ({
      ...prev!,
      unreadMessages: updatedMessages,
    }));
  };

  /**
  * Render the content based on the message list.
  */
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
      return (
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
      <DividerWithText title='Inbox' fontSize={25} height={20} weight='bold' />
      {renderContent()}
    </ThemedView>
  );
}

const createStyles = (primary: string, secondary: string, text: { primary: string, secondary: string }, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      flexGrow: 1,
      padding: 10,
    },
    iconNote: {
      size: 30,
      borderWidth: 1,
      borderRadius: 50,
      padding: 10,
      backgroundColor: buttonMain.background,

    },
    iconReport: {
      size: 30,
      borderWidth: 1,
      borderRadius: 50,
      padding: 10,
      backgroundColor: buttonAlt.background,
    },
    Title: {
      color: text.primary,
    },
    Subtitle: {
      color: text.primary,
    },
    item: {
      backgroundColor: background,
      borderRadius: 20,
      marginBottom: 5,

    },
    textPrimaryBorder: {
      borderWidth: 1,
      borderColor: text.primary
    },
  });
export default Inbox;