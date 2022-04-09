import {put, call, all, takeEvery, select, fork} from 'redux-saga/effects';
import {mapBoxGetPolylineCoordinateApi, yaGetGeocoordinateApi} from '../../components/api/api';
import {getConvertedCoordinatesFromServer, getPolylineCoordinateFromServer} from '../saga-actions/saga-actions';
import {setCoordinatesListAction, setLoadingCoordinatesAction, setUnloadingCoordinatesAction} from '../slice/map-slice';

// САГА ДЛЯ ПРЕОБРАЗОВАНИЯ СТРОКОВОГО АДРЕСА В КООРДИНАТЫ

function* workerGetConvertedCoordinatesFromServerActionsSaga({payload}: any): any {
  const {currentLoadingPoint, currentUnloadingPoint} = yield select((state) => state.proposalReducer);
  if (!currentLoadingPoint && !currentUnloadingPoint) {
    return;
  }

  if (currentLoadingPoint) {
    const loadingCoordinates = yield call(yaGetGeocoordinateApi, currentLoadingPoint)
    yield put(setLoadingCoordinatesAction(loadingCoordinates));
  }
  if (currentUnloadingPoint) {
    const unloadingCoordinates = yield call(yaGetGeocoordinateApi, currentUnloadingPoint)
    yield put(setUnloadingCoordinatesAction(unloadingCoordinates));
  }
}

function* watchGetConvertedCoordinatesFromServerActionSaga(): any {
    yield takeEvery(getConvertedCoordinatesFromServer, workerGetConvertedCoordinatesFromServerActionsSaga);
}

///////////////////////////////////////

// САГА ДЛЯ ПОЛУЧЕНИЯ ПОЛИЛИНИИ


function* workerGetPoiylineCoordinateFromServerActionSaga(): any {
  const {loadingCoordinates, unloadingCoordinates} = yield select((state) => state.mapReducer);

  const data = yield call(mapBoxGetPolylineCoordinateApi, {loadingCoordinates, unloadingCoordinates});
  const convertData = data.map((item: any) => {
    return item.reverse();
  })
  yield put(setCoordinatesListAction(convertData));
}

function* watchGetPoiylineCoordinateFromServerActionSaga(): any {
  yield takeEvery(getPolylineCoordinateFromServer, workerGetPoiylineCoordinateFromServerActionSaga);
}

/////////////////////////////////////


export function* rootSaga(): any {
  yield all([
    fork(watchGetConvertedCoordinatesFromServerActionSaga),
    fork(watchGetPoiylineCoordinateFromServerActionSaga),
  ]);
}
