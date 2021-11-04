import React from 'react';
import { StatusBar, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PostTech'>;
};

const Button = withPressable(View);

export default function PostTechScreen({navigation}: Props) {


  //region jsx

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Text>PostTechScreen</Text>

    </View>
  );
  //endregion jsx
}
