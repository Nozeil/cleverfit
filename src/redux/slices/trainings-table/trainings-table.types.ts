import { GetTrainingResponse } from '@models/models';
import { type PayloadAction } from '@reduxjs/toolkit';
import type { TrainingsTableSortedBy } from '@typings/index';

export type Trainings = GetTrainingResponse;

export type SetSortedByAction = PayloadAction<TrainingsTableSortedBy>;
export type SetSortedTrainingsAction = PayloadAction<Trainings>;
export type SetPaginationPageSizeAction = PayloadAction<number>;
export type SetPaginationPageAction = PayloadAction<number>;
export type SetIsExerciseCardAction = PayloadAction<boolean>;
