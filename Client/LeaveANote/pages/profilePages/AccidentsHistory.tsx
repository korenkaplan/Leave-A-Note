/* eslint-disable prettier/prettier */
import React, { useState, useContext,FC} from 'react';
import {StyleSheet, ScrollView } from 'react-native';
import { ListItem, Avatar, Button } from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import { MainContext } from '../../context/ContextProvider';
import {Accident} from '../../utils/interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';

const AccidentsHistory: FC = ()=> {
  const navigation = useNavigation();
  const { currentUser, setCurrentUser, deleteAReportById, deleteANoteById} = useContext(MainContext);
  //const [reports, setReports] = useState(currentUser.reports);
  const [notes, setNotes] = useState(currentUser.notes);
  const [accidents, setAccidents] = useState<Accident[]>([...currentUser.notes, ...currentUser.reports]);


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
          bottomDivider
          key={item.id}
          style={{backgroundColor: 'gray'}}
          leftContent={reset => (
            <Button
              title="Info"
              onPress={() => handleInfoPress(item)}
              icon={{name: 'info', color: 'white'}}
              buttonStyle={{minHeight: '100%'}}
            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
            />
          )}>
          <Avatar
            size={64}
            rounded
            icon={{name: 'document-outline', type: 'ionicon'}}
            containerStyle={{backgroundColor: 'lightgray'}}
          />
          <ListItem.Content>
            <ListItem.Title>{item.hittingDriver.name}</ListItem.Title>
            <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    } else {
      return (
        <ListItem.Swipeable
          bottomDivider
          key={item.id}
          style={{backgroundColor: 'gray'}}
          leftContent={reset => (
            <Button
              title="Info"
              onPress={() => handleInfoPress(item)}
              icon={{name: 'info', color: 'white'}}
              buttonStyle={{minHeight: '100%'}}
            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={{minHeight: '100%', backgroundColor: 'red'}}
            />
          )}>
          <Avatar
            size={64}
            rounded
            icon={{name: 'eye-outline', type: 'ionicon'}}
            containerStyle={{backgroundColor: 'lightblue'}}
          />
          <ListItem.Content>
            <ListItem.Title>
              {item.isIdentify
                ? item.hittingDriver.name
                : item.hittingDriver.carNumber}
            </ListItem.Title>
            <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    }
  });
    return (
    <ScrollView contentContainerStyle={styles.container}>
      {accidents.length > 0 ? accidentsList : <EmptyListAnimation />}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
export default AccidentsHistory;