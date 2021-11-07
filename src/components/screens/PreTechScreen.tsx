import React, {useRef, useState} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import BaseInput from '../_CustomComponents/BaseInput';
import CheckBox from '@react-native-community/checkbox';
import BaseButton from '../_CustomComponents/BaseButton';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PreTech'>;
};

const Button = withPressable(View);

export default function PreTechScreen({navigation}: Props) {
  //region jsx
  const distRef = useRef<TextInput>(null);
  const [dist, setDist] = useState<string>('');
  const [passed, setPassed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {width} = useWindowDimensions();

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <BaseInput
        inputRef={distRef}
        value={dist}
        onTextChanges={term => setDist(term.replace(/[^0-9]/g, ''))}
        styleInput={{}}
        styleContainer={{marginTop: 16}}
        editable={true}
        placeholder={'Пробег автомобиля'}
        label={'Пробег автомобиля'}
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
        <Text>Дезинфекция проведена</Text>
      </Pressable>
      <BaseButton loading={loading} text={'Сохранить'} onPress={() => {}} />
    </View>
  );
  //endregion jsx
}
