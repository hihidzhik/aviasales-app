import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeSort: 'cheap', // 'cheap' | 'fast' | 'optimal'
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort(state, action) {
      state.activeSort = action.payload;
    },
  },
});

export const { setSort } = sortSlice.actions;
export default sortSlice.reducer;
