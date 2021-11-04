import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {RootState} from '../redux';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return <Stack.Navigator>{AuthNavigator()}</Stack.Navigator>;
}
