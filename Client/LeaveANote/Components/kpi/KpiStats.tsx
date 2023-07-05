import { View, Text, StyleSheet,Dimensions,ScrollView} from 'react-native'
import React,{FC,useContext}  from 'react'
import NotesAndReportsPieChart from './NotesAndReportsPieChart'
import UnMatchedReportsAndNote from './UnMatchedAndNote'
import DownloadAndRegistered from './DownloadAndRegistered'
import { Divider,Icon,Button } from '@rneui/themed';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces'
import { useNavigation } from '@react-navigation/native';
import RegisteredUsers from './RegisteredUsers'
const KpiStats: FC = () => {
  const navigation = useNavigation();
 const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
  const purpleShades = ['#5D3FD3','#702963','#483248']
  const handlePressGoBack = () => {
    navigation.navigate('Main')
  };
  return (
    <View style={{flex: 1, backgroundColor:background}}>

      <ScrollView style={{backgroundColor:background}}>
      <RegisteredUsers title='Registered Users'/>
      <Divider style={styles.divider}/>
      <NotesAndReportsPieChart title='Distribution of Reports by Month'/>
      <Divider style={styles.divider}/>
      {/* <UnMatchedReportsAndNote title='Unmatched vs Matched Reports'/> */}
      </ScrollView>
    </View>
  )
}
const createStyles = (primary:string, secondary:string, text: IText, background: string,buttonMain: StyleButton, buttonAlt: StyleButton) =>
StyleSheet.create({
    divider:{
        height:5,
        backgroundColor:primary,
        margin:15,
        borderRadius:20,
    },
    button:{
    backgroundColor:'red'
    }
});
export default KpiStats