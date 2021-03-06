import {combineReducers} from 'redux';
import dataSlice from './UserDataSlice';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {persistReducer, createMigrate} from 'redux-persist';
import {configureStore} from '@reduxjs/toolkit';
import {createSelectorHook, useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const dataPersistConfig = {
  key: 'data',
  storage: AsyncStorage,
};

const AppReducer = combineReducers({
  data: persistReducer(dataPersistConfig, dataSlice),
});

const store = configureStore({
  reducer: AppReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof AppReducer>;
export type AppDispatch = typeof store.dispatch;
export const useSelector = createSelectorHook<RootState>();
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
