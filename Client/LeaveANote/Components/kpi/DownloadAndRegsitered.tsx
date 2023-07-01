import React,{useContext} from 'react';
import { View, Text, StyleSheet,Dimensions  } from 'react-native';
import {Circle, VictoryGroup,VictoryLine,VictoryLabel, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryAnimation,VictoryLegend  } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';
import { ThemeContext } from '../../context/ThemeContext';
import { StyleButton,IText } from '../../utils/interfaces/interfaces';

interface Props {
  name: string;
}

const DownloadAndRegistered: React.FC<Props> = ({ name }) => {
 
  const {theme, buttonTheme} = useContext(ThemeContext);
  const {primary, secondary, text, background} = theme.colors;
  const {buttonMain, buttonAlt} = buttonTheme;
  const styles = createStyles(primary, secondary, text, background,buttonMain, buttonAlt);
  let title = 'Registered Users vs Store Downloads';
  let downloadsLineColor = secondary;
  let circleColor = 'orange'

  const downloads = [
    { month: 'Jan-Feb', users: 13000 },
    { month: 'Mar-Apr', users: 22000 },
    { month: 'May-Jun', users: 32000 },
    { month: 'Jul-Aug', users: 42000 },
    { month: 'Sep-Oct', users: 52000 },
    { month: 'Nov-Dec', users: 70000 },
  ];
  const registeredUsers = [
    { month: 'Jan-Feb', users: 7500 },
    { month: 'Mar-Apr', users: 13000 },
    { month: 'May-Jun', users: 20000 },
    { month: 'Jul-Aug', users: 30000, label: 'Register Form Update' },
    { month: 'Sep-Oct', users: 48000 },
    { month: 'Nov-Dec', users: 67000 },
  ];


  // Filter data to include every second month
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <DividerWithText title={title} fontSize={15} />
      <VictoryChart width={screenWidth} theme={VictoryTheme.grayscale}
       padding={{ left: 65, right: 40, top: 20, bottom: 40 }} // Adjust the padding values
      >
          <VictoryLegend x={80} y={50}
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
  domain={[0, 100000]}
/>

        <VictoryLine  data={downloads} x="month" y="users"
          animate={{ duration: 1000 }}
          style={{
            data:{stroke:downloadsLineColor,strokeWidth:4}
          }}
        />
        
        <VictoryLine  data={registeredUsers} x="month" y="users"
          animate={{ duration: 1000 }}
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
          <View style={[styles.labelColor, { backgroundColor: downloadsLineColor,borderColor:primary  }]} />
          <Text style={styles.labelText}>Play Store Downloads</Text>
        </View>
        <View style={styles.label}>
          <View style={[styles.labelColor, { backgroundColor:primary,borderColor:secondary  }]} />
          <Text style={styles.labelText}>Registered Users</Text>
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
  },
  labelText: {
    fontSize: 12,
    color: text.primary,
  },
});

export default DownloadAndRegistered;
