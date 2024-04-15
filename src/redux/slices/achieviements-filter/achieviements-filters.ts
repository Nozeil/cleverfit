import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

type FiltersState = {
    activeFilter: string;
};

const initialState: FiltersState = {
    activeFilter: 'all',
};

export const achieviementsFiltersSlice = createSlice({
    name: 'achieviements-filters',
    initialState,
    reducers: {
        setActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
});

export const { setActiveFilter } = achieviementsFiltersSlice.actions;
export const activeFilterSelector = (state: RootState) => state.achieviementsFilters.activeFilter;
export const achieviementsFiltersReducer = achieviementsFiltersSlice.reducer;
