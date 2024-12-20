import { configureStore } from '@reduxjs/toolkit';
import paramsReducer from '../features/functionParams/functionParams';

export default configureStore({
  reducer: {
    params: paramsReducer,
  },
  devTools: false,
});
