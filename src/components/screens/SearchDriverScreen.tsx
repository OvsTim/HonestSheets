import React, {useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useAppDispatch, useSelector} from '../../redux';
import ThrottledSearchInput from '../_CustomComponents/ThrottledSearchInput';
import {AuthStackParamList} from '../../navigation/AuthNavigator';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'SearchDriver'>;
};

export default function SearchDriverScreen({}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.data.token);
  const [searchTerm, setSearchTerm] = useState<string>('');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <ThrottledSearchInput
        styleContainer={{marginTop: 12}}
        onThrottledChange={(term: string) => {
          setSearchTerm(term);
        }}
      />
    </View>
  );
}
