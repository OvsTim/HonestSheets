import React, {useEffect, useState} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import CheckBox from '@react-native-community/checkbox';
import BaseButton from '../_CustomComponents/BaseButton';
import {RouteProp} from '@react-navigation/native';
import {useSelector} from '../../redux';
import {EmployeeData} from '../../API';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PostMed'>;
  route: RouteProp<AuthStackParamList, 'PostMed'>;
};

export default function PostMedScreen({navigation, route}: Props) {
  //region jsx
  const [passed, setPassed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const token: string = useSelector<string>(state => state.data.token);
  const employeeData: EmployeeData = useSelector<EmployeeData>(
    state => state.data.employeeData,
  );

  const {width} = useWindowDimensions();

  useEffect(() => {
    console.log('ROUTE', JSON.stringify(route.params));
  }, []);
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Pressable
        onPress={() => setPassed(prevState => !prevState)}
        style={{
          flexDirection: 'row',
          width: width - 32,
          marginHorizontal: 16,
          marginBottom: 16,
          alignItems: 'center',
          marginTop: 16,
        }}>
        <CheckBox
          value={passed}
          onChange={event => setPassed(event.nativeEvent.value)}
        />
        <Text>Пройден тест на алкоголь</Text>
      </Pressable>
      <BaseButton loading={loading} text={'Сохранить'} onPress={() => {}} />
    </View>
  );
  //endregion jsx
}
