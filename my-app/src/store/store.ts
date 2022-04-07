import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import commonSlice from '../features/counter/common-slice';
import {enableMapSet} from 'immer';
enableMapSet();

export const store = configureStore({
  reducer: commonSlice.reducer,
});

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
