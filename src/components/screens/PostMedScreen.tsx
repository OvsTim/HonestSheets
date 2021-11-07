import React, {useState} from 'react';
import {
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import CheckBox from '@react-native-community/checkbox';
import BaseButton from '../_CustomComponents/BaseButton';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'PostMed'>;
};

const Button = withPressable(View);

export default function PostMedScreen({navigation}: Props) {
  //region jsx
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
