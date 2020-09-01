import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainFeed from '../MainFeed';
import DetailsScreen from '../Details';
import NavTabs from '../NavTabs'

const { Navigator, Screen } = createBottomTabNavigator();

// put main screens here
const HomeNavigator = () => (
  <Navigator tabBar={props => <NavTabs {...props} />}>
    <Screen name='Home' component={MainFeed}/>
    <Screen name='Details' component={DetailsScreen}/>
  </Navigator>
);

const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);

export default AppNavigator;