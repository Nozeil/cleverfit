import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type {
    SetDeletedUserIdAction,
    SetPaginationPageAction,
    SetPaginationPageSizeAction,
    SetPaginationTotalAction,
    SetSearchValueAction,
    SetTrainingKeyAction,
    SetUserInfoAction,
    UserInfo,
} from './joint-trainings.types';

type JointTrainingsState = {
    isSearch: boolean;
    isRandom: boolean;
    searchValue: string;
    paginationTotal: number;
    paginationPage: number;
    paginationPageSize: number;
    trainingKey: string;
    userInfo: UserInfo;
    deletedUserId: string;
};

const initialState: JointTrainingsState = {
    isSearch: false,
    isRandom: false,
    searchValue: '',
    paginationTotal: 0,
    paginationPage: 1,
    paginationPageSize: 0,
    trainingKey: '',
    userInfo: { userId: '', imageSrc: '', name: '', status: null },
    deletedUserId: '',
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
        setIsRandomTrue: (state) => {
            state.isRandom = true;
        },
        setIsRandomFalse: (state) => {
            state.isRandom = false;
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
        setTrainingKey: (state, action: SetTrainingKeyAction) => {
            state.trainingKey = action.payload;
        },
        setUserInfo: (state, action: SetUserInfoAction) => {
            state.userInfo = action.payload;
        },
        setDeletedUserId: (state, action: SetDeletedUserIdAction) => {
            state.deletedUserId = action.payload;
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
    setIsRandomFalse,
    setIsRandomTrue,
    setTrainingKey,
    setUserInfo,
    setDeletedUserId,
} = jointTrainingsSlice.actions;

export const isJointTrainingsSearchOpenSelector = (state: RootState) =>
    state.jointTrainings.isSearch;
export const searchValueSelector = (state: RootState) => state.jointTrainings.searchValue;
export const isRandomSelector = (state: RootState) => state.jointTrainings.isRandom;
export const userInfoSelector = (state: RootState) => state.jointTrainings.userInfo;
export const deletedUserIdSelector = (state: RootState) => state.jointTrainings.deletedUserId;
export const jointTrainingsSelector = (state: RootState) => state.jointTrainings;

export const jointTrainingsReducer = jointTrainingsSlice.reducer;
