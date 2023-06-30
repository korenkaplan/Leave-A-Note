import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';

interface Props {
  name: string;
}

const LineChart: React.FC<Props> = ({ name }) => {
  // Sample data with monthly user counts (replace with your actual data)
  const data = [
    { month: 'Jan', users: 0 },
    { month: 'feb', users: 10 },
    { month: 'mer', users: 18 },
    { month: 'apr', users: 28 },
    { month: 'May', users: 40 },
    { month: 'Jun', users: 130 },
    { month: 'Jul', users: 170 },
    { month: 'Aug', users: 200 },
    { month: 'Sep', users: 240 },
    { month: 'Oct', users: 270 },
    { month: 'Nov', users: 350 },
    { month: 'Dec', users: 400 },
    // ...add more data for each month
  ];

  // Filter data to include every second month
  const filteredData = data.filter((_, index) => index % 2 === 0);
  const lastDataPoint = filteredData[filteredData.length - 1];
  return (
    <View style={styles.container}>
      <DividerWithText title='Amount of Users' fontColor='black' fontSize={20} />
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryAxis />
        <VictoryAxis dependentAxis domain={[0, 500]} />
        <VictoryLine data={filteredData} x="month" y="users" />
        <VictoryLabel
          text={350}
          x={350}
          y={200}
          textAnchor="end"
          verticalAnchor="middle"
          style={{ fontSize: 16, fontWeight: 'bold' }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default LineChart;
