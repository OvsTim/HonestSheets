import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '../../navigation/AuthNavigator';
import {withPressable} from '../_CustomComponents/HOC/withPressable';
import BaseButton from '../_CustomComponents/BaseButton';
import {useAppDispatch} from '../../redux';
import {auth, Employee} from '../../API';
import {authEmployeeRequest, authRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import Modal from 'react-native-modal';
import {setTokenAndEmployee} from '../../redux/UserDataSlice';

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Auth'>;
};

const Button = withPressable(View);

export default function AuthScreen({navigation}: Props) {
  const dispatch = useAppDispatch();
  const {width} = useWindowDimensions();
  const [empList, setEmpList] = useState<Array<Employee>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  //region jsx

  function renderEmployee(item: Employee) {
    return (
      <Pressable
        style={{width, padding: 24}}
        android_ripple={{radius: 200, color: 'gray'}}
        onPress={() => {
          dispatch(authEmployeeRequest(item.employeeId))
            .then(unwrapResult)
            .then(res => {
              dispatch(setTokenAndEmployee({token: res.token, employee: item}));
              setVisible(false);
              setTimeout(() => {
                navigation.navigate('Search');
              }, 500);
            })
            .catch(er => Alert.alert('Ошибка', er));
        }}>
        {/*<Text style={{fontSize: 17}}>{item.orgName}</Text>*/}
        {/*<Text>*/}
        {/*  {item.orgType === 'TECH_ORG'*/}
        {/*    ? 'Техцентр'*/}
        {/*    : item.orgType === 'MED_ORG'*/}
        {/*    ? 'Мед организация'*/}
        {/*    : item.orgType === 'TAXI_PARK'*/}
        {/*    ? 'Таксопарк'*/}
        {/*    : item.orgType}*/}
        {/*</Text>*/}
        <Text>
          {item.employeeType === 'MEDIC'
            ? 'Медик'
            : item.employeeId === 148530
            ? 'Техник'
            : item.employeeType === 'TECHNICIAN'
            ? 'Техник 1'
            : item.employeeType === 'OPERATOR'
            ? 'Таксопарк'
            : item.employeeType}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <StatusBar
        translucent={false}
        backgroundColor={'rgba(0,0,0,0.1)'}
        barStyle="dark-content"
      />
      <BaseButton
        loading={loading}
        text={'Войти'}
        onPress={() => {
          setLoading(true);
          dispatch(authRequest())
            .then(unwrapResult)
            .then(res => {
              setLoading(false);
              setEmpList(res);
              setVisible(true);
              console.log('res', res);
            })
            .catch(er => {
              setLoading(false);

              Alert.alert('Ошибка', er);
            });
        }}
      />
      <Modal
        onSwipeComplete={() => setVisible(false)}
        swipeDirection={['down']}
        isVisible={visible}
        statusBarTranslucent={true}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        deviceHeight={Dimensions.get('screen').height}
        style={{
          margin: 0,
          marginTop: 200,
        }}>
        <FlatList
          contentContainerStyle={{
            width: width - 50,
            alignSelf: 'center',
            backgroundColor: 'white',
            borderRadius: 15,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={empList}
          renderItem={({item}) => renderEmployee(item)}
        />
      </Modal>
    </View>
  );
  //endregion jsx
}
