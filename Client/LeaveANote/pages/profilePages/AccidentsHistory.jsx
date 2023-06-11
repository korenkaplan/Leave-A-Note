import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Avatar, Icon, Button} from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import {useNavigation} from '@react-navigation/native';

export default function AccidentsHistory() {
  const navigation = useNavigation();
  const [accidents, setAccidentst] = useState([
    {
      id: '1',
      hittingDriver:{
        name:'Koren Kaplan',
        carNumber:'8333368',
        phoneNumber:'0533406789',
      },
      date: '02/12/2023',
      type: 'Note',
      imageSource: 'https://res.cloudinary.com/dz3brwyob/image/upload/v1686467045/cld-sample-3.jpg'
    },
  ]);
  const handleInfoPress = (item) => {
    //ToDO: check if note or report
    navigation.navigate({
      name: 'NoteView',
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
          icon={{ name:item.type === 'report'? 'eye-outline' : 'document-outline', type: 'ionicon' }}
          containerStyle={{ backgroundColor:item.type === 'report'?'lightblue':'lightgray' }}
        />
        <ListItem.Content>
          <ListItem.Title>{item.hittingDriver.name}</ListItem.Title>
          <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem.Swipeable>
    );
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
