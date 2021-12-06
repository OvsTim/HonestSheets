import {Employee} from '../../API';
import Modal from 'react-native-modal';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StatusBar,
  Text,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useAppDispatch, useSelector} from '../../redux';
import {authEmployeeRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {
  setPassword,
  setTempDriver,
  setTokenAndEmployee,
} from '../../redux/UserDataSlice';
import BaseInput from '../_CustomComponents/BaseInput';
import BaseButton from '../_CustomComponents/BaseButton';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onEmployeeSelected: (e: Employee) => void;
};
export function AuthModal(props: Props) {
  const empList = useSelector<Array<Employee>>(state => state.data.empList);
  const passCache = useSelector<Record<number, string>>(
    state => state.data.passCache,
  );
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const [pass, setPass] = useState<string>('');
  const [tempEmpId, setTempEmpId] = useState<number>(0);

  function renderEmployee(item: Employee) {
    return (
      <Pressable
        style={{padding: 24, width: width - 50}}
        android_ripple={{radius: 200, color: 'gray'}}
        onPress={() => {
          setTempEmpId(item.employeeId);
          setPass(passCache[item.employeeId] ? passCache[item.employeeId] : '');
        }}>
        <Text>
          {item.employeeType === 'MEDIC'
            ? 'Медик'
            : item.employeeType === 'TECHNICIAN'
            ? 'Техник'
            : item.employeeType === 'OPERATOR'
            ? 'Таксопарк'
            : item.employeeType}
        </Text>
        {item.employeeId === tempEmpId && (
          <Image
            style={{
              position: 'absolute',
              right: 16,
              top: 20,
              width: 32,
              height: 32,
              alignSelf: 'center',
            }}
            source={require('../../assets/outline_done_black_24.png')}
          />
        )}
      </Pressable>
    );
  }

  return (
    <Modal
      onSwipeComplete={() => props.onClose()}
      swipeDirection={['down']}
      isVisible={props.isVisible}
      statusBarTranslucent={true}
      onBackdropPress={() => props.onClose()}
      onBackButtonPress={() => props.onClose()}
      deviceHeight={Dimensions.get('screen').height}
      style={{
        margin: 0,
      }}>
      <View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight,
          width: width - 50,

          alignSelf: 'center',
          backgroundColor: 'white',
          borderRadius: 15,
          height: 330,
        }}>
        <FlatList
          contentContainerStyle={{
            width: width - 50,
          }}
          keyExtractor={(item, index) => index.toString()}
          data={empList}
          renderItem={({item}) => renderEmployee(item)}
        />
        {tempEmpId !== 0 && (
          <>
            <BaseInput
              value={pass}
              onTextChanges={term => setPass(term)}
              styleInput={{}}
              styleContainer={{margin: 16, width: width - 84}}
              editable={true}
              placeholder={'Пароль'}
              label={'Пароль'}
              inputProps={{
                keyboardType: 'default',
              }}
              labelStyle={{}}
              showLabel={true}
              isPassword={true}
            />
            <BaseButton
              text={'Войти'}
              onPress={() => {
                if (!pass.trim()) {
                  ToastAndroid.show('Введите пароль', 3000);
                  return;
                }

                dispatch(setTempDriver({id: 0, fullName: ''}));
                dispatch(
                  authEmployeeRequest({id: tempEmpId, pass: pass.trim()}),
                )
                  .then(unwrapResult)
                  .then(res => {
                    dispatch(setPassword({id: tempEmpId, pass: pass.trim()}));
                    dispatch(
                      setTokenAndEmployee({
                        token: res.token,
                        employee: empList.filter(
                          it => it.employeeId === tempEmpId,
                        )[0],
                      }),
                    );
                    props.onClose();
                    setTimeout(() => {
                      props.onEmployeeSelected(
                        empList.filter(it => it.employeeId === tempEmpId)[0],
                      );
                    }, 500);
                  })
                  .catch(_ =>
                    ToastAndroid.show(
                      'Произошла ошибка при попытке авторизрваться. Проверьте данные и попробуйте снова',
                      3000,
                    ),
                  );
              }}
              width={width - 84}
              containerStyle={{alignSelf: 'center'}}
            />
            <View style={{height: 12}} />
          </>
        )}
      </View>
    </Modal>
  );
}
