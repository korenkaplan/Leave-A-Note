import { View, StyleSheet, Dimensions,TextInput  } from 'react-native';
import React from 'react';
import { Heading, VStack ,Stack,Input} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from "../assets/note-taking.svg";
export default function Homepage({ navigation }) {
  const widthPercent = 100;
  const heightPercent = 40;
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const width = (windowWidth * widthPercent) / 100;
  const height = (windowHeight * heightPercent) / 100;
  const [value, setValue] = React.useState('');

  const handleInputChange = (text) => {
    // Handle input change logic
    setValue(text);
  };
  return (
    <View style={styles.container}>
      <VStack alignItems="center" flex={1}>
        <Logo width={width} height={height} />
        <Heading>Leave A Note</Heading>
        <View style>
      {/* <Ionicons name="search" color ={"black"} size={24}/> */}
        <Input
        width={width- 100}
        placeholder='Search Car Number'
        variant="underlined"
        value={value}
        onChangeText={handleInputChange}
        style={styles.searchInput}
        keyboardType="numeric" // Set keyboardType to 'numeric'
      />
        </View>
   
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


});
