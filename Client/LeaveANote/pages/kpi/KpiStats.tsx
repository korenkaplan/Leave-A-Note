import { View, StyleSheet} from 'react-native'
import React, { FC, useContext, useState } from 'react'
import NotesAndReportsPieChart from './NotesAndReportsPieChart'
import { ThemeContext } from '../../context/ThemeContext';
import { IText, StyleButton } from '../../utils/interfaces/interfaces'
import RegisteredUsers from './RegisteredUsers'
import { Tab, TabView } from '@rneui/themed';
import { IModalButton } from '../../utils/interfaces/interfaces'
const KpiStats: FC = () => {
  const { theme, buttonTheme } = useContext(ThemeContext);
  const { primary, secondary, text, background } = theme.colors;
  const { buttonMain, buttonAlt } = buttonTheme;
  const [index, setIndex] = useState(0);
  const styles = createStyles(primary, secondary, text, background, buttonMain, buttonAlt);
  return (
    <View style={{flex:1, backgroundColor:background}}>
            <TabView
        value={index}
        onChange={setIndex}
        animationType="spring"
        disableSwipe={false}
      >
         <TabView.Item style={styles.tabView}>
      <NotesAndReportsPieChart title='distribution of reports and notes' />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
      <RegisteredUsers title='registered users' />
        </TabView.Item>
      </TabView>
      <Tab
         value={index}
         onChange={(e) => setIndex(e)}
         style={styles.tabMenu}
         indicatorStyle={{
           backgroundColor: buttonMain.text,
           height: 4,
           borderTopRightRadius:50,
           borderBottomLeftRadius:50, 
           borderTopStartRadius:5,
           borderBottomEndRadius:5,
           width:'10%',
           marginLeft:'14%',
           marginBottom: 5,
           elevation:10
         }}
      >
         <Tab.Item
          style={styles.tabItem}
          // titleStyle={styles.tabLabel}
          // activeTitleStyle={styles.activeTabLabel} // Apply activeTabLabel style when the tab is active
          icon={{
            name: 'pie-chart-outline',
            type: 'ionicon',
            color: buttonMain.text,
          }}
        />
        <Tab.Item
          style={styles.tabItem}
          // title="Edit information"
          // titleStyle={styles.tabLabel}
          icon={{
            name: 'bar-chart-outline',
            type: 'ionicon',
            color: buttonMain.text,
          }}
        />
      </Tab>
    </View>
   
  )
}

const createStyles = (primary: string, secondary: string, text: IText, background: string, buttonMain: StyleButton) =>
  StyleSheet.create({

    tabView: {
      flex: 1,
    },
    tabItem: {
      flex: 1,
      backgroundColor: 'primary',
    },
    tabMenu: {
      backgroundColor: primary,
      borderTopRightRadius:50,
      borderBottomLeftRadius:50, 
      borderTopStartRadius:5,
      borderBottomEndRadius:5,
      borderColor:text.primary,
      borderWidth:1.5,
      margin:5,
      elevation:10,
      height:52,
      marginBottom:15,
      width:'60%',
      alignSelf: 'center',
    },
    tabLabel: {
      color: buttonMain.text,
      fontSize: 12,
    },
    tabIcon: {
      color: buttonMain.text,
    },
    activeTabIcon: {
      color: secondary, // Set the color of the active tab icon to secondary
    },

  });
export default KpiStats