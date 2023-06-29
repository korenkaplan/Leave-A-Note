import React, { useState, useContext,FC} from 'react';
import {StyleSheet, ScrollView,RefreshControl } from 'react-native';
import { ListItem, Avatar, Button,Icon } from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import { MainContext } from '../../context/ContextProvider';
import {Accident, Theme} from '../../utils/interfaces/interfaces';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces';
import CustomSlide from '../../Components/uiComponents/CustomSlide';

const AccidentsHistory: FC = ()=> {
  const navigation = useNavigation();
  const {getUserById, currentUser, setCurrentUser,deleteAccident} = useContext(MainContext);
  //const [reports, setReports] = useState(currentUser.reports);
  const [refreshing, setRefreshing] = useState(false);
  const [isShowing, setIsShowing] = useState(false);
  const [slideMessage, setSlideMessage] = useState('');
  const [slideStatus, setSlideStatus] = useState('error');
  const [accidents, setAccidents] = useState<Accident[]>(currentUser? currentUser.accidents: []);
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary,secondary,text,background} = theme.colors
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary,secondary,text,background, buttonMain, buttonAlt)
  const handleRefresh = async () => {
   //call getUserById() that will get the user from the database and set the current user.
   //TODO: handle the refresh event   
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
  const handleDelete = async (index: number, id: string) => {
    const [isDeleted,message] = await deleteAccident(id);
      setSlideMessage(message);
      setSlideStatus(isDeleted?'success' : 'error');
    if(isDeleted)
      deleteMessageFromState(index);
      showSlide();
  }
  const showSlide = () =>{
    setTimeout(() => {
      setIsShowing(true)
      setTimeout(() => {
        setIsShowing(false)
      }, 2500)
    }, 1000);
  }
  const deleteMessageFromState = (index: number) => {
    let updatedMessages = [...accidents];
        updatedMessages.splice(index, 1);
        setCurrentUser((prev)=>({
          ...prev!,
          accidents: updatedMessages,
        }));
  };
  const accidentsList = accidents.map((accident, index) => {
    if (accident.type === 'note') {
      return (
        <ListItem.Swipeable
        containerStyle={[styles.item,styles.textPrimaryBorder]}
          bottomDivider
          key={accident._id}
          leftContent={reset => (
            <Button
              title="Info"
              color={primary}
              onPress={() => handleInfoPress(accident)}
              icon={{name: 'info', color: buttonMain.text}}
              buttonStyle={styles.hiddenButton}
            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index,accident._id)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}
            />
          )}>
            <Icon style={[styles.iconNote,styles.textPrimaryBorder]}
              name = 'document-outline'
              type = 'ionicon'
              color= {buttonMain.text}
              />
          <ListItem.Content>
            <ListItem.Title  style={styles.Title}>{accident.hittingDriver.name}</ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{accident.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    } else {
      return (
        <ListItem.Swipeable
        containerStyle={[styles.item,styles.textPrimaryBorder]}
          bottomDivider
          key={accident._id}
          leftContent={reset => (
            <Button
              title="Info"
              onPress={() => handleInfoPress(accident)}
              color={buttonMain.background}
              icon={{name: 'info', color:buttonMain.text}}
              buttonStyle={styles.hiddenButton}

            />
          )}
          rightContent={reset => (
            <Button
              title="Delete"
              onPress={() => handleDelete(index,accident._id)}
              icon={{name: 'delete', color: 'white'}}
              buttonStyle={[styles.hiddenButton, styles.deleteButton]}

            />
          )}>
      <Icon
  containerStyle={[styles.iconReport,styles.textPrimaryBorder]}
  name="eye-outline"
  type="ionicon"
  color={buttonMain.text}
/>
          <ListItem.Content>
            <ListItem.Title style={styles.Title}>
              {accident.isIdentify
                ? accident.hittingDriver.name
                : accident.hittingDriver.carNumber}
            </ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>{accident.date}</ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem.Swipeable>
      );
    }
  });
    return (
    <ScrollView contentContainerStyle={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />  }>
      <CustomSlide placement='top'  isShowing={isShowing} status={slideStatus} title={slideMessage} />
      {accidents.length > 0 ? accidentsList : <EmptyListAnimation />}
    </ScrollView>
  );
};
const createStyles = (primary:string,secondary:string,text:IText,background:string,buttonMain:StyleButton, buttonAlt:StyleButton) => 
StyleSheet.create({
  deleteButton:{
     backgroundColor: '#8B0000',
     
  },
  hiddenButton:{
    borderRadius:20,
    height:'97%',
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
