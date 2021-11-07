import React, {useEffect, useState} from 'react';
import {
  Alert,
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
import {useAppDispatch, useSelector} from '../../redux';
import {EmployeeData} from '../../API';
import {postMedCreateRequest, postMedEditRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

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
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();

  useEffect(() => {
    console.log('ROUTE', JSON.stringify(route.params));
  }, []);

  function sendRequest() {
    setLoading(true);
    if (route.params.type === 'add') {
      dispatch(
        postMedCreateRequest({
          token,
          data: {
            type: 'POST_MED',
            specialist: {id: employeeData.id},
            waybill: {id: route.params.waybillId},
            checkupData: {alcoholTestPassed: passed},
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

          Alert.alert('Ошибка', JSON.stringify(er));
        });
    } else {
      dispatch(
        postMedEditRequest({
          token,
          CheckupID: route.params.checkupId ? route.params.checkupId : 0,
          data: {
            type: 'POST_MED',
            waybill: {id: route.params.waybillId},
            checkupData: {alcoholTestPassed: passed},
            specialist: {
              id: employeeData.id,
              abbreviatedName: employeeData.user.abbreviatedName,
              organization: {
                id: employeeData.organization.id,
                shortName: employeeData.organization.shortName,
              },
            },
            id: route.params.checkupId ? route.params.checkupId : 0,
            dateTimePassed: dayjs(new Date()).format().toString(),
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

          Alert.alert('Ошибка', JSON.stringify(er));
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
  //endregion jsx
}
