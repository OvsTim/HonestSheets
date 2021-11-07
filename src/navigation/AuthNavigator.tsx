import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '../components/screens/AuthScreen';
import PostMedScreen from '../components/screens/PostMedScreen';
import PreMedScreen from '../components/screens/PreMedScreen';
import PreTechScreen from '../components/screens/PreTechScreen';
import PostTechScreen from '../components/screens/PostTechScreen';
import ReportScreen from '../components/screens/ReportScreen';
import SearchScreen from '../components/screens/SearchScreen';

export type AuthStackParamList = {
  One: undefined;
  Three: {paramString: string} | undefined;
  Auth: undefined;
  PostMed: {waybillId: number; checkupId?: number; type: 'add' | 'edit'};
  PreMed: {waybillId: number; checkupId?: number; type: 'add' | 'edit'};
  PreTech: {waybillId: number; checkupId?: number; type: 'add' | 'edit'};
  PostTech: {waybillId: number; checkupId?: number; type: 'add' | 'edit'};
  Report: {id: number};
  Search: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{title: 'Вход'}}
      />
      <Stack.Screen
        name="PostMed"
        component={PostMedScreen}
        options={{title: 'ПостМедосмотр'}}
      />
      <Stack.Screen
        name="PreMed"
        component={PreMedScreen}
        options={{title: 'ПредМедосмотр'}}
      />
      <Stack.Screen
        name="PreTech"
        component={PreTechScreen}
        options={{title: 'ПредТехосмотр'}}
      />
      <Stack.Screen
        name="PostTech"
        component={PostTechScreen}
        options={{title: 'ПостТехосмотр'}}
      />
      <Stack.Screen
        name="Report"
        component={ReportScreen}
        options={{title: 'Отчет'}}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: 'Поиск'}}
      />
    </>
  );
}
