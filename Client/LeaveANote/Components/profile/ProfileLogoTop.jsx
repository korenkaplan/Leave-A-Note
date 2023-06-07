import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import Logo from '../../assets/note-taking.svg';

export default function ProfileLogoTop() {
  return (
      <Logo style ={styles.logo} />
  )
}
const styles =  StyleSheet.create({
    logo:{
      width:'25%',
      height:'70%',
         borderColor:'black',
      borderWidth: 2,
      borderRadius:50,
      backgroundColor:'white'
    }
  });