import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import React, {useState,useContext} from 'react';
import { MainContext } from '../context/ContextProvider';
import {Heading} from 'native-base';
import Logo from '../assets/note-taking.svg';
import {Button} from '@rneui/themed';
import {Input, Icon} from '@rneui/themed';
export default function Homepage({navigation}) {
  const widthPercent = 100;
  const heightPercent = 30;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = (windowWidth * widthPercent) / 100;
  const height = (windowHeight * heightPercent) / 100;
  const {setCarNumInput, searchCarNumber, setDamagedUserId} = useContext(MainContext);
  const [searchValue, setSearchValue] = useState('8333368');
  const [error, setError] = useState('');
  const [iconName, setIconName] = useState('search');
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const isNumLengthValid = searchValue.length > 6 && searchValue.length < 9;

  /**
  Contains the props of the right icon of the input element
 */
  const iconProps = {
    name: iconName,
    marginRight: 10,
    color: isNumLengthValid ? 'white' : 'gray',
    backgroundColor: isNumLengthValid ? 'lightblue' : 'transparent',
    borderRadius: 50,
    padding: 3,
    // disabled: !isNumLengthValid,
    onPress: () =>
      isNumLengthValid
        ? handleSearchPress()
        : setError('Car number must be 7 or 8 digits long'),
  };

  /**
  This function creates a loading spinner.
 */
  const loadSpinner = () => {
    return (
      <View
        style={{borderRadius: 50, backgroundColor: 'lightblue', padding: 2}}>
        <ActivityIndicator size="small" color="white" />
      </View>
    );
  };

  /**
  This function updates the states on input change event:
  1. change validation state of the input to false.
  2. change the icon to search icon.
 */
  const updateSearchValue = searchValue => {
    setIsNumberValid(false);
    setError('');
    setIconName('search');
    setSearchValue(searchValue);
  };

  /**
   * This function checks the car number input in the database.
   * after submit event
   *
   */
  const handleSearchPress = () => {
    //TODO: search the car number in the database
    setError('');
    setIsLoading(true); // Set loading state to true

    // Simulate an asynchronous operation (e.g., API call) with a timeout
    setTimeout(() => {
      setIsLoading(false); // Set loading state to false after the operation completes

      const resultUserID = searchCarNumber(searchValue);
      if (resultUserID) {
        setIconName('check');
        setIsNumberValid(true);
      } else {
        setIconName('error');
        setError('Car number not found');
        setIsNumberValid(false);
      }
    }, 1500); // Replace 2000 with the actual duration of your asynchronous operation
  };

  const moveToNotePage = ()=>{
    setCarNumInput(searchValue);
    navigation.navigate({
      name: 'CreateNote',
      params:{'carNumber': searchValue,}
    });
    //setSearchValue('');
  }
  const moveToReportPage = ()=>{
    navigation.navigate('CreateReport',searchValue);
    setSearchValue('');
  }
  return (
    <View flex={1} style={styles.container}>
      <Logo width={width} height={height} />
      <Heading>Leave A Note</Heading>
      <View style={styles.searchContainer}>
        <Input
          errorMessage={error}
          placeholder="Enter Car Number"
          rightIcon={isLoading ? loadSpinner : iconProps}
          onChangeText={updateSearchValue}
          value={searchValue}
          keyboardType="numeric"
        />
      </View>
      <Button
        containerStyle={styles.button}
        disabled={!isNumberValid}
        size="sm"
        onPress={moveToNotePage}
        title="Leave a Note"
      />
      <Button
        containerStyle={styles.button}
        size="sm"
        title="Report"
        onPress={moveToReportPage}
        type="outline"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '50%',
    margin: 20,
  },
  container: {
    alignItems: 'center',
  },
  searchContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  searchBarContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  searchBarInputContainer: {
    backgroundColor: 'white',
  },
  searchBarInput: {
    fontSize: 16,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
});
