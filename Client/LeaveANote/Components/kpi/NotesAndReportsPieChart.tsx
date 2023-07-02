import React, { useState, useContext } from 'react';
import { View, Text, Dimensions, Button, StyleSheet, TextInput } from 'react-native';
import { VictoryPie, VictoryChart, VictoryTheme } from 'victory-native';
import ModalSelector from 'react-native-modal-selector'
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces';
import { MainContext } from '../../context/ContextProvider';
import Main from '../../Main';
interface Props {
  title: string;
}
const NotesAndReportsPieChart: React.FC<Props> = ({ title }) => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const {currentUser} = useContext(MainContext);
  const { primary, secondary, text, background } = theme.colors;
  const { buttonMain, buttonAlt } = buttonTheme;
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);
  const purpleShades = ['#5D3FD3', '#702963', '#483248']
  const screenWidth = Dimensions.get('window').width;
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to the current month
  const monthlyData = [
    [
      { category: 'Notes', count: 30 },
      { category: 'Reports', count: 40 },
      { category: 'Unmatched \n Reports', count: 30 },
    ],
    [
      { category: 'Notes', count: 35 },
      { category: 'Reports', count: 45 },
      { category: 'Unmatched \n Reports', count: 35 },
    ],
    [
      { category: 'Notes', count: 40 },
      { category: 'Reports', count: 50 },
      { category: 'Unmatched \n Reports', count: 40 },
    ],
    [
      { category: 'Notes', count: 45 },
      { category: 'Reports', count: 55 },
      { category: 'Unmatched \n Reports', count: 45 },
    ],
    [
      { category: 'Notes', count: 50 },
      { category: 'Reports', count: 60 },
      { category: 'Unmatched \n Reports', count: 50 },
    ],
    [
      { category: 'Notes', count: 55 },
      { category: 'Reports', count: 65 },
      { category: 'Unmatched \n Reports', count: 55 },
    ],
    [
      { category: 'Notes', count: 60 },
      { category: 'Reports', count: 70 },
      { category: 'Unmatched \n Reports', count: 60 },
    ],
    [
      { category: 'Notes', count: 65 },
      { category: 'Reports', count: 75 },
      { category: 'Unmatched \n Reports', count: 65 },
    ],
    [
      { category: 'Notes', count: 70 },
      { category: 'Reports', count: 80 },
      { category: 'Unmatched \n Reports', count: 70 },
    ],
    [
      { category: 'Notes', count: 75 },
      { category: 'Reports', count: 85 },
      { category: 'Unmatched \n Reports', count: 75 },
    ],
    [
      { category: 'Notes', count: 80 },
      { category: 'Reports', count: 90 },
      { category: 'Unmatched \n Reports', count: 80 },
    ],
    [
      { category: 'Notes', count: 85 },
      { category: 'Reports', count: 95 },
      { category: 'Unmatched \n Reports', count: 85 },
    ],
  ];
  const monthNames = [
    { key: 0, label: 'January' },
    { key: 1, label: 'February' },
    { key: 2, label: 'March' },
    { key: 3, label: 'April' },
    { key: 4, label: 'May' },
    { key: 5, label: 'June' },
    { key: 6, label: 'July' },
    { key: 7, label: 'August' },
    { key: 8, label: 'September' },
    { key: 9, label: 'October' },
    { key: 10, label: 'November' },
    { key: 11, label: 'December' },
  ];


  const calculateStats = (data: { category: string; count: number }[]) => {
    const total = data.reduce((sum, item) => sum + item.count, 0);
    return data.map((item) => ({
      x: item.category,
      y: Math.round((item.count / total) * 100),
    }));
  };

  const monthlyStats = monthlyData.map(calculateStats);

  const handleMonthChange = (monthIndex: number) => {
    setSelectedMonth(monthIndex);
  };

  return (
    <View >
      <DividerWithText title={title}/>
      <ModalSelector
        data={monthNames}
        initValue="Select something yummy!"
        supportedOrientations={['landscape']}
        accessible={true}
        scrollViewAccessibilityLabel={'Scrollable options'}
        cancelButtonAccessibilityLabel={'Cancel Button'}
        onChange={(option) => handleMonthChange(option.key)}>

        <TextInput
          style={styles.selectBtn}
          editable={false}
          value={'Select Month: ' + monthNames[selectedMonth].label} />

      </ModalSelector>
      <VictoryPie
        width={screenWidth}
        data={monthlyStats[selectedMonth]}
        colorScale={purpleShades}
        labelRadius={({ innerRadius }) => innerRadius ? Number(innerRadius) + 15 : 15}
        innerRadius={50}
        labels={({ datum }) => `${datum.x}\n${datum.y}%`}
        style={{ labels: { fill: 'white', fontSize: 15, fontWeight: 'bold' } }}
      />

    </View>


  );
}; const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton, buttonAlt: StyleButton) =>
  StyleSheet.create({
    selectBtn: {
      color: buttonMain.text, borderWidth: 1,
      borderColor: '#ccc',
      backgroundColor: buttonMain.background,
      textAlign: 'center',
      padding: 10,
      width: '50%',
      alignSelf: 'center',
      height: 40,
      borderRadius: 20,
    }
  });

export default NotesAndReportsPieChart;
