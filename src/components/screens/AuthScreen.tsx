import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import BaseButton from '../_CustomComponents/BaseButton';
import {useAppDispatch, useSelector} from '../../redux';
import {auth, Employee} from '../../API';
import {authEmployeeRequest, authRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import Modal from 'react-native-modal';
import {setTokenAndEmployee} from '../../redux/UserDataSlice';
import {AuthModal} from './AuthModal';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Auth'>;
};

const Button = withPressable(View);

export default function AuthScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();
  const [loading, setLoading] = useState<boolean>(false);
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
        loading={loading}
        text={'Войти'}
        onPress={() => {
          setLoading(true);
          dispatch(authRequest())
            .then(unwrapResult)
            .then(res => {
              setLoading(false);
              setVisible(true);
              console.log('res', res);
            })
            .catch(er => {
              setLoading(false);

              Alert.alert('Ошибка', er);
            });
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
