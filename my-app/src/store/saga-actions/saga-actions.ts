import {createAction} from "@reduxjs/toolkit";

export const enum SAGA_ACTIONS {
  GetConvertedCoordinatesFromServer = 'GetConvertedCoordinatesFromServer',
  GetPoiylineCoordinateFromServer = 'GetPoiylineCoordinateFromServer',
};

export const getConvertedCoordinatesFromServer = createAction(SAGA_ACTIONS.GetConvertedCoordinatesFromServer);
export const getPolylineCoordinateFromServer = createAction(SAGA_ACTIONS.GetPoiylineCoordinateFromServer);
