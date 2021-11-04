import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TwoScreen from '../components/_blank/Two';

export type AppStackParamList = {
  Two: undefined;
};

const Stack = createStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <>
      <Stack.Screen
        name="Two"
        component={TwoScreen}
        options={{title: 'TwoScreen'}}
      />
    </>
  );
}
