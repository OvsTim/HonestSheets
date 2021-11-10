import React, {useState} from 'react';
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
import {VehicleFromSearch} from '../../API';
import {getVehiclesRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {setTempVehicle} from '../../redux/UserDataSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SearchVehicle'>;
};

export default function SearchVehicleScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.data.token);
  const {width} = useWindowDimensions();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [vehicles, setVehicles] = useState<Array<VehicleFromSearch>>([]);

  function requestVehicles(_token: string, _page: number, _search: string) {
    // console.log('requestDrivers', '_search', _search);
    dispatch(
      getVehiclesRequest({token: _token, page: _page, searchTern: _search}),
    )
      .then(unwrapResult)
      .then(res => {
        if (_page === 1) {
          setVehicles(res.entries);
        } else {
          if (vehicles.length < res.total) {
            setVehicles(prevState => [...prevState, ...res.entries]);
          }
        }
      })
      .catch(er => Alert.alert('Ошибка', er));
  }

  function renderVehicleItem(item: VehicleFromSearch) {
    return (
      <Pressable
        onPress={() => {
          dispatch(setTempVehicle(item));
          navigation.goBack();
        }}
        android_ripple={{radius: 200, color: 'gray'}}
        style={{width, padding: 16}}>
        <View>
          <Text>{item.shortName}</Text>
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
            requestVehicles(token, 1, term);
          } else {
            setVehicles([]);
          }
        }}
      />
      <FlatList
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          requestVehicles(token, page + 1, searchTerm);
          setPage(prevState => prevState + 1);
        }}
        data={vehicles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => renderVehicleItem(item)}
      />
    </View>
  );
}
