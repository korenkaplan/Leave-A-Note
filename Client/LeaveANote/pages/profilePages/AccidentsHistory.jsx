import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState,useContext} from 'react';
import {ListItem, Avatar, Icon, Button} from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import {useNavigation} from '@react-navigation/native';
import { MainContext } from '../../context/ContextProvider';
export default function AccidentsHistory() {
  const navigation = useNavigation();
  const {currentUser, setCurrentUser} = useContext(MainContext);
  const [accidents, setAccidentst] = useState([
    {
      id: '1',
      hittingDriver:{
        name:'Koren Kaplan',
        carNumber:'8333368',
        phoneNumber:'0533406789',
      },
      date: '02/12/2023',
      type: 'note',
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg'
    },
    {
      id: '2',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467046/cld-sample-4.jpg'
    },
    {
      id: '3',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-2.jpg'
    },
    {
      id: '4',
      hittingDriver:{
        name:'Ofri Malka',
        carNumber:'69354401',
        phoneNumber:'0528942612',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '04/12/2023',
      type: 'report',
      isAnonymous:false,
      isIdentify:true,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467044/cld-sample.jpg'
    },
    {
      id: '5',
      hittingDriver:{
        carNumber:'8333368',
      },
      reporter:{
        name:'Koren Kaplan',
        phoneNumber:'0533406789',
      },
      date: '03/12/2023',
      type: 'report',
      isAnonymous:true,
      isIdentify:false,
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467034/samples/landscapes/nature-mountains.jpg'
    },
  ]);
  const handleInfoPress = (item) => {
  
    //ToDO: check if note or report
    navigation.navigate({
      name: item.type ==='note'? 'NoteView': 'ReportView',
      params: {...item},
      merge: true,
    }
    );
  };


  const handleDelete = index => {
    //TODO: delete frm database
    // Create a copy of the accidents array
    let updatedList = [...accidents];

    // Remove the item at the specified index
    updatedList.splice(index, 1);

    // Update the state with the updated array
    setAccidentst(updatedList);
  };

  const accidentsList = accidents.map((item, index) => {
    if(item.type === 'note')
    {
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
          icon={{ name: 'document-outline', type: 'ionicon' }}
          containerStyle={{ backgroundColor:'lightgray' }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.hittingDriver.name}</ListItem.Title>
          <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    );
    }
    else{
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
            icon={{ name: 'eye-outline' , type: 'ionicon' }}
            containerStyle={{ backgroundColor:'lightblue' }}
          />
          <ListItem.Content>
            <ListItem.Title>{item.isIdentify? item.hittingDriver.name: item.hittingDriver.carNumber}</ListItem.Title>
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
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: 'white',
  },
});
