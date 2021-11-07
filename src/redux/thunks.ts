import {createAsyncThunk} from '@reduxjs/toolkit';
import * as API from '../API';
import {handleBaseError} from '../utils/handler';
import {
  PostMedCreateCheckup,
  PostMedEditCheckup,
  PostTechCreateCheckup,
  PostTechEditCheckup,
  PreMedCreateCheckup,
  PreMedEditCheckup,
  PreTechCreateCheckup,
} from '../API';

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

export const getEmployeeRequest = createAsyncThunk(
  'users/getEmployee',
  async (arg: {token: string; id: number}, {rejectWithValue}) => {
    try {
      const response = await API.getEmployee(arg.id, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const preMedCreateRequest = createAsyncThunk(
  'users/preMedCreateRequest',
  async (
    arg: {token: string; data: PreMedCreateCheckup},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.preMedCreate(arg.data, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
export const postMedCreateRequest = createAsyncThunk(
  'users/postMedCreateRequest',
  async (
    arg: {token: string; data: PostMedCreateCheckup},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.postMedCreate(arg.data, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
export const preTechCreateRequest = createAsyncThunk(
  'users/preTechCreateRequest',
  async (
    arg: {token: string; data: PreTechCreateCheckup},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.preTechCreate(arg.data, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
export const postTechCreateRequest = createAsyncThunk(
  'users/postTechCreateRequest',
  async (
    arg: {token: string; data: PostTechCreateCheckup},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.postTechCreate(arg.data, arg.token);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const preMedEditRequest = createAsyncThunk(
  'users/preMedEditRequest',
  async (
    arg: {token: string; data: PreMedEditCheckup; CheckupID: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.preMedEdit(arg.data, arg.token, arg.CheckupID);
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const postMedEditRequest = createAsyncThunk(
  'users/postMedEditRequest',
  async (
    arg: {token: string; data: PostMedEditCheckup; CheckupID: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.postMedEdit(
        arg.data,
        arg.token,
        arg.CheckupID,
      );
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);

export const postTechEditRequest = createAsyncThunk(
  'users/postTechEditRequest',
  async (
    arg: {token: string; data: PostTechEditCheckup; CheckupID: number},
    {rejectWithValue},
  ) => {
    try {
      const response = await API.postTechEdit(
        arg.data,
        arg.token,
        arg.CheckupID,
      );
      return response.data;
    } catch (er) {
      let errorMessage: string = handleBaseError(er);
      return rejectWithValue(errorMessage);
    }
  },
);
