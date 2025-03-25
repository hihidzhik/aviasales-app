import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import filtersReducer from './reducers/filtersSlice';
import sortReducer from './reducers/sortSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    sort: sortReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
