import React, { useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Image, ListItem, Icon, Divider } from '@rneui/themed';
import { Button } from 'native-base';
import { MessageProps } from '../../utils/interfaces/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton, IText } from '../../utils/interfaces/interfaces';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
const ReportView: React.FC<MessageProps> = ({ route }) => {
  // Extract item data from route parameters
  const { item } = route.params;
  const { hittingDriverName, hittingCarNumber, hittingDriverPhoneNumber, date, imageSource, isAnonymous, isIdentify, reporterName, reporterPhoneNumber } = item;
  // Access theme and button theme from context

  const { theme, buttonTheme } = useContext(ThemeContext);
  const { buttonAlt, buttonMain } = buttonTheme;
  const { primary, secondary, text, background } = theme.colors
  const iconsColor = text.primary;
  const styles = createStyles(primary, secondary, text, background, buttonAlt, buttonMain)
  //return the image
  const image = (
    <Image
      transitionDuration={360}
      transition={true}
      style={styles.image}
      source={{ uri: imageSource }}
    />
  );
  // function to move to SMS dialog when button is pressed
  const moveToPhoneDialog = (phoneNumber: string) => {
    const phoneNumberUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneNumberUrl);
  };
  // function to move to phone dialog when button is pressed
  const moveToSmsDialog = (phoneNumber: string, name: string) => {
    const messageUrl = `sms:${phoneNumber}?body=${encodeURIComponent(
      `Hello ${name}...`
    )}`;
    Linking.openURL(messageUrl);
  };
  //return in case that the damaging driver is not in the system
  const unknownDamagingReport = (
    <View style={styles.detailsContainer}>
      <DividerWithText height={1.5} fontColor={buttonMain.text} title={'Driver Information'} />

      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="calendar" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="person-outline" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>Unknown Driver</ListItem.Title>
          <ListItem.Subtitle style={styles.Subtitle}>Damaging Driver</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="car-outline" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{hittingCarNumber}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    </View>
  );

  //return in case that the damaging driver is in the system
  const knownDamagingReport = (
    <View style={styles.detailsContainer}>
      <DividerWithText height={1.5} fontColor={buttonMain.text} title={'Driver Information'} />

      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="calendar" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{date}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="person-outline" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{hittingDriverName}</ListItem.Title>
          <ListItem.Subtitle style={styles.Subtitle}>Damaging Driver</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem containerStyle={[styles.ListItem, styles.textPrimaryBorder]}>
        <Icon name="car-outline" type="ionicon" color={iconsColor} />
        <ListItem.Content>
          <ListItem.Title style={styles.Title}>{hittingCarNumber}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
      <DividerWithText height={1.5} fontColor={buttonMain.text} title={'Make Contact'} />
      <View style={[styles.btnContainer, styles.ListItem, styles.textPrimaryBorder]}>
        <ListItem containerStyle={[styles.ListItem, styles.phoneRow,]}>
          <Icon name="person" type="ionicon" color={text.primary} />
          <ListItem.Content>
            <ListItem.Title style={styles.Title}> {hittingDriverPhoneNumber}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
        <Button style={styles.callBtn} onPress={() => { moveToPhoneDialog(hittingDriverPhoneNumber) }}>
          <Icon name="call" type="ionicon" color={buttonMain.text} />
        </Button>
        <Button style={styles.textBtn} onPress={() => { moveToSmsDialog(hittingDriverPhoneNumber, hittingDriverName) }}>
          <Icon name="sms" type="font-awesome-5" color={buttonAlt.text} />
        </Button>
      </View>

    </View>
  );
  //reporter information , if anonymous display information else don't display
  const reporterInformation = () => {
    //if reporter is anonymous don't display information
    if (isAnonymous) {
      return (
        <ListItem containerStyle={styles.reporterItem}>
          <Icon name="person" type="ionicon" color={text.primary} />
          <ListItem.Content>
            <ListItem.Title style={styles.Title}>Anonymous Reporter</ListItem.Title>
            <ListItem.Subtitle style={styles.Subtitle}>Reporter</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    }
    //if reporter is not anonymous display infomration
    else {
      return (
        <View style={[styles.btnContainer, styles.reporterItem]}>
          <ListItem containerStyle={[styles.ListItem, styles.phoneRow,]}>
            <Icon name="person" type="ionicon" color={text.primary} />
            <ListItem.Content>
              <ListItem.Title style={styles.Title}>{reporterName}</ListItem.Title>
              <ListItem.Subtitle style={styles.Subtitle}>Reporter</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          <Button style={styles.callBtn} onPress={() => { moveToPhoneDialog(reporterPhoneNumber) }}>
            <Icon name="call" type="ionicon" color="white" />
          </Button>
          <Button style={styles.textBtn} onPress={() => { moveToSmsDialog(reporterPhoneNumber, reporterName) }}>
            <Icon name="sms" type="font-awesome-5" color={buttonAlt.text} />
          </Button>
        </View>
      );
    }
  };
  return (
    <View style={styles.MainContainer}>

      <View style={styles.imageContainer}>
        {image}
      </View>
      <Divider style={styles.divider} />
      {reporterInformation()}
      <Divider style={styles.divider} />
      {isIdentify ? knownDamagingReport : unknownDamagingReport}
      <View>
      </View>
    </View>
  );
};

const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonAlt: StyleButton, buttonMain: StyleButton) =>
  StyleSheet.create({
    Title: {
      color: text.primary,
    },
    detailsContainer: {
      backgroundColor: primary,
      paddingTop: 20,
    },
    callBtn: {
      height: 50,
      marginRight: 10,
      width: 55,
      backgroundColor: buttonMain.background,
      borderWidth: 1,
      borderColor: text.primary,

    },
    textPrimaryBorder: {
      borderWidth: 1,
      borderColor: text.primary,
      marginBottom: 10,


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
    divider: {
      height: 2,
      backgroundColor: text.primary,
      shadowColor: text.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 10,
    },
    btnContainer: {
      flexDirection: 'row',
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
      borderWidth: 6,
      borderColor: primary,
      width: 200,
      height: 200,
      borderRadius: 20,
    },
    reporterItem: {
      backgroundColor: background,
      minHeight: 'auto', // Adjust the minHeight property to achieve the desired effect
    },

    ListItem: {
      backgroundColor: background,
      width: '90%',
      alignSelf: 'center',
      borderRadius: 10,

    },
    Subtitle: {
      color: text.primary,
    },
  });


export default ReportView;
