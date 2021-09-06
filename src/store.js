import { configureStore } from '@reduxjs/toolkit'
import deviceReducer from './reducer/device.reducer';

export const store = configureStore({
  reducer: {
    device: deviceReducer
  },
})

