import { createSlice } from "@reduxjs/toolkit";

const MAP_SLICE= 'MAP_SLICE';

export type CoordinateType = {
  lat: number,
  lon: number,
};

type InitialStateType = {
  currentWidthMapBlock: number | string | null,
  loadingCoordinates: CoordinateType | null,
  unloadingCoordinates: CoordinateType | null,
  coordinatesList: [] | null,
};

const initialState: InitialStateType = {
  currentWidthMapBlock: null,
  loadingCoordinates: null,
  unloadingCoordinates: null,
  coordinatesList: null,
};

const mapSlice = createSlice({
  name: MAP_SLICE,
  initialState,
  reducers: {
    setWidthMapBlockAction: (state, actions) => {
      state.currentWidthMapBlock = actions.payload;
    },
    setCleanerInitialStateAction: (state) => {
      state.loadingCoordinates = null;
      state.unloadingCoordinates = null;
    },
    setLoadingCoordinatesAction: (state, actions) => {
      state.loadingCoordinates = actions.payload;
    },
    setUnloadingCoordinatesAction: (state, actions) => {
      state.unloadingCoordinates = actions.payload;
    },
    setCoordinatesListAction: (state, actions) => {
      state.coordinatesList = actions.payload;
    },
  }
});

export const {setWidthMapBlockAction, setCoordinatesListAction, setCleanerInitialStateAction, setLoadingCoordinatesAction, setUnloadingCoordinatesAction} = mapSlice.actions;

export default mapSlice;
