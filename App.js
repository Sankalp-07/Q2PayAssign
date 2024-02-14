import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image
} from 'react-native';
import axios from 'axios';
import ProductScreen from './src/ProductScreen';
import ProductDetails from './src/ProductDetails';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductPage" component={ProductScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
}

const App = () => {
 
  return (
    <>
     <NavigationContainer>
      <MyStack />
    </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,

  },
  imgStyleView: {
    justifyContent:'center'
  },
  imgStyle: {
    width: 100, 
    height: 100
  },
  productdetails: {
    width:'68%',
    marginLeft:5
  }
});

export default App;
