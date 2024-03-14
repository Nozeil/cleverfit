import { type TrainingExercise, TrainingResponse } from '@models/models';
import { type PayloadAction } from '@reduxjs/toolkit';

export type Exercises = (TrainingExercise & { id: number })[];
export type Trainings = TrainingResponse[];
export type AddExercisesAction = PayloadAction<Exercises>;
export type AddTrainingsAction = PayloadAction<Trainings>;
export type AddTrainingTypesAction = PayloadAction<string[]>;
