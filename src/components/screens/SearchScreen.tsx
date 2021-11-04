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
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import ThrottledSearchInput from '../_CustomComponents/ThrottledSearchInput';
import {useAppDispatch, useSelector} from '../../redux';
import {searchRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {SearchReport} from '../../API';
import dayjs from 'dayjs';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Search'>;
};

export default function SearchScreen({navigation}: Props) {
  //region jsx
  const token = useSelector<string>(state => state.data.token);
  const [searchResult, setSearchResult] = useState<Array<SearchReport>>([]);
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();

  function renderSearchReport(item: SearchReport) {
    return (
      <View style={{overflow: 'hidden', borderRadius: 15}}>
        <Pressable
          onPress={() => navigation.navigate('Report', {id: item.id})}
          android_ripple={{radius: 200, color: 'gray'}}
          style={{
            width: width - 32,

            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'gray',
            padding: 24,
          }}>
          <Text>{item.driverName ? 'Водитель: ' + item.driverName : ''}</Text>
          <Text>{item.issuerName ? 'Выдал: ' + item.issuerName : ''}</Text>
          <Text>
            {item.created
              ? 'Дата выдачи: ' + dayjs(item.created).format('DD.MM.YYYY HH:mm')
              : ''}
          </Text>
          <Text>{item.vehicleName ? 'Машина: ' + item.vehicleName : ''}</Text>
        </Pressable>
      </View>
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
        value={''}
        onThrottledChange={term => {
          console.log('term', term);
          if (term.trim() !== '') {
            dispatch(searchRequest({token, term}))
              .then(unwrapResult)
              .then(res => {
                console.log('res', res);
                setSearchResult(res);
              })
              .catch(er => Alert.alert('Ошибка', JSON.stringify(er)));
          } else {
            setSearchResult([]);
          }
        }}
        onTextChanges={term => {}}
        styleInput={{}}
        styleContainer={{marginTop: 24}}
        editable={true}
        placeholder={'Поиск'}
        inputProps={{}}
      />
      <FlatList
        contentContainerStyle={{marginTop: 12}}
        ItemSeparatorComponent={() => <View style={{height: 24}} />}
        keyExtractor={(item, index) => index.toString()}
        data={searchResult}
        renderItem={({item}) => renderSearchReport(item)}
      />
    </View>
  );
  //endregion jsx
}
