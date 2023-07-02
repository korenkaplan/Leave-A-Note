import React, { useState } from 'react';
import { View, Text, Dimensions, Button } from 'react-native';
import { VictoryPie, VictoryChart, VictoryTheme } from 'victory-native';

interface Props {
  name: string;
}

const NotesAndReportsPieChart: React.FC<Props> = ({ name }) => {
  const screenWidth = Dimensions.get('window').width;

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth()); // Default to the current month

  const monthlyData = [
    [
      { category: 'Notes', count: 30 },
      { category: 'Reports', count: 50 },
      { category: 'Unmatched \n Reports', count: 100 },
    ],
    [
      { category: 'Notes', count: 20 },
      { category: 'Reports', count: 10 },
      { category: 'Unmatched \n Reports', count: 100 },
    ],
    [
      { category: 'Notes', count: 20 },
      { category: 'Reports', count: 10 },
      { category: 'Unmatched \n Reports', count: 100 },
    ],
    [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
      [
        { category: 'Notes', count: 20 },
        { category: 'Reports', count: 10 },
        { category: 'Unmatched \n Reports', count: 100 },
      ],
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
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
    <View>
      <VictoryPie
        data={monthlyStats[selectedMonth]}
        theme={VictoryTheme.grayscale}
        labelRadius={({ innerRadius }) => innerRadius + 10}
        radius={({ datum }) => 50 + datum.y * 2.8}
        innerRadius={50}
        labels={({ datum }) => `${datum.x} \n ${datum.y}%`}
        style={{ labels: { fill: 'white', fontSize: 15, fontWeight: 'bold' } }}
      />
      {/* Render buttons for each month */}
      {monthlyStats.map((_, index) => (
        <Button
          key={index}
          title={`${monthNames[index]}`}
          onPress={() => handleMonthChange(index)}
        />
      ))}
    </View>
  );
};

export default NotesAndReportsPieChart;
