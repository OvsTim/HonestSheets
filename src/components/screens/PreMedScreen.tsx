import React, {useEffect, useRef, useState} from 'react';
import {
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
import {useSelector} from '../../redux';
import {EmployeeData} from '../../API';

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

  useEffect(() => {
    console.log('ROUTE', JSON.stringify(route.params));
  }, []);

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
        onTextChanges={term => setTemperature(term)}
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
          onChange={event => setPassed(event.nativeEvent.value)}
        />
        <Text>Пройден тест на алкоголь</Text>
      </Pressable>
      <BaseButton loading={loading} text={'Сохранить'} onPress={() => {}} />
    </View>
  );
  //endregion jsx
}
