import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {ListItem, Avatar, Icon, Button} from '@rneui/themed';
import EmptyListAnimation from '../../Components/accidentsHistory/EmptyListAnimation';
import {useNavigation} from '@react-navigation/native';

export default function AccidentsHistory() {
  const navigation = useNavigation();
  const [accidents, setAccidentst] = useState([
    {
      key: '1',
      hittingDriver: 'koren kaplan',
      date: '02/12/2023',
      type: 'note',
    },
    {
      key: '2',
      hittingDriver: '83-333-68',
      date: '03/12/2023',
      type: 'report',
    },
    {
      key: '3',
      hittingDriver: 'Ravid kaplan',
      date: '02/12/2023',
      type: 'report',
    },
    {
      key: '4',
      hittingDriver: '83-222-68',
      date: '03/12/2023',
      type: 'report',
    },
  ]);
  const handleInfoPress = item => {

    //ToDO: create a 
    console.log(item);
    navigation.navigate('Home', {item});
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
        key={item.key}
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
        <Icon
          name={item.type === 'report' ? 'document-outline' : 'eye-outline'}
          type="ionicon"
        />
        <ListItem.Content>
          <ListItem.Title>{item.hittingDriver}</ListItem.Title>
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
