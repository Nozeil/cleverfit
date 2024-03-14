import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import { type RemoveExerciseIdAction } from './exercises-form.types';

type ExercisesFormState = {
    id: number;
    exercisesIds: number[];
};

const initialState: ExercisesFormState = {
    id: 0,
    exercisesIds: [0],
};

export const exercisesFormSlice = createSlice({
    name: 'exercisesForm',
    initialState,
    reducers: {
        addExerciseId: (state) => {
            state.exercisesIds = [...state.exercisesIds, ++state.id];
        },
        removeExerciseId: (state, action: RemoveExerciseIdAction) => {
            state.exercisesIds =
                state.exercisesIds.length > 1
                    ? state.exercisesIds.filter((id) => id !== action.payload)
                    : state.exercisesIds;
        },
        clearExerciseIds: (state) => {
            state.id = 0;
            state.exercisesIds = [state.id];
        },
    },
});

export const { addExerciseId, removeExerciseId, clearExerciseIds } = exercisesFormSlice.actions;
export const exerciseIdsSelector = (state: RootState) => state.exercisesForm.exercisesIds;
export const exercisesFormReducer = exercisesFormSlice.reducer;
