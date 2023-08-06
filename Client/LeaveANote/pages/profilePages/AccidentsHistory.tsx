import React, { useState, useContext, FC,useRef } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native';
import { ListItem,Button, Icon } from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import { MainContext } from '../../context/ContextProvider';
import { Accident, Theme } from '../../utils/interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces';
import DropdownAlert from 'react-native-dropdownalert';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
const AccidentsHistory: FC = () => {
   // Access required context and state
  const navigation = useNavigation();
  const {  currentUser, deleteAccident, refreshCurrantUser } = useContext(MainContext);
  const [refreshing, setRefreshing] = useState(false);
  const [accidents, setAccidents] = useState<Accident[]>(currentUser ? currentUser.accidents : []);
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors
  const { buttonMain, buttonAlt } = buttonTheme;
  let dropDownAlertRef = useRef();
    // Define the styles based on theme
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt)

  // Function to handle pull-to-refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshCurrantUser();
    setRefreshing(false);

  };
   // Function to handle press on accident information
  const handleInfoPress = (item: Accident) => {
    navigation.navigate({ name: item.type === 'note' ? 'NoteView' : 'ReportView', params: { item } });

  };
  // Function to handle delete action
  const handleDelete = async (index: number, id: string) => {
    const [isDeleted, message] = await deleteAccident(id);
    const [messageToast, statusToast, headerToast] = isDeleted ? [message, 'success', 'Deleted Successfully 👋'] : [message, 'error', 'Failed to delete'];
    dropDownAlertRef.alertWithType(statusToast, headerToast, messageToast);
    if (isDeleted)
      deleteMessageFromState(index);
  }
 // Function to remove a message from state currant user
  const deleteMessageFromState = (index: number) => {
    let updatedMessages = [...accidents];
    updatedMessages.splice(index, 1);
    setAccidents(updatedMessages);
  };
// Generate the list of accidents
  const accidentsList = accidents.map((accident, index) => {
    if (accident.type === 'note') {
      return (
        <ListItem.Swipeable
          containerStyle={[styles.item, styles.textPrimaryBorder]}
          bottomDivider
          key={accident.id}
          leftContent={reset => (
            <Button
              title="Info"
              color={primary}
              onPress={() => handleInfoPress(accident)}
              icon={{ name: 'info', color: buttonMain.text }}
              buttonStyle={styles.hiddenButton}
            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index, accident.id)}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}
            />
          )}>
          <Icon style={[styles.iconNote, styles.textPrimaryBorder]}
            name='document-outline'
            type='ionicon'
            color={buttonMain.text}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.Title}>{accident.hittingDriverName}</ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{accident.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron
            size={35}
            color={text.primary}

          />
        </ListItem.Swipeable>
      );
    } else {
      return (
        <ListItem.Swipeable
          containerStyle={[styles.item, styles.textPrimaryBorder]}
          bottomDivider
          key={accident.id}
          leftContent={reset => (
            <Button
              title="Info"
              onPress={() => handleInfoPress(accident)}
              color={buttonMain.background}
              icon={{ name: 'info', color: buttonMain.text }}
              buttonStyle={styles.hiddenButton}

            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index, accident.id)}
              icon={{ name: 'delete', color: 'white' }}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}

            />
          )}>
          <Icon
            containerStyle={[styles.iconReport, styles.textPrimaryBorder]}
            name="eye-outline"
            type="ionicon"
            color={buttonMain.text}
          />
          <ListItem.Content>
            <ListItem.Title style={styles.Title}>
              {accident.isIdentify
                ? accident.hittingDriverName
                : accident.hittingCarNumber}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{accident.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron
            size={35}
            color={text.primary}

          />
        </ListItem.Swipeable>
      );
    }
  });


  return (
    <View style={{ flex: 1 }}>
      <DividerWithText title='Your Accidents History' fontSize={20} />
      <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        {accidents.length > 0 ? accidentsList : <EmptyListAnimation />}
      </ScrollView>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />

    </View>

  );
};
const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    deleteButton: {
      backgroundColor: '#8B0000',

    },
    hiddenButton: {
      borderRadius: 20,
      height: '97%',
    },

    textPrimaryBorder: {
      borderWidth: 1,
      borderColor: text.primary
    },
    container: {
      flexGrow: 1,
      padding: 10,
      backgroundColor: background,
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
    rightRadius: {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
    },
    leftRadius: {
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },

  });
export default AccidentsHistory;
