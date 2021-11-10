import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useSelector} from '../../redux';
import ThrottledSearchInput from '../_CustomComponents/ThrottledSearchInput';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {DriverFromSearch} from '../../API';
import {getDriversRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {setTempDriver} from '../../redux/UserDataSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SearchDriver'>;
};

export default function SearchDriverScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.data.token);
  const {width} = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [drivers, setDrivers] = useState<Array<DriverFromSearch>>([]);

  function requestDrivers(_token: string, _page: number, _search: string) {
    // console.log('requestDrivers', '_search', _search);
    dispatch(
      getDriversRequest({token: _token, page: _page, searchTern: _search}),
    )
      .then(unwrapResult)
      .then(res => {
        if (_page === 1) {
          setDrivers(res.entries);
        } else {
          if (drivers.length < res.total) {
            setDrivers(prevState => [...prevState, ...res.entries]);
          }
        }
      })
      .catch(er => Alert.alert('Ошибка', er));
  }

  function renderDriverItem(item: DriverFromSearch) {
    return (
      <Pressable
        onPress={() => {
          dispatch(setTempDriver(item));
          navigation.goBack();
        }}
        android_ripple={{radius: 200, color: 'gray'}}
        style={{width, padding: 16}}>
        <View>
          <Text>{item.fullName}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <ThrottledSearchInput
        value={searchTerm}
        styleContainer={{marginTop: 12}}
        onTextChanges={term => setSearchTerm(term)}
        styleInput={{}}
        editable={true}
        placeholder={'Поиск'}
        inputProps={{}}
        onThrottledChange={(term: string) => {
          // console.log('term', term);
          setPage(1);
          if (term.trim() !== '') {
            requestDrivers(token, 1, term);
          } else {
            requestDrivers(token, 1, '');
          }
        }}
      />
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          requestDrivers(token, page + 1, searchTerm);
          setPage(prevState => prevState + 1);
        }}
        data={drivers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderDriverItem(item)}
      />
    </View>
  );
}
