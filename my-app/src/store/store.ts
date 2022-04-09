import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas/userSaga';
import commonReducer from './slice/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: commonReducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  middleware: [...getDefaultMiddleware({ thunk: false }),sagaMiddleware],
});
sagaMiddleware.run(rootSaga);

export type StateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
