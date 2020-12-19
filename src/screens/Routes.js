import React from 'react';
import {Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import JobDetailScreen from './JobDetailScreen';
import LoginScreen from './LoginScreen';

const HomeStack = createStackNavigator();

const Root = () => {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      initialRouteName={LoginScreen}>
      <HomeStack.Screen name="LoginScreen" component={LoginScreen}/>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{headerLeft: false}}/>
      <HomeStack.Screen name="JobDetailScreen" component={JobDetailScreen} options={{headerBackTitleVisible: false}}/>
    </HomeStack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default Routes;
