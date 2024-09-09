import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, SafeAreaView } from 'react-native';
import { FlatlistDemo } from './src/FlatlistDemo'
import { MyStack } from './src/MyStack'
import { MyProduct } from './src/MyProduct';
export default function App({ navigation, route }) {
  const [ShowScreen, SetShowScreen] = useState(false);
  return (
    <MyStack/>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  touchable: {

  }
});
