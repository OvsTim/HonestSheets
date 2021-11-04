import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchImages} from './thunks';
import {Employee, Image} from '../API';

interface User {
  token: string;
  currentEmployee?: Employee;
}

interface dataState extends User {
  images: Image[] | [];
}

const initialState = {
  token: '',
  images: [],
  currentEmployee: undefined,
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
  },
});

export const {
  setAuthData,
  setTokenAndEmployee,
  resetAction,
} = dataSlice.actions;
export default dataSlice.reducer;
