import { GetTrainingResponse } from '@models/models';
import { type PayloadAction } from '@reduxjs/toolkit';
import type { TrainingsTableSortedBy } from '@typings/index';

export type SortedTrainings = GetTrainingResponse;

export type SetSortedByAction = PayloadAction<TrainingsTableSortedBy>;
export type SetSortedTrainings = PayloadAction<SortedTrainings>;
