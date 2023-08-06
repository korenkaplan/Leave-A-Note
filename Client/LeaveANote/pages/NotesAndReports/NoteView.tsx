import React, { useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Image, ListItem, Icon } from '@rneui/themed';
import { Button } from 'native-base';
import { ThemeContext } from '../../context/ThemeContext';
import { MessageProps } from '../../utils/interfaces/interfaces';
import { StyleButton, IText } from '../../utils/interfaces/interfaces';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
const NoteView: React.FC<MessageProps> = ({ route }) => {
  // Extract item data from route parameters
  const { item } = route.params;
  const { hittingCarNumber, hittingDriverPhoneNumber, hittingDriverName, date, imageSource } = item;
  // Access theme and button theme from context
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { buttonAlt, buttonMain } = buttonTheme;
  const { primary, secondary, text, background } = theme.colors
  const styles = createStyles(primary, secondary, text, background, buttonAlt, buttonMain)

  // Create JSX for note details
  const noteDetails = (
    <View  >
      <DividerWithText height={1.5} fontColor={buttonMain.text} title={'Driver Information'} />

      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="calendar" type="ionicon" color={text.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
        </ListItem.Content>
      </ListItem >
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="person-outline" type="ionicon" color={text.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{hittingDriverName}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="car-outline" type="ionicon" color={text.primary} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{hittingCarNumber}</ListItem.Title>
        </ListItem.Content>
      </ListItem>

    </View>
  );
  // Create JSX for image display
  const image = (
    <Image
      transitionDuration={360}
      transition={true}
      style={styles.image}
      source={{ uri: imageSource }}
    />
  );
  // Function to move to phone dialer
  const moveToPhoneDialog = () => {
    const phoneNumberUrl = `tel:${hittingDriverPhoneNumber}`;
    Linking.openURL(phoneNumberUrl);
  };
  // Function to move to SMS app
  const moveToSmsDialog = () => {
    const messageUrl = `sms:${hittingDriverPhoneNumber}?body=${encodeURIComponent(
      `Hello ${hittingDriverName}...`
    )}`;
    Linking.openURL(messageUrl);
  };

  return (
    <View style={styles.MainContainer}>
      <View style={styles.imageContainer}>
        {image}
      </View>
      <View style={styles.detailsContainer}>
        {noteDetails}
      </View>
      <DividerWithText height={1.5} fontColor={buttonMain.text} title={'Make Contact'} />

      <View style={[styles.btnContainer, styles.ListItem, styles.textPrimaryBorder]}>
        <ListItem containerStyle={[styles.ListItem, styles.phoneRow,]}>
          <Icon name="phone-portrait" type="ionicon" color={text.primary} />
          <ListItem.Content >
            <ListItem.Title style={styles.Title}>{hittingDriverPhoneNumber}</ListItem.Title>
          </ListItem.Content>
        </ListItem >
        <Button style={[styles.callBtn]} onPress={moveToPhoneDialog}>
          <Icon name="call" type="ionicon" color={buttonMain.text} />
        </Button>
        <Button style={[styles.textBtn]} onPress={moveToSmsDialog}>
          <Icon name="sms" type="font-awesome-5" color={buttonAlt.text} />
        </Button>
      </View>

    </View>
  );
};

export default NoteView;

const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonAlt: StyleButton, buttonMain: StyleButton) =>
  StyleSheet.create({
    Title: {
      color: text.primary,
    },

    detailsContainer: {
      backgroundColor: primary,
      paddingTop: 20,
    },
    textPrimaryBorder: {
      borderWidth: 1,
      borderColor: text.primary,
      marginBottom: 10,


    },
    ListItem: {
      backgroundColor: background,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,

    },
    callBtn: {
      height: 50,
      marginRight: 10,
      width: 55,
      backgroundColor: buttonMain.background,
      borderWidth: 1,
      borderColor: text.primary,

    },
    textBtn: {
      height: 50,
      marginRight: 10,
      width: 75,
      backgroundColor: buttonAlt.background,
      borderWidth: 1,
      borderColor: text.primary,
    },
    phoneRow: {
      width: 200,
    },
    imageContainer: {
      backgroundColor: background,
      alignItems: 'center',
      padding: 20,
      shadowColor: primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
    },
    btnContainer: {
      flexDirection: 'row',
      height: 60,
      alignItems: 'center',
      backgroundColor: background,

    },
    MainContainer: {
      flex: 1,
      backgroundColor: primary,
    },
    container: {
      flex: 1,
      marginTop: 60,
    },
    image: {
      aspectRatio: 1,
      borderWidth: 7,
      borderColor: primary,
      width: 200,
      height: 200,
      borderRadius: 20,
    }
  });
