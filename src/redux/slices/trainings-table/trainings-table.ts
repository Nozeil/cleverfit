import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';
import type { TrainingsTableSortedBy } from '@typings/index';

import type {
    SetPaginationPageAction,
    SetPaginationPageSizeAction,
    SetSortedByAction,
    SetSortedTrainingsAction,
    Trainings,
} from './trainings-table.types';

type TrainingsTableState = {
    paginationPage: number;
    paginationPageSize: number;
    sortedBy: TrainingsTableSortedBy;
    sortedTrainings: Trainings;
};

const initialState: TrainingsTableState = {
    paginationPage: 1,
    paginationPageSize: 0,
    sortedBy: null,
    sortedTrainings: [],
};

export const trainingsTableSlice = createSlice({
    name: 'trainings-table',
    initialState,
    reducers: {
        setSortedBy: (state, action: SetSortedByAction) => {
            state.sortedBy = action.payload;
        },

        setSortedTrainings: (state, action: SetSortedTrainingsAction) => {
            state.sortedTrainings = action.payload;
        },

        setPaginationPageSize: (state, action: SetPaginationPageSizeAction) => {
            state.paginationPageSize = action.payload;
        },

        setPaginationPage: (state, action: SetPaginationPageAction) => {
            state.paginationPage = action.payload;
        },
    },
});

export const { setSortedBy, setSortedTrainings, setPaginationPageSize, setPaginationPage } =
    trainingsTableSlice.actions;
export const trainingsTableSortedBySelector = (state: RootState) => state.trainingsTable.sortedBy;
export const trainingsTableSelector = (state: RootState) => state.trainingsTable;
export const trainingsTablePaginationPageSizeSelector = (state: RootState) =>
    state.trainingsTable.paginationPageSize;
export const trainingsTableReducer = trainingsTableSlice.reducer;
