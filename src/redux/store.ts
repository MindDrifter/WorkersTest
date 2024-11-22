import { configureStore } from '@reduxjs/toolkit';
import workerSlice from './workersSlice';

const store = configureStore({
  reducer: {
    workers: workerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;