import type { TrainingListItem } from '@models/models';
import { PayloadAction } from '@reduxjs/toolkit';

type TrainingPerPeriodItem = {
    date: string;
    dm: string;
    dayOfTheWeek: number;
    dayOfTheWeekReadable: string;
    trainingNames: string[];
    exerciseNames: string[];
    load: number;
    approaches: number;
    replays: number;
};

export type TrainingsPerPeriod = TrainingPerPeriodItem[];

export type SetActiveFilterAction = PayloadAction<TrainingListItem>;
export type SetTrainingsPerWeekAction = PayloadAction<TrainingsPerPeriod>;
