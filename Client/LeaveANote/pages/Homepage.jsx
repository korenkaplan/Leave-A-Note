import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ActivityIndicator,
  Alert,
  useColorScheme,
  ScrollView,
} from 'react-native';
import React, {useState, useContext, useEffect, useRef} from 'react';
import {MainContext} from '../context/ContextProvider';
import {Heading} from 'native-base';
import Logo from '../assets/note-taking.svg';
import {Input, Icon, Chip, Button, Switch} from '@rneui/themed';
import {ThemeContext} from '../context/ThemeContext';
import ThemedView from '../Components/uiComponents/ThemedView';
import CustomButton from '../Components/uiComponents/CustomButton';
import KpiStats from '../Components/kpi/KpiStats';
export default function Homepage({navigation}) {
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background);
  const widthPercent = 100;
  const heightPercent = 30;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = (windowWidth * widthPercent) / 100;
  const height = (windowHeight * heightPercent) / 100;
  const {
    setCarNumInput,
    searchCarNumber,
    setDamagedUserId,
    handleLogOut,
    currentUser,
  } = useContext(MainContext);
  const [searchValue, setSearchValue] = useState('8333368');
  const [error, setError] = useState('');
  const [iconName, setIconName] = useState('search');
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isNumLengthValid = searchValue.length > 6 && searchValue.length < 9;

  /**
  Contains the props of the right icon of the input element
 */
  const iconProps = {
    name: iconName,
    marginRight: 10,
    color: buttonMain.text,
    backgroundColor: isNumLengthValid
      ? buttonMain.background
      : buttonAlt.background,
    borderWidth: 1,
    borderColor: text.primary,
    borderRadius: 50,
    padding: 3,
    // disabled: !isNumLengthValid,
    onPress: () => {
      isNumLengthValid
        ? handleSearchPress()
        : setError('Car number must be 7 or 8 digits long');
    },
  };
  /**
  This function creates a loading spinner.
 */
  const loadSpinner = () => {
    return (
      <View
        style={{
          borderRadius: 50,
          backgroundColor: buttonMain.background,
          padding: 2,
        }}>
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
  const handleSearchPress = async () => {
    setIsLoading(true); // Set loading state to true
    const isUserExists = await searchCarNumber(searchValue);
    setIsLoading(false); // Set loading state to true
    if (isUserExists) {
      setIconName('check');
      setIsNumberValid(true);
    } else {
      setIconName('error');
      setError('Car number not found');
      setIsNumberValid(false);
    }
  };

  const moveToNotePage = () => {
    setCarNumInput(searchValue);
    navigation.navigate({
      name: 'CreateNote',
      params: {carNumber: searchValue},
    });
    //setSearchValue('');
  };
  const moveToReportPage = () => {
    navigation.navigate('CreateReport', searchValue);
    setSearchValue('');
  };
  const logOutAlert = () =>
    Alert.alert(
      'Are you sure you want to Sign out?',
      '',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          onPress: () => handleLogOut(),
          style: 'destructive', // Custom style for the "Sign Out" button
        },
      ],
      {
        titleStyle: {fontSize: 24, fontWeight: 'bold', color: 'red'}, // Custom style for the alert title
        messageStyle: {fontSize: 16, color: 'blue'}, // Custom style for the alert message
        buttonStyle: {backgroundColor: 'orange'}, // Custom style for the buttons
      },
    );
  const userView = (
    <View style={{flex: 1}}>
      <Icon
        reverse
        name="log-out-outline"
        type="ionicon"
        color={buttonAlt.background}
        onPress={logOutAlert}
        iconStyle={{color: buttonMain.text}} // Specify the color of the icon
        containerStyle={[{marginLeft: 20}, styles.primaryBorder1]}
      />

      <View style={styles.container}>
        <Logo width={width} height={height} />
        <Heading style={{color: text.primary}}>Leave A Note</Heading>
        <View style={styles.searchContainer}>
          <Input
            errorMessage={error}
            placeholder="Enter Car Number"
            rightIcon={isLoading ? loadSpinner : iconProps}
            onChangeText={updateSearchValue}
            value={searchValue}
            inputStyle={{color: text.primary}}
            keyboardType="numeric"
          />
        </View>
        <CustomButton
          type="main"
          disabled={!isNumberValid}
          onPress={moveToNotePage}
          title={'Leave a Note'}
        />
        <CustomButton type="alt" onPress={moveToReportPage} title={'Report'} />
      </View>
    </View>
  );
  const adminView = (
    <View style={{flex: 1}}>
      <KpiStats/>
    </View>
  );
  return (
    <ThemedView style={styles.MainContainer}>
      <ScrollView>
        {currentUser.role !== 'user' ? userView : adminView}
      </ScrollView>
    </ThemedView>
  );
}

const createStyles = (primary, secondary, text, background) =>
  StyleSheet.create({
    primaryBorder1: {
      borderColor: text.primary,
      borderWidth: 1,
    },
    text: {
      color: text.primary,
    },
    noteBtn: {
      height: 50,
      width: 50,
      margin: 20,
      borderRadius: 10,
      color: text.primary,
    },
    reportBtn: {
      width: '50%',
      margin: 20,
      borderRadius: 10,
    },
    MainContainer: {
      backgroundColor: background,
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: background,
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
      backgroundColor: background,
    },
    searchBarInput: {
      fontSize: 16,
      height: 40,
    },
    searchIcon: {
      marginRight: 8,
    },
  });
