import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';
import DividerWithText from '../uiComponents/DividerWithText';

interface Props {
    name: string;
}

const UnmatchedAndNote: React.FC<Props> = ({ name }) => {
    // Sample data with monthly unmatched reports and notes shown every two months (replace with your actual data)
    const data = [
        { month: 'Jan', unmatchedReports: 5, notesShown: 3 },
        { month: 'Feb', unmatchedReports: 8, notesShown: 4 },
        { month: 'Mar', unmatchedReports: 2, notesShown: 1 },
        { month: 'Apr', unmatchedReports: 3, notesShown: 2 },
        { month: 'May', unmatchedReports: 4, notesShown: 1 },
        { month: 'Jun', unmatchedReports: 2, notesShown: 3 },
        { month: 'Jul', unmatchedReports: 6, notesShown: 2 },
        { month: 'Aug', unmatchedReports: 1, notesShown: 1 },
        { month: 'Sep', unmatchedReports: 3, notesShown: 2 },
        { month: 'Oct', unmatchedReports: 5, notesShown: 1 },
        { month: 'Nov', unmatchedReports: 7, notesShown: 2 },
    ];
    const filteredData = data.filter((_, index) => index % 2 === 0);

    return (
        <View style={styles.container}>
            <DividerWithText title='Unmatched Reports vs Notes' fontColor='black' fontSize={20} />
            <VictoryChart width={350} theme={VictoryTheme.material}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryBar data={filteredData} x="month" y="unmatchedReports" />
                <VictoryBar data={filteredData} x="month" y="notesShown" />
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

export default UnmatchedAndNote;
