import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import {RouteProp} from '@react-navigation/native';
import {useAppDispatch, useSelector} from '../../redux';
import {getReportRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {Checkup, CheckupType, Report} from '../../API';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Report'>;
  route: RouteProp<AuthStackParamList, 'Report'>;
};

const Button = withPressable(View);

export default function ReportScreen({navigation, route}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector<string>(state => state.data.token);
  const {width} = useWindowDimensions();
  const [report, setReport] = useState<Report | null>(null);
  //region jsx

  useEffect(() => {
    dispatch(getReportRequest({id: route.params.id, token}))
      .then(unwrapResult)
      .then(res => {
        console.log('res', res);
        setReport(res);
      })
      .catch(er => Alert.alert('Ошибка', JSON.stringify(er)));
  }, []);

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

  function renderCheckup(item: Checkup) {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: 32,
          width,
          flexDirection: 'row',
          borderBottomColor: 'gray',
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
      </View>
    );
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

        <FlatList
          data={report?.checkups}
          renderItem={({item}) => renderCheckup(item)}
        />
        <Text>
          {report?.dateTimeShiftStart
            ? 'Начало смены: ' +
              dayjs(report?.dateTimeShiftStart).format('DD.MM.YYYY HH:mm')
            : ''}
        </Text>
        <Text>
          {report?.dateTimeShiftEnd
            ? 'Окончание смены: ' +
              dayjs(report?.dateTimeShiftEnd).format('DD.MM.YYYY HH:mm')
            : ''}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{flex: 1, alignItems: 'flex-start', justifyContent: 'flex-start'}}>
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
    </View>
  );
  //endregion jsx
}
