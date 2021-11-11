import React, {useState} from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {RouteProp, useFocusEffect} from '@react-navigation/native';
import {useAppDispatch, useSelector} from '../../redux';
import {getReportRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {Checkup, CheckupType, Employee, Report} from '../../API';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Report'>;
  route: RouteProp<AuthStackParamList, 'Report'>;
};

export default function ReportScreen({navigation, route}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector<string>(state => state.data.token);
  const currentEmployee: Employee | undefined = useSelector<
    Employee | undefined
  >(state => state.data.currentEmployee);
  const {width} = useWindowDimensions();
  const [report, setReport] = useState<Report | null>(null);

  //region jsx
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getReportRequest({id: route.params.id, token}))
        .then(unwrapResult)
        .then(res => {
          // console.log('res', res);
          setReport(res);
        })
        .catch(er => Alert.alert('Ошибка', er));
    }, []),
  );

  function getTypeName(type: CheckupType) {
    switch (type) {
      case 'POST_MED':
        return 'Послерейсовый\nмедосмотр';
      case 'PRE_MED':
        return 'Предрейсовый\nмедосмотр';
      case 'POST_TECH':
        return 'Послерейсовый\nтехосмотр';
      case 'PRE_TECH':
        return 'Предрейсовый\nтехосмотр';
    }
  }

  function renderCheckup(item: Checkup | undefined, type: CheckupType) {
    if (item === undefined) {
      return (
        <Pressable
          disabled={
            (currentEmployee &&
              currentEmployee.employeeType === 'MEDIC' &&
              (type === 'PRE_MED' || type === 'POST_MED')) ||
            (currentEmployee?.employeeType === 'TECHNICIAN' &&
              (type === 'PRE_TECH' || type === 'POST_TECH'))
              ? null
              : true
          }
          onPress={() =>
            navigation.navigate(
              type === 'PRE_MED'
                ? 'PreMed'
                : type === 'POST_MED'
                ? 'PostMed'
                : type === 'PRE_TECH'
                ? 'PreTech'
                : 'PostTech',
              {
                waybillId: report?.id ? report?.id : 0,
                type: 'add',
                checkupId: undefined,
              },
            )
          }
          android_ripple={{radius: 200, color: 'gray'}}
          style={{
            borderTopWidth: type === 'PRE_MED' || type === 'POST_MED' ? 1 : 0,
            borderBottomWidth: 1,
            paddingVertical: 32,
            width,
            flexDirection: 'row',
            borderBottomColor: 'gray',
            borderTopColor: 'gray',
          }}>
          <Text style={{width: 100}}>{getTypeName(type)}</Text>
          <View>
            <Text style={{width: width / 2}}>{'Не пройдено'}</Text>
          </View>
          {(currentEmployee &&
            currentEmployee.employeeType === 'MEDIC' &&
            (type === 'PRE_MED' || type === 'POST_MED')) ||
          (currentEmployee?.employeeType === 'TECHNICIAN' &&
            (type === 'PRE_TECH' || type === 'POST_TECH')) ? (
            <Image
              style={{height: 32, width: 32, tintColor: 'orange'}}
              source={require('../../assets/outline_edit_black_36.png')}
            />
          ) : (
            <View />
          )}
        </Pressable>
      );
    } else {
      return (
        <Pressable
          disabled={
            (currentEmployee &&
              currentEmployee.employeeType === 'MEDIC' &&
              (type === 'PRE_MED' || type === 'POST_MED')) ||
            (currentEmployee?.employeeType === 'TECHNICIAN' &&
              (type === 'PRE_TECH' || type === 'POST_TECH'))
              ? null
              : true
          }
          onPress={() => {
            console.log('type', type);
            navigation.navigate(
              type === 'PRE_MED'
                ? 'PreMed'
                : type === 'POST_MED'
                ? 'PostMed'
                : type === 'PRE_TECH'
                ? 'PreTech'
                : 'PostTech',
              {
                waybillId: report?.id ? report?.id : 0,
                type: 'edit',
                checkupId: item?.id ? item.id : undefined,
              },
            );
          }}
          android_ripple={{radius: 200, color: 'gray'}}
          style={{
            borderTopWidth: type === 'PRE_MED' || type === 'POST_MED' ? 1 : 0,

            borderBottomWidth: 1,
            paddingVertical: 32,
            width,
            flexDirection: 'row',
            borderBottomColor: 'gray',
            borderTopColor: 'gray',
          }}>
          <Text style={{width: 100}}>{getTypeName(item.type)}</Text>
          <View>
            <Text style={{width: width / 2}}>
              {item.specialist.organization.shortName +
                ' ' +
                item.specialist.abbreviatedName}
            </Text>
            <Text style={{width: width / 2}}>
              {item?.dateTimePassed
                ? dayjs(item?.dateTimePassed).format('DD.MM.YYYY HH:mm')
                : ''}
            </Text>
          </View>
          {(currentEmployee &&
            currentEmployee.employeeType === 'MEDIC' &&
            (type === 'PRE_MED' || type === 'POST_MED')) ||
          (currentEmployee?.employeeType === 'TECHNICIAN' &&
            (type === 'PRE_TECH' || type === 'POST_TECH')) ? (
            <Image
              style={{height: 32, width: 32, tintColor: 'orange'}}
              source={require('../../assets/outline_edit_black_36.png')}
            />
          ) : (
            <View />
          )}
        </Pressable>
      );
    }
  }

  function renderReport() {
    return (
      <View style={{width, paddingHorizontal: 8, marginTop: 8}}>
        <Text>{'ИД документа - ' + report?.id}</Text>
        <Text>
          {report?.dateTimeGiven
            ? 'Дата выдачи: ' +
              dayjs(report?.dateTimeGiven).format('DD.MM.YYYY HH:mm')
            : ''}
        </Text>
        <Text>
          {report?.issuer.abbreviatedName
            ? 'Выдал: ' + report?.issuer.abbreviatedName
            : ''}
        </Text>
        <Text>
          {report?.driver.abbreviatedName
            ? 'Водитель: ' + report?.driver.abbreviatedName
            : ''}
        </Text>
        <Text>
          {report?.vehicle.shortName
            ? 'Транспортное средство: ' + report?.vehicle.shortName
            : ''}
        </Text>

        {renderCheckup(
          report?.checkups.filter(it => it.type === 'PRE_MED')[0],
          'PRE_MED',
        )}
        {renderCheckup(
          report?.checkups.filter(it => it.type === 'PRE_TECH')[0],
          'PRE_TECH',
        )}

        <Text>
          {report?.dateTimeShiftStart
            ? 'Начало смены: ' +
              dayjs(report?.dateTimeShiftStart).format('DD.MM.YYYY HH:mm')
            : 'Начало смены: смена не начата'}
        </Text>
        <Text>
          {report?.dateTimeShiftEnd
            ? 'Окончание смены: ' +
              dayjs(report?.dateTimeShiftEnd).format('DD.MM.YYYY HH:mm')
            : 'Окончание смены: смена не окончена'}
        </Text>
        {renderCheckup(
          report?.checkups.filter(it => it.type === 'POST_MED')[0],
          'POST_MED',
        )}
        {renderCheckup(
          report?.checkups.filter(it => it.type === 'POST_TECH')[0],
          'POST_TECH',
        )}
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
      }}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      {report === null ? (
        <Progress.CircleSnail color={['#DEDEDE', 'black']} size={width} />
      ) : (
        renderReport()
      )}
    </ScrollView>
  );
  //endregion jsx
}
