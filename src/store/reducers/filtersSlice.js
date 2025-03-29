import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: {
    all: true,
    0: true,
    1: true,
    2: true,
    3: true,
  },
  stopsFilter: [0, 1, 2, 3],
  allTickets: [],
  filteredTickets: [],
  visibleCount: 5,
  error: null,
  isLoading: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAllTickets: (state, action) => {
      state.allTickets = action.payload;
      state.filteredTickets = action.payload;
    },
    setStopsFilter: (state, action) => {
      state.stopsFilter = action.payload;

      state.filteredTickets = state.allTickets.filter((ticket) =>
          ticket.segments.every((segment) =>
              state.stopsFilter.includes(segment.stops.length),
          ),
      );
    },
    increaseVisibleCount: (state) => {
      state.visibleCount += 5;
    },
    toggleFilter: (state, action) => {
      const stop = action.payload;

      if (stop === 'all') {
        const newValue = !state.filters.all;
        state.filters.all = newValue;

        [0, 1, 2, 3].forEach((filter) => {
          state.filters[filter] = newValue;
        });
      } else {
        state.filters[stop] = !state.filters[stop];
        state.filters.all = [0, 1, 2, 3].every((filter) => state.filters[filter]);
      }

      state.stopsFilter = [0, 1, 2, 3].filter((s) => state.filters[s]);

      state.filteredTickets = state.allTickets.filter((ticket) =>
          ticket.segments.every((segment) =>
              state.stopsFilter.includes(segment.stops.length)
          )
      );
    },
  },
});

export const {
  setStopsFilter,
  setAllTickets,
  toggleFilter,
  increaseVisibleCount,
  setError,
  setLoading,
} = filtersSlice.actions;

export const fetchTickets = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetch(
        'https://aviasales-test-api.kata.academy/search',
    );
    const { searchId } = await response.json();

    const ticketsResponse = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
    );
    const { tickets } = await ticketsResponse.json();

    dispatch(setAllTickets(tickets));
    dispatch(setError(null));
  } catch (error) {
    console.error('Ошибка загрузки билетов:', error);
    dispatch(setError('Не удалось загрузить билеты'));
  } finally {
    dispatch(setLoading(false));
  }
};

export default filtersSlice.reducer;
