import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type {
    SetPaginationPageAction,
    SetPaginationPageSizeAction,
    SetPaginationTotalAction,
    SetSearchValueAction,
} from './joint-trainings.types';

type JointTrainingsState = {
    isSearch: boolean;
    searchValue: string;
    paginationTotal: number;
    paginationPage: number;
    paginationPageSize: number;
};

const initialState: JointTrainingsState = {
    isSearch: false,
    searchValue: '',
    paginationTotal: 0,
    paginationPage: 1,
    paginationPageSize: 0,
};

export const jointTrainingsSlice = createSlice({
    name: 'joint-trainings',
    initialState,
    reducers: {
        openSearch: (state) => {
            state.isSearch = true;
        },
        closeSearch: (state) => {
            state.isSearch = false;
        },
        setSearchValue: (state, action: SetSearchValueAction) => {
            state.searchValue = action.payload;
        },
        setPaginationTotal: (state, action: SetPaginationTotalAction) => {
            state.paginationTotal = action.payload;
        },
        setPaginationPage: (state, action: SetPaginationPageAction) => {
            state.paginationPage = action.payload;
        },
        setPaginationPageSize: (state, action: SetPaginationPageSizeAction) => {
            state.paginationPageSize = action.payload;
        },
    },
});

export const {
    openSearch,
    closeSearch,
    setSearchValue,
    setPaginationTotal,
    setPaginationPage,
    setPaginationPageSize,
} = jointTrainingsSlice.actions;

export const isJointTrainingsSearchOpenSelector = (state: RootState) =>
    state.jointTrainings.isSearch;
export const searchValueSelector = (state: RootState) => state.jointTrainings.searchValue;
export const jointTrainingsSelector = (state: RootState) => state.jointTrainings;

export const jointTrainingsReducer = jointTrainingsSlice.reducer;
