import {createSlice} from '@reduxjs/toolkit';

const COMMON_SLICE = 'COMMON_SLICE';

export type InitialStateType = {
  isInitial: boolean,
  key: number,
  currentLoadingPoint: string,
  currentUnloadingPoint: string,
};

const initialState: InitialStateType = {
  isInitial: false,
  key: 0,
  currentLoadingPoint: '',
  currentUnloadingPoint: '',
};

const proposalSlice = createSlice({
  name: COMMON_SLICE,
  initialState,
  reducers: {
    setPrimaryInitialProposalAction: (state, action) => {
      state.isInitial = true;
      state.key = action.payload;
    },
    setTargetProposalKeyAction: (state, action) => {
      state.key = action.payload.key;
      state.currentLoadingPoint = action.payload.currentLoadingPoint;
      state.currentUnloadingPoint = action.payload.currentUnloadingPoint;
    },
    setCurrentLoadingPointAction: (state, action) => {
      state.currentLoadingPoint = action.payload;
    },
    setCurrentUnloadingPointAction: (state, action) => {
      state.currentUnloadingPoint = action.payload;
    },

  },
});

export const {setPrimaryInitialProposalAction, setTargetProposalKeyAction, setCurrentLoadingPointAction, setCurrentUnloadingPointAction} = proposalSlice.actions;
export default proposalSlice;
