import { ACHIEVEMENT_ACTIVE_KEYS, ACTIVE_FILTER_ALL } from '@constants/index';
import type { TrainingListItem } from '@models/models';
import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type {
    ActiveKey,
    SetActiveFilterAction,
    SetActiveKeyAction,
    SetTrainingsPerWeekAction,
    TrainingsPerPeriod,
} from './achieviements.types';

type AchieviementsState = {
    trainingsPerPeriod: TrainingsPerPeriod;
    activeKey: ActiveKey;
    activeFilter: TrainingListItem;
};

const initialState: AchieviementsState = {
    trainingsPerPeriod: [],
    activeKey: ACHIEVEMENT_ACTIVE_KEYS.WEEK,
    activeFilter: { name: ACTIVE_FILTER_ALL.NAME, key: ACTIVE_FILTER_ALL.KEY },
};

export const achieviementsSlice = createSlice({
    name: 'achieviements',
    initialState,
    reducers: {
        setActiveFilter: (state, action: SetActiveFilterAction) => {
            state.activeFilter = action.payload;
        },
        setActiveKey: (state, action: SetActiveKeyAction) => {
            state.activeKey = action.payload;
        },
        setTrainingsPerPeriod: (state, action: SetTrainingsPerWeekAction) => {
            state.trainingsPerPeriod = action.payload;
        },
    },
});

export const { setActiveFilter, setTrainingsPerPeriod, setActiveKey } = achieviementsSlice.actions;
export const activeFilterSelector = (state: RootState) => state.achieviements.activeFilter;
export const activeKeySelector = (state: RootState) => state.achieviements.activeKey;
export const trainingsPerPeriodSelector = (state: RootState) =>
    state.achieviements.trainingsPerPeriod;
export const achieviementsReducer = achieviementsSlice.reducer;
