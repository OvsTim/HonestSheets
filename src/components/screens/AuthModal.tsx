import {Employee} from '../../API';
import Modal from 'react-native-modal';
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {useAppDispatch, useSelector} from '../../redux';
import {authEmployeeRequest} from '../../redux/thunks';
import {unwrapResult} from '@reduxjs/toolkit';
import {setTempDriver, setTokenAndEmployee} from '../../redux/UserDataSlice';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onEmployeeSelected: (e: Employee) => void;
};
export function AuthModal(props: Props) {
  const empList = useSelector<Array<Employee>>(state => state.data.empList);
  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  function renderEmployee(item: Employee) {
    return (
      <Pressable
        style={{width, padding: 24}}
        android_ripple={{radius: 200, color: 'gray'}}
        onPress={() => {
          dispatch(setTempDriver({id: 0, fullName: ''}));
          dispatch(authEmployeeRequest(item.employeeId))
            .then(unwrapResult)
            .then(res => {
              dispatch(setTokenAndEmployee({token: res.token, employee: item}));
              props.onClose();
              setTimeout(() => {
                props.onEmployeeSelected(item);
              }, 500);
            })
            .catch(er => Alert.alert('Ошибка', er));
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
  );
}
