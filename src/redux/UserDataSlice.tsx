import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {authRequest, fetchImages, getEmployeeRequest} from './thunks';
import {Employee, EmployeeData, Image} from '../API';

interface User {
  token: string;
  currentEmployee?: Employee;
  employeeData: EmployeeData;
  empList: Array<Employee>;
}

interface dataState extends User {
  images: Image[] | [];
}

const initialState = {
  token: '',
  images: [],
  currentEmployee: undefined,
  empList: [],
  employeeData: {
    organization: {id: 0, type: 'MED_ORG', shortName: ''},
    type: 'MEDIC',
    user: {
      id: 0,
      abbreviatedName: '',
      firstName: '',
      fullName: '',
      lastName: '',
      created: '',
      email: '',
      msisdn: '',
      status: 'NEW',
      password: '',
      patronymic: '',
    },
    status: 'NEW',
    created: '',
    id: 0,
    roleSet: [],
  },
} as dataState;

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAuthData(state, action: PayloadAction<User>) {
      const {token = ''} = action.payload;
      state.token = token;
    },
    setTokenAndEmployee(
      state,
      action: PayloadAction<{token: string; employee: Employee}>,
    ) {
      state.token = action.payload.token || '';
      state.currentEmployee = action.payload.employee;
    },
    resetAction() {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchImages.fulfilled, (state, action) => {
      state.images = action.payload;
    });
    builder.addCase(authRequest.fulfilled, (state, action) => {
      state.empList = action.payload;
    });
    builder.addCase(getEmployeeRequest.fulfilled, (state, action) => {
      state.employeeData = action.payload;
    });
  },
});

export const {
  setAuthData,
  setTokenAndEmployee,
  resetAction,
} = dataSlice.actions;
export default dataSlice.reducer;
