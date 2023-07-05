import React,{useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet,Dimensions  } from 'react-native';
import {VictoryLine,VictoryChart, VictoryTheme, VictoryAxis} from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { IText, RegisteredUsersPerMonthAmount } from '../../utils/interfaces/interfaces';
import { MainContext } from '../../context/ContextProvider';
import _ from 'lodash';

interface Props {
  title: string;
}

const RegisteredUsers: React.FC<Props> = ({ title }) => {
  const {theme} = useContext(ThemeContext);
  const {registeredUsersData} = useContext(MainContext);
  const [graphData, setGraphData] = useState<RegisteredUsersPerMonthAmount[]>([])
  const [currantYear, setCurrantYear] = useState('')
  const {primary,text, background} = theme.colors;
  const styles = createStyles(text, background);
  

  const maxUsers = Math.max(...graphData.map(({ users }) => users),1);
  // Filter data to include every second month
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const currantYear = new Date().getFullYear().toString();
    setCurrantYear(currantYear)
    const initData = async () => {
    const [status,data] = await registeredUsersData(currantYear);
    setGraphData(data)
    };
    initData();
  }, [])
  
  return (
    <View style={styles.container}>
      <DividerWithText title={`${_.startCase(title)} ${currantYear}`} fontSize={15} />
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
  domain={[0,Math.floor(maxUsers* 1.5)]}
/>


        
        <VictoryLine  data={graphData} x="month" y="users"
          style={{
            data:{stroke:primary,strokeWidth:4}
            
          }}
        
        />
  
      </VictoryChart>

      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor:primary  }]} />
          <Text style={styles.labelText}>Registered Users {currantYear}</Text>
        </View>
      </View>
    </View>
  );
};
const createStyles = ( text: IText, background: string) =>
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
    borderColor:text.primary,
    borderWidth:1,
  },
  labelText: {
    fontSize: 12,
    color: text.primary,
  },
});

export default RegisteredUsers;
