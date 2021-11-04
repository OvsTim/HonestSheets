import {createAsyncThunk} from '@reduxjs/toolkit';
import * as API from '../API';
import {handleBaseError} from '../utils/handler';

export const fetchImages = createAsyncThunk(
  'users/fetchByIdStatus',
  async (url: string, {rejectWithValue}) => {
    try {
      //console.time('getImages');
      const response = await API.getImages(url);
      //console.timeEnd('getImages');
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      //console.timeEnd('getImages');
      return rejectWithValue(errorMessage);
    }
  },
);

export const authRequest = createAsyncThunk(
  'users/auth',
  async (_, {rejectWithValue}) => {
    try {
      const response = await API.auth();
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
export const authEmployeeRequest = createAsyncThunk(
  'users/authEmp',
  async (id: number, {rejectWithValue}) => {
    try {
      const response = await API.authEmployee(id);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const searchRequest = createAsyncThunk(
  'users/search',
  async (arg: {token: string; term: string}, {rejectWithValue}) => {
    try {
      const response = await API.search(arg.term, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const getReportRequest = createAsyncThunk(
  'users/getReport',
  async (arg: {token: string; id: number}, {rejectWithValue}) => {
    try {
      const response = await API.getReport(arg.id, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
