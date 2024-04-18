import { ACHIEVEMENT_ACTIVE_KEYS } from '@constants/index';
import type { TrainingListItem } from '@models/models';
import { PayloadAction } from '@reduxjs/toolkit';

export type TrainingPerPeriodItem = {
    date: string;
    dm: string;
    dayOfTheWeek: number;
    dayOfTheWeekReadable: string;
    trainingNames: string[];
    exerciseNames: string[];
    load: number;
    averageLoad: number;
    approaches: number;
    replays: number;
};

export type TrainingsPerPeriod = TrainingPerPeriodItem[];

export type SetActiveFilterAction = PayloadAction<TrainingListItem>;
export type SetTrainingsPerWeekAction = PayloadAction<TrainingsPerPeriod>;
export type ActiveKey = (typeof ACHIEVEMENT_ACTIVE_KEYS)[keyof typeof ACHIEVEMENT_ACTIVE_KEYS];
export type SetActiveKeyAction = PayloadAction<ActiveKey>;
