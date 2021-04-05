import React, {Component} from 'react';
import {Text, StyleSheet, View, Button, TextInput} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screen/Home';
import AddNote from '../screen/AddNote';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AddNote" component={AddNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
