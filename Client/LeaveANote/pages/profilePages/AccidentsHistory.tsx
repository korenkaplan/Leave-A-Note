import React, { useState, useContext,FC} from 'react';
import {StyleSheet, ScrollView,RefreshControl } from 'react-native';
import { ListItem, Avatar, Button,Icon } from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import { MainContext } from '../../context/ContextProvider';
import {Accident, Theme} from '../../utils/interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { Text } from '../../utils/interfaces/interfaces';
const AccidentsHistory: FC = ()=> {
  const navigation = useNavigation();
  const radius = 20;
  const {getUserById, currentUser, setCurrentUser, deleteAReportById, deleteANoteById} = useContext(MainContext);
  //const [reports, setReports] = useState(currentUser.reports);
  const [notes, setNotes] = useState(currentUser.notes);
  const [refreshing, setRefreshing] = useState(false);
  const [accidents, setAccidents] = useState<Accident[]>([...currentUser.notes, ...currentUser.reports]);
  const {theme, toggleTheme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const styles = createStyles(primary,secondary,text,background)
  const handleRefresh = async () => {
   //call getUserById() that will get the user from the database and set the current user.
   await getUserById(currentUser.id);
   
    setTimeout(() => {
      
     setRefreshing(false);
    }, 3000); // Adjust the delay time as needed
  };
  const handleInfoPress = (item: Accident) => {
    if (item.type === 'note') {
      navigation.navigate('NoteView', { item });
    } else {
      navigation.navigate('ReportView', { item });
    }
  };
  const deleteNote = async (index: number, id: string): Promise<void>  => {
    try {
      const isDeleted = await deleteANoteById(id);
      if(isDeleted)
      {
        let updatedNotes = [...currentUser.notes];
        updatedNotes.splice(index, 1);
        //setNotes(updatedNotes);
        //delete from currant user notes list
        setCurrentUser((prevUser) =>({
          ...prevUser,
          notes: updatedNotes,
        }));
       // setAccidents([...currentUser.notes, ...currentUser.reports]);
      }
      else
      {
        console.error('error deleting from database');
      }
    } catch (error: any) {
      console.error('error deleting from database');
      console.log(error.message);
    }
  };
  const deleteReport = async (index: number, id: string) => {
    try {
      const indexInReportsArray = index - notes.length;
      const isDeleted = await deleteAReportById(id);
      if(isDeleted)
      {
        let updatedReports = [...currentUser.reports];
        updatedReports.splice(indexInReportsArray, 1);
       // setReports(updatedReports);
        //delete from currant user notes list
        setCurrentUser((prevUser) =>({
          ...prevUser,
          reports: updatedReports,
        }));
       // setAccidents([...currentUser.notes, ...currentUser.reports]);
      }
      else
      {
        console.error('error deleting from database');
      }
    } catch (error: any) {
      console.error('error deleting from database');
      console.log(error.message);
    }

  };
  const handleDelete = async (index: number) => {
    try {
      const item = accidents[index];
      item.type === 'note' ? deleteNote(index, item.id) : deleteReport(index, item.id);
    } catch (error: any) {
      console.error('error deleting from database');
      console.log(error.message);
    }
  };
  const accidentsList = accidents.map((item, index) => {
    if (item.type === 'note') {
      return (
        <ListItem.Swipeable
        containerStyle={[styles.item,styles.textPrimaryBorder]}
          bottomDivider
          key={item.id}
          leftContent={reset => (
            <Button
              title="Info"
              color={primary}
              onPress={() => handleInfoPress(item)}
              icon={{name: 'info', color: text.primary}}
              buttonStyle={styles.hiddenButton}
            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}
            />
          )}>
            <Icon style={[styles.iconNote,styles.textPrimaryBorder]}
              name = 'document-outline'
              type = 'ionicon'
              color= {text.primary}
              />
          <ListItem.Content>
            <ListItem.Title  style={styles.Title}>{item.hittingDriver.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{item.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    } else {
      return (
        <ListItem.Swipeable
        containerStyle={[styles.item,styles.textPrimaryBorder]}
          bottomDivider
          key={item.id}
          leftContent={reset => (
            <Button
              title="Info"
              onPress={() => handleInfoPress(item)}
              color={primary}
              icon={{name: 'info', color:text.primary}}
              buttonStyle={styles.hiddenButton}

            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}

            />
          )}>
      <Icon
  containerStyle={[styles.iconReport,styles.textPrimaryBorder]}
  name="eye-outline"
  type="ionicon"
  color={text.primary}
/>
          <ListItem.Content>
            <ListItem.Title style={styles.Title}>
              {item.isIdentify
                ? item.hittingDriver.name
                : item.hittingDriver.carNumber}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{item.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    }
  });
    return (


    <ScrollView contentContainerStyle={styles.container}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
    }
    >
      {accidents.length > 0 ? accidentsList : <EmptyListAnimation />}
    </ScrollView>
  );
};
const createStyles = (primary:string,secondary:string,text:Text,background:string) => 
StyleSheet.create({
  deleteButton:{
     backgroundColor: 'red',
     
  },
  hiddenButton:{
    borderRadius:20,
    height:'96%'
  },

  textPrimaryBorder:{
    borderWidth: 1, 
    borderColor: text.primary
  },
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: background,
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
  rightRadius:{
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  leftRadius:{
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  
});
export default AccidentsHistory;
