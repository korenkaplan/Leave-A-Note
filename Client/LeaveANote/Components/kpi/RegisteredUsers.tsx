import React,{useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet,Dimensions  } from 'react-native';
import {Circle, VictoryGroup,VictoryLine,VictoryLabel, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryAnimation,VictoryLegend  } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton,IText, RegisteredUsersPerMonthAmount } from '../../utils/interfaces/interfaces';
import { MainContext } from '../../context/ContextProvider';
interface Props {
  title: string;
}

const RegisteredUsers: React.FC<Props> = ({ title }) => {
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {registeredUsersData} = useContext(MainContext);
  const [graphData, setGraphData] = useState<RegisteredUsersPerMonthAmount[]>([])
  const [axisYMax, setAxisYMax] = useState(0)
  const [currantYear, setCurrantYear] = useState('')
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
  
  let circleColor = 'orange'
  const registeredUsers = [
    { month: 'Jan', users: 0 },
    { month: 'Feb', users: 7000},
    { month: 'Mer', users: 9000 },
    { month: 'Apr', users: 11000 },
    { month: 'May', users: 12000, label: 'Register Form Update'},
    { month: 'Jun', users: 20000 },
    { month: 'Jul', users: 25000 },
    { month: 'Aug', users: 30000 },
  ];
  const maxUsers = Math.max(...registeredUsers.map(({ users }) => users));
  // Filter data to include every second month
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const currantYear = new Date().getFullYear().toString();
    setCurrantYear(currantYear)
    const initData = async () => {
    const [status,data] = await registeredUsersData(currantYear);
    console.log(status);
    console.log(data);
    setGraphData(data)
    const maxUsers = Math.max(...data.map(({ users }) => users));
    setAxisYMax(maxUsers)
    };
    initData();
  }, [])
  
  return (
    <View style={styles.container}>
      <DividerWithText title={`${title} ${currantYear}`} fontSize={15} />
      <VictoryChart width={screenWidth} theme={VictoryTheme.grayscale}
       padding={{ left: 65, right: 40, top: 20, bottom: 40 }} // Adjust the padding values
      >
          {/* <VictoryLegend x={80} y={50}
  	title="Events"
    centerTitle
    orientation="vertical"
    gutter={20}
    style={{
      border: { stroke: text.primary },
      title: { fontSize: 20, fill: text.primary }, // Change the title color to red
      labels: { fill: circleColor },
    }}
    data={[
      { name: "Ui/Ux Update", symbol: { fill: circleColor, type: "circle" } },
    ]}
  /> */}
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
  domain={[0,axisYMax*1.5]}
/>


        
        <VictoryLine  data={graphData} x="month" y="users"
          style={{
            data:{stroke:primary,strokeWidth:4}
            
          }}
          labelComponent={
            <Circle  cx={1} cy={2} r={5} style={{}} fill={circleColor}/>
          }
        
        />
  
      </VictoryChart>

      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor:primary,borderColor:secondary  }]} />
          <Text style={styles.labelText}>Registered Users {currantYear}</Text>
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
    borderRadius:50,
  },
  labelText: {
    fontSize: 12,
    color: text.primary,
  },
});

export default RegisteredUsers;
