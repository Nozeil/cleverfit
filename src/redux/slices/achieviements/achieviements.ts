import { ACTIVE_FILTER_ALL } from '@constants/index';
import type { TrainingListItem } from '@models/models';
import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type {
    SetActiveFilterAction,
    SetTrainingsPerWeekAction,
    TrainingsPerPeriod,
} from './achieviements.types';

type AchieviementsState = {
    trainingsPerWeek: TrainingsPerPeriod;
    activeFilter: TrainingListItem;
};

const initialState: AchieviementsState = {
    trainingsPerWeek: [],
    activeFilter: { name: ACTIVE_FILTER_ALL.NAME, key: ACTIVE_FILTER_ALL.KEY },
};

export const achieviementsSlice = createSlice({
    name: 'achieviements',
    initialState,
    reducers: {
        setActiveFilter: (state, action: SetActiveFilterAction) => {
            state.activeFilter = action.payload;
        },
        setTrainingsPerWeek: (state, action: SetTrainingsPerWeekAction) => {
            state.trainingsPerWeek = action.payload;
        },
    },
});

export const { setActiveFilter, setTrainingsPerWeek } = achieviementsSlice.actions;
export const activeFilterSelector = (state: RootState) => state.achieviements.activeFilter;
export const trainingsPerWeekSelector = (state: RootState) => state.achieviements.trainingsPerWeek;
export const achieviementsReducer = achieviementsSlice.reducer;
