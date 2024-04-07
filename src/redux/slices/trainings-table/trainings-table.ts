import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';
import type { TrainingsTableSortedBy } from '@typings/index';

import type {
    SetSortedByAction,
    SetSortedTrainings,
    SortedTrainings,
} from './trainings-table.types';

type TrainingsTableState = {
    sortedBy: TrainingsTableSortedBy;
    sortedTrainings: SortedTrainings;
};

const initialState: TrainingsTableState = {
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
        setSortedTrainings: (state, action: SetSortedTrainings) => {
            state.sortedTrainings = action.payload;
        },
    },
});

export const { setSortedBy, setSortedTrainings } = trainingsTableSlice.actions;
export const trainingsTableSortedBySelector = (state: RootState) => state.trainingsTable.sortedBy;
export const trainingsTableSortedTrainingsSelector = (state: RootState) =>
    state.trainingsTable.sortedTrainings;
export const trainingsTableReducer = trainingsTableSlice.reducer;
