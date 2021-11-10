import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useSelector} from '../../redux';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import {AuthModal} from './AuthModal';
import BaseInput from '../_CustomComponents/BaseInput';
import BaseButton from '../_CustomComponents/BaseButton';
import {DriverFromSearch, getVehicle} from '../../API';
import {setTempDriver} from '../../redux/UserDataSlice';
import {getLastVehicleIdRequest, getVehicleRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import * as Progress from 'react-native-progress';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'CreateReport'>;
};

export default function CreateReportScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.data.token);
  const tempDriver: DriverFromSearch = useSelector(
    state => state.data.tempDriver,
  );
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingVehicle, setLoadingVehicle] = useState<boolean>(false);
  const {width} = useWindowDimensions();
  const Button = withPressable(View);

  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        {
          dispatch(setTempDriver({id: 0, fullName: ''}));
        }
      }),
    [navigation],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{marginRight: 8}}>
          <Button
            onPress={() => {
              setVisible(true);
            }}
            containerStyle={{}}>
            <Image
              style={{width: 32, height: 32}}
              source={require('../../assets/outline_account_circle_black_24.png')}
            />
          </Button>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // console.log('tempDriver', tempDriver);
    if (tempDriver.id !== 0) {
      setLoadingVehicle(true);
      dispatch(getLastVehicleIdRequest({token, driver_id: tempDriver.id}))
        .then(unwrapResult)
        .then(res => {
          setLoadingVehicle(false);
          if (res) {
            dispatch(getVehicleRequest({token, id: res}))
              .then(unwrapResult)
              .then(res => {
                console.log('Vehicle', res);
              })
              .catch(er => {
                setLoadingVehicle(false);
                Alert.alert('Ошибка', er);
              });
          } else {
            setLoadingVehicle(false);
            Alert.alert(
              'Ошибка',
              'Не найдена последнее транспортное средство для этого водителя',
            );
          }
        })
        .catch(er => {
          setLoadingVehicle(false);
          Alert.alert('Ошибка', er);
        });
    }
  }, [tempDriver, token]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Pressable
        onPress={() => {
          dispatch(setTempDriver({id: 0, fullName: ''}));
          navigation.navigate('SearchDriver');
        }}>
        <BaseInput
          value={tempDriver.fullName}
          styleInput={{color: 'black'}}
          styleContainer={{marginTop: 16}}
          editable={false}
          placeholder={'Водитель'}
          label={'Водитель'}
          inputProps={{}}
          labelStyle={{}}
          showLabel={true}
        />
        {loadingVehicle && (
          <Progress.CircleSnail
            size={32}
            style={{
              position: 'absolute',
              right: 0,
              alignSelf: 'center',
              top: 16,
            }}
            color={['#DEDEDE', 'gray']}
          />
        )}
      </Pressable>

      <Text style={{width: width - 32, marginVertical: 16}}>
        Транспортное средство: не выбрано
      </Text>
      <BaseButton loading={loading} text={'Создать'} onPress={() => {}} />
      <AuthModal
        isVisible={visible}
        onClose={() => setVisible(false)}
        onEmployeeSelected={e => {
          if (e.employeeType === 'MEDIC' || e.employeeType === 'TECHNICIAN') {
            navigation.reset({
              index: 1,
              routes: [{name: 'Auth'}, {name: 'Search'}],
            });
          } else if (e.employeeType === 'OPERATOR') {
            // navigation.navigate('CreateReport');
          }
        }}
      />
    </View>
  );
}
