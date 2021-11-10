import React, {useState} from 'react';
import {
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

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'CreateReport'>;
};

export default function CreateReportScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const token = useSelector(state => state.data.token);
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [driver, setDriver] = useState<string>('');
  const {width} = useWindowDimensions();
  const Button = withPressable(View);

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

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <Pressable onPress={() => navigation.navigate('SearchDriver')}>
        <BaseInput
          value={driver}
          onTextChanges={term => setDriver(term.replace(/[^0-9.]/g, ''))}
          styleInput={{}}
          styleContainer={{marginTop: 16}}
          editable={false}
          placeholder={'Водитель'}
          label={'Водитель'}
          inputProps={{}}
          labelStyle={{}}
          showLabel={true}
        />
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
