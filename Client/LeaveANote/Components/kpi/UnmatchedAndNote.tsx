import React,{useContext} from 'react';
import { View, Text, StyleSheet,Dimensions  } from 'react-native';
import { VictoryGroup, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryAnimation  } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton,IText } from '../../utils/interfaces/interfaces';
interface Props {
  title: string;
}

const UnMatchedReportsAndNote: React.FC<Props> = ({ title }) => {
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
  const purpleShades = ['#5D3FD3','#702963','#483248']
  const primaryColor = primary;
  const secondaryColor = purpleShades[0]
  // Generate dynamic data with increasing notes and decreasing unmatched reports
  const notesShownData = [
    { month: 'Jan-Feb',  notesShown: 5 },
    { month: 'Mar-Apr', notesShown: 10 },
    { month: 'May-Jun',notesShown: 15 },
    { month: 'Jul-Aug', notesShown: 20 },
    { month: 'Sep-Oct', notesShown: 25 },
    { month: 'Nov-Dec', notesShown: 30 },
  ];
  const unmatchedReportsData = [
    { month: 'Jan-Feb', unmatchedReports: 45},
    { month: 'Mar-Apr', unmatchedReports: 40},
    { month: 'May-Jun', unmatchedReports: 35 },
    { month: 'Jul-Aug', unmatchedReports: 30 },
    { month: 'Sep-Oct', unmatchedReports: 25 },
    { month: 'Nov-Dec', unmatchedReports: 20},
  ];
  const xLabels = notesShownData.map(({ month }) => month);
  const screenWidth = Dimensions.get('window').width;
  return (
    <View style={styles.container}>
      <DividerWithText title={title}  fontSize={15} />
      <View style={styles.container}>
      <VictoryChart width={screenWidth} theme={VictoryTheme.grayscale}>
        <VictoryAxis tickValues={xLabels} style={{   axis: {
      stroke: text.primary, // Axis line color
    }, tickLabels: { angle: 25 , fill: text.primary,} }} />
        <VictoryAxis dependentAxis style={{   axis: {
      stroke: text.primary, // Axis line color
    },tickLabels: {  fill:  text.primary,} }} />
        <VictoryGroup offset={17} colorScale={[primaryColor, secondaryColor]}>
          <VictoryBar data={notesShownData.map(({ month, notesShown }) => ({ x: month, y: notesShown }))} 
           animate={{ duration: 1000 }} 
     
          />
          <VictoryBar data={unmatchedReportsData.map(({ month, unmatchedReports }) => ({ x: month, y: unmatchedReports }))} 
          animate={{ duration: 1000 }} 
          />
        </VictoryGroup>
      </VictoryChart>
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor: primaryColor}]} />
          <Text style={styles.labelText}>Matched Reports</Text>
        </View>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor:secondaryColor}]} />
          <Text style={styles.labelText}>Unmatched Reports</Text>
        </View>
      </View>
    </View>
     
    </View>
  );
};

const createStyles = (primary:string, secondary:string, text: IText, background: string,buttonMain: StyleButton, buttonAlt: StyleButton) =>
StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: background,
    marginBottom:20
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  labelColor: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  labelText: {
    fontSize: 12,
    color: text.primary,
  },
});

export default UnMatchedReportsAndNote;
