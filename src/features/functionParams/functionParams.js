import { createSlice } from '@reduxjs/toolkit';

const paramsSlice = createSlice({
  name: 'params',
  initialState: {
    func: 'x ^ 2',
    lowerLimit: 0,
    upperLimit: 1,
    n: 1,
  },
  reducers: {
    setFunction: (state, action) => {
      state.func = action.payload;
    },
    setLowerLimit: (state, action) => {
      state.lowerLimit = action.payload;
    },
    setUpperLimit: (state, action) => {
      state.upperLimit = action.payload;
    },
    setN: (state, action) => {
      state.n = action.payload;
    },
  },
});

export const { setFunction, setLowerLimit, setUpperLimit, setN } =
  paramsSlice.actions;

export default paramsSlice.reducer;
