import React,{useContext} from 'react';
import { View, Text, StyleSheet,Dimensions  } from 'react-native';
import { VictoryGroup,VictoryLine,VictoryLabel, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryAnimation  } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton,IText } from '../../utils/interfaces/interfaces';

interface Props {
  name: string;
}

const LineChart: React.FC<Props> = ({ name }) => {
  let title = 'Total Registered Users';
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
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
  const screenWidth = Dimensions.get('window').width;
  
  
  // Filter data to include every second month
  const filteredData = data.filter((_, index) => index % 2 === 0);
  const lastDataPoint = filteredData[filteredData.length - 1];
  return (
    <View style={styles.container}>
      <DividerWithText title={title} fontSize={15} />
      <VictoryChart width={screenWidth} theme={VictoryTheme.material}>
      <VictoryAxis
  style={{
    axis: {
      stroke: text.primary, // Axis line color
    },
    tickLabels: {
      fill: text.primary,
    },
  }}
/>

<VictoryAxis
  style={{
    axis: {
      stroke: text.primary, // Axis line color
    },
    tickLabels: {
      fill: text.primary,
    },
  }}
  dependentAxis
  domain={[0, 500]}
/>

        <VictoryLine  data={filteredData} x="month" y="users"
          animate={{ duration: 1000 }}
          style={{
            data:{stroke:primary}
          }}
        />
  
      </VictoryChart>
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
  },
});

export default LineChart;
