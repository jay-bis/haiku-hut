import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { logout } from '../../actions/LoginActions.js';
import MainFeed from '../MainFeed';
import DetailsScreen from '../Details';
import NavTabs from '../NavTabs'
import LoginScreen from '../LoginScreen';

const { Navigator, Screen } = createBottomTabNavigator();

export interface State {
  login: LoginObject
}

export interface LoginObject {
  token: String,
  signedIn: Boolean
}

// put main screens here
const HomeNavigator = () => {

  return (
    <Navigator tabBar={props => <NavTabs {...props} />}>
        <Screen 
          name='Home' 
          component={MainFeed}
          />
        <Screen name='Details' component={DetailsScreen}/>
    </Navigator>
  )
};

const LoginStack = createStackNavigator();

const AppNavigator = (props: LoginObject) => {
  
  const theme = useTheme();
  return (
    <NavigationContainer>
      { !props.signedIn ?
        <LoginStack.Navigator>
          <LoginStack.Screen
           name='Login' 
           component={LoginScreen}
           options={{
             animationTypeForReplace: 'pop',
             headerStyle: {
               backgroundColor: theme['color-primary-500']
             },
             headerTintColor: theme['color-primary-100']
           }}
           />
        </LoginStack.Navigator>
        :
        <HomeNavigator/>
      }
    </NavigationContainer>
  )
};

const mapStateToProps = (state: State) => ({
  token: state.login.token,
  signedIn: state.login.signedIn
});

export default connect(mapStateToProps)(AppNavigator);