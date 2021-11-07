import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import BaseInput from '../_CustomComponents/BaseInput';
import CheckBox from '@react-native-community/checkbox';
import BaseButton from '../_CustomComponents/BaseButton';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch, useSelector} from '../../redux';
import {EmployeeData} from '../../API';
import {postTechCreateRequest, postTechEditRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PostTech'>;
  route: RouteProp<AuthStackParamList, 'PostTech'>;
};

export default function PostTechScreen({navigation, route}: Props) {
  //region jsx
  const distRef = useRef<TextInput>(null);
  const [dist, setDist] = useState<string>('');
  const [passed, setPassed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {width} = useWindowDimensions();
  const token: string = useSelector<string>(state => state.data.token);
  const employeeData: EmployeeData = useSelector<EmployeeData>(
    state => state.data.employeeData,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log('ROUTE', JSON.stringify(route.params));
  }, []);

  function sendRequest() {
    if (!dist) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    setLoading(true);
    if (route.params.type === 'add') {
      dispatch(
        postTechCreateRequest({
          token,
          data: {
            checkupData: {odometerData: dist, washed: passed},
            type: 'POST_TECH',
            specialist: {id: employeeData.id},
            waybill: {id: route.params.waybillId},
          },
        }),
      )
        .then(unwrapResult)
        .then(_ => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(er => {
          setLoading(false);

          Alert.alert('Ошибка', er);
        });
    } else {
      dispatch(
        postTechEditRequest({
          CheckupID: route.params.checkupId ? route.params.checkupId : 0,
          token,
          data: {
            type: 'POST_TECH',
            id: route.params.checkupId ? route.params.checkupId : 0,
            dateTimePassed: dayjs(new Date()).format().toString(),
            checkupData: {odometerData: dist, washed: passed},
            specialist: {
              id: employeeData.id,
              abbreviatedName: employeeData.user.abbreviatedName,
              organization: {
                id: employeeData.organization.id,
                shortName: employeeData.organization.shortName,
              },
            },
            waybill: {id: route.params.waybillId},
          },
        }),
      )
        .then(unwrapResult)
        .then(_ => {
          setLoading(false);
          navigation.goBack();
        })
        .catch(er => {
          setLoading(false);

          Alert.alert('Ошибка', er);
        });
    }
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <BaseInput
        inputRef={distRef}
        value={dist}
        onTextChanges={term => setDist(term.replace(/[^0-9]/g, ''))}
        styleInput={{}}
        styleContainer={{marginTop: 16}}
        editable={true}
        placeholder={'Пробег автомобиля'}
        label={'Пробег автомобиля'}
        inputProps={{
          keyboardType: 'number-pad',
        }}
        labelStyle={{}}
        showLabel={true}
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
          onChange={(event: {
            nativeEvent: {value: boolean | ((prevState: boolean) => boolean)};
          }) => setPassed(event.nativeEvent.value)}
        />
        <Text>Машина помыта</Text>
      </Pressable>
      <BaseButton
        loading={loading}
        text={'Сохранить'}
        onPress={() => {
          if (!loading) {
            sendRequest();
          }
        }}
      />
    </View>
  );
}
