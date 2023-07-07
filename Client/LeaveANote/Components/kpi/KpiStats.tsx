import { View, StyleSheet} from 'react-native'
import React, { FC, useContext } from 'react'
import NotesAndReportsPieChart from './NotesAndReportsPieChart'
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces'
import { useNavigation } from '@react-navigation/native';
import RegisteredUsers from './RegisteredUsers'
import { IModalButton } from '../../utils/interfaces/interfaces'
import Swiper from 'react-native-swiper'
const KpiStats: FC = () => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;
  const { buttonMain, buttonAlt } = buttonTheme;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);
  const buttons: IModalButton[] = []
  const cancelBtn: IModalButton = {
    title: 'Cancel',
    navigateTo: 'CreateNote'
  }
  const homeBtn: IModalButton = {
    title: 'Go Home',
    navigateTo: 'Home'
  }
  buttons.push(cancelBtn, homeBtn)
  return (
    <Swiper style={styles.wrapper} showsButtons={false}
    dotColor={text.secondary}
    activeDotColor={buttonMain.background}
    activeDotStyle={styles.activeDotStyle}
    >
     <View style={[styles.slide]}>
      <NotesAndReportsPieChart title='distribution of reports and notes' />
      </View>
      <View style={[styles.slide]}>
      <RegisteredUsers title='registered users' />
      </View>

    </Swiper>
  )
}

const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    buttonWrapperStyle:{
      backgroundColor: 'transparent', flexDirection: 'row', position: 'absolute', top: 0, left: 0, flex: 1, paddingHorizontal: 10, paddingVertical: 10, justifyContent: 'space-between', alignItems: 'center'
    },
    buttonText:{
      color:text.primary
    },
    wrapper:{},
    activeDotStyle:{
      height:10,
      width:10,
      borderColor:text.primary,
      borderRadius:50,
      borderWidth:1.
    },
    slide:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    backgroundColor: background,

    },
    divider: {
      height: 5,
      backgroundColor: primary,
      margin: 15,
      borderRadius: 20,
    },
    button: {
      backgroundColor: 'red'
    }
  });
export default KpiStats