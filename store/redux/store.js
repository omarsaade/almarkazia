import {configureStore} from '@reduxjs/toolkit';
import uiReducer from './slice';

export const store = configureStore({
  reducer: {
    uiSlice: uiReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
