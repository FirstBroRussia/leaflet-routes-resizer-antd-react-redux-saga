import {combineReducers} from "@reduxjs/toolkit";
import mapSlice from "./map-slice";
import proposalSlice from "./proposal-slice";

const commonReducer = combineReducers({
  proposalReducer: proposalSlice.reducer,
  mapReducer: mapSlice.reducer,
});

export default commonReducer;
