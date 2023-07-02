import { View, Text, StyleSheet,Dimensions} from 'react-native'
import React,{useContext}  from 'react'
import NotesAndReportsPieChart from './NotesAndReportsPieChart'
import UnMatchedReportsAndNote from './UnMatchedAndNote'
import DownloadAndRegistered from './DownloadAndRegistered'
import { Divider } from '@rneui/themed';
import { ThemeContext } from '../../context/ThemeContext';

type Props = {}

const KpiStats = (props: Props) => {
    const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
  const purpleShades = ['#5D3FD3','#702963','#483248']
  return (
    <View style={{flex: 1}}>
      <DownloadAndRegistered title='Registered Users vs Store Downloads'/>
      <Divider style={styles.divider}/>
      <NotesAndReportsPieChart title='Distribution of Reports by Month'/>
      <Divider style={styles.divider}/>
      <UnMatchedReportsAndNote title='Unmatched vs Matched Reports'/>
    </View>
  )
}
const createStyles = (primary:string, secondary:string, text: IText, background: string,buttonMain: StyleButton, buttonAlt: StyleButton) =>
StyleSheet.create({
    divider:{
        height:10,
        backgroundColor:primary,
        margin:10,
        borderRadius:20,
    },
});
export default KpiStats