import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Animated,
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
import {preMedCreateRequest, preMedEditRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import dayjs from 'dayjs';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PreMed'>;
  route: RouteProp<AuthStackParamList, 'PreMed'>;
};

export default function PreMedScreen({navigation, route}: Props) {
  //region jsx
  const [temperature, setTemperature] = useState<string>('');
  const [bloodPressureSys, setBloodPressureSys] = useState<string>('');
  const [bloodPressureDia, setBloodPressureDia] = useState<string>('');
  const [passed, setPassed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const tempRef = useRef<TextInput>(null);
  const bloodPressureSysRef = useRef<TextInput>(null);
  const bloodPressureDiaRef = useRef<TextInput>(null);
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
    if (!temperature || !bloodPressureSys || !temperature) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    setLoading(true);
    if (route.params.type === 'add') {
      dispatch(
        preMedCreateRequest({
          token,
          data: {
            type: 'PRE_MED',
            waybill: {id: route.params.waybillId},
            specialist: {id: employeeData.id},
            checkupData: {
              bloodPressureDia,
              bloodPressureSys,
              bodyTemperature: temperature,
              alcoholTestPassed: passed,
            },
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
        preMedEditRequest({
          token,
          CheckupID: route.params.checkupId ? route.params.checkupId : 0,
          data: {
            id: route.params.checkupId ? route.params.checkupId : 0,
            type: 'PRE_MED',
            specialist: {
              id: employeeData.id,
              abbreviatedName: employeeData.user.abbreviatedName,
              organization: {
                id: employeeData.organization.id,
                shortName: employeeData.organization.shortName,
              },
            },
            checkupData: {
              bloodPressureDia,
              bloodPressureSys,
              bodyTemperature: temperature,
              alcoholTestPassed: passed,
            },
            waybill: {id: route.params.waybillId},
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
        inputRef={tempRef}
        value={temperature}
        onTextChanges={term => setTemperature(term.replace(/[^0-9.]/g, ''))}
        styleInput={{}}
        styleContainer={{marginTop: 16}}
        editable={true}
        placeholder={'Температура'}
        label={'Температура'}
        inputProps={{
          keyboardType: 'decimal-pad',
          returnKeyType: 'next',
          onSubmitEditing: () => {
            bloodPressureSysRef.current?.focus();
          },
        }}
        labelStyle={{}}
        showLabel={true}
      />
      <BaseInput
        inputRef={bloodPressureSysRef}
        value={bloodPressureSys}
        onTextChanges={term => setBloodPressureSys(term.replace(/[^0-9]/g, ''))}
        styleInput={{}}
        styleContainer={{marginTop: 16}}
        editable={true}
        placeholder={'Систолическое давление'}
        label={'Систолическое давление'}
        inputProps={{
          keyboardType: 'number-pad',
          returnKeyType: 'next',
          onSubmitEditing: () => {
            bloodPressureDiaRef.current?.focus();
          },
        }}
        labelStyle={{}}
        showLabel={true}
      />
      <BaseInput
        inputRef={bloodPressureDiaRef}
        value={bloodPressureDia}
        onTextChanges={term => setBloodPressureDia(term.replace(/[^0-9]/g, ''))}
        styleInput={{}}
        styleContainer={{marginTop: 16}}
        editable={true}
        placeholder={'Диастолическое давление'}
        label={'Диастолическое давление'}
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
