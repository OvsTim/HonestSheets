import React, {useState} from 'react';
import {StatusBar, useWindowDimensions, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import BaseButton from '../_CustomComponents/BaseButton';
import {useAppDispatch} from '../../redux';
import {AuthModal} from './AuthModal';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Auth'>;
};

export default function AuthScreen({navigation}: Props) {
  const [visible, setVisible] = useState<boolean>(false);

  //region jsx

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <BaseButton
        text={'Войти'}
        onPress={() => {
          // setLoading(true);
          // dispatch(authRequest())
          //   .then(unwrapResult)
          //   .then(res => {
          //     setLoading(false);
          setVisible(true);
          // console.log('res', res);
          // })
          // .catch(er => {
          //   setLoading(false);
          //
          //   Alert.alert('Ошибка', er);
          // });
        }}
      />
      <AuthModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onEmployeeSelected={e => {
          if (e.employeeType === 'MEDIC' || e.employeeType === 'TECHNICIAN') {
            navigation.navigate('Search');
          } else if (e.employeeType === 'OPERATOR') {
            navigation.navigate('CreateReport');
          }
        }}
      />
    </View>
  );
  //endregion jsx
}
