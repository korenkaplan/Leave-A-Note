import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Dimensions, Button, StyleSheet, TextInput } from 'react-native';
import { VictoryPie } from 'victory-native';
import DividerWithText from '../../Components/uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { DistributionOfReports, IText, StyleButton } from '../../utils/interfaces/interfaces';
import { MainContext } from '../../context/ContextProvider';
import _ from 'lodash';

interface Props {
  title: string;
}
const NotesAndReportsPieChart: React.FC<Props> = ({ title }) => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { reportsAndNotesDistributionData } = useContext(MainContext);
  const { primary, secondary, text, background } = theme.colors;
  const [graphData, setGraphData] = useState<DistributionOfReports[]>([])
  const { buttonMain, buttonAlt } = buttonTheme;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);
  const purpleShades = ['#5D3FD3', '#702963', '#483248']
  const screenWidth = Dimensions.get('window').width;


  const calculateStats = (data: { category: string; count: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return data.map((item) => ({
      x: item.category,
      y: Math.round((item.count / total) * 100),
    }));
  };
  useEffect(() => {
    const initData = async () => {
      const data = await reportsAndNotesDistributionData();
      setGraphData(data);
    }
    initData()
  }, [])


  return (
    <View style={styles.mainContainer} >
      <DividerWithText fontSize={20} title={_.startCase(title)} />
      <VictoryPie
        radius={({ datum }) => 50 + datum.y * 1.2}
        width={screenWidth * 0.9}
        data={calculateStats(graphData)}
        colorScale={purpleShades}
        labelRadius={({ innerRadius }) => innerRadius ? Number(innerRadius) + 12 : 50}
        innerRadius={25}
        labels={({ datum }) => `${datum.y}%`}
        labelPosition={"centroid"}

        style={{ labels: { fill: 'white', fontSize: 16, fontWeight: 'bold' } }}
      />
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor: purpleShades[0] }]} />
          <Text style={styles.labelText}>Notes</Text>
        </View>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor: purpleShades[1] }]} />
          <Text style={styles.labelText}>Reports </Text>
        </View>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor: purpleShades[2] }]} />
          <Text style={styles.labelText}>Unmatched Reports</Text>
        </View>
      </View>
    </View>


  );
}; const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
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
      borderRadius: 50,
      borderColor: text.primary,
      borderWidth: 1,
    },
    labelText: {
      fontSize: 12,
      color: text.primary,
    },
  });

export default NotesAndReportsPieChart;
