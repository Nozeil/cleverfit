import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';

import type {
    AddExerciseAction,
    AddTrainingTypesAction,
    Exercises,
    FormExercises,
    FormModes,
    RemoveFormExerciseByIdAction,
    RemoveFormExercisesByIdsAction,
    SetExercisesAction,
    SetFormExercisesAction,
    SetFormModeAction,
    SetTrainingsAction,
    SetTrainingTypeAction,
    Trainings,
    TrainingType,
} from './training-modal.types';

type TrainingModalState = {
    exercisesFormMode: FormModes;
    trainingType: TrainingType;
    isOpen: boolean;
    isExercises: boolean;
    isExerciseBtnLocked: boolean;
    exerciseId: number;
    exercises: Exercises;
    formExercises: FormExercises;
    receivedExercises: Exercises;
    trainingTypes: string[];
    trainings: Trainings;
};

const initialState: TrainingModalState = {
    exercisesFormMode: 'new',
    isOpen: false,
    isExercises: false,
    isExerciseBtnLocked: true,
    exerciseId: 0,
    exercises: [],
    formExercises: [],
    receivedExercises: [],
    trainingType: { name: '', id: '' },
    trainingTypes: [],
    trainings: [],
};

export const trainingModalSlice = createSlice({
    name: 'trainingModal',
    initialState,
    reducers: {
        openTrainingModal: (state) => {
            state.isOpen = true;
        },
        closeTrainingModal: (state) => {
            state.isOpen = false;
        },
        switchToExercises: (state, action: AddTrainingTypesAction) => {
            state.isExercises = true;
            state.trainingTypes = action.payload;
        },
        lockExerciseBtn: (state) => {
            state.isExerciseBtnLocked = true;
        },
        unlockExerciseBtn: (state) => {
            state.isExerciseBtnLocked = false;
        },
        setExerciseFormMode: (state, action: SetFormModeAction) => {
            state.exercisesFormMode = action.payload;
        },
        setTrainingType: (state, action: SetTrainingTypeAction) => {
            state.trainingType = { name: action.payload.name, id: action.payload.id };
        },
        setTrainings: (state, action: SetTrainingsAction) => {
            const { trainingType, trainings } = action.payload;
            state.trainingType = trainingType;
            state.trainings = trainings;
        },
        addExercise: (state, action: AddExerciseAction) => {
            state.exercises = [...state.exercises, action.payload];
        },
        setFormExercises: (state, action: SetFormExercisesAction) => {
            state.formExercises = action.payload
                ? [...state.receivedExercises, ...action.payload]
                : [...state.receivedExercises];
        },
        addEmptyFormExercise: (state) => {
            const exercise = {
                _id: ++state.exerciseId,
            };
            state.formExercises = [...state.formExercises, exercise];
        },
        resetFormExercises: (state) => {
            state.exerciseId = 0;
            const exercise = {
                _id: state.exerciseId,
            };

            state.formExercises = [exercise];
        },
        removeFormExercisesByIds: (state, action: RemoveFormExercisesByIdsAction) => {
            state.formExercises = state.formExercises.filter(
                (exercise) => !action.payload.includes(exercise._id),
            );
        },
        removeFormExerciseById: (state, action: RemoveFormExerciseByIdAction) => {
            if (state.formExercises.length > 1) {
                state.formExercises = state.exercises.filter(
                    (exercise) => exercise._id !== action.payload,
                );
            }
        },
        setExercises: (state, action: SetExercisesAction) => {
            state.exercises = action.payload;
        },
        clearExercises: (state) => {
            state.exercises = [];
        },
        setReceivedExercises: (state, action: SetExercisesAction) => {
            state.exercises = action.payload;
            state.receivedExercises = action.payload;
        },
        resetExercises: (state) => {
            state.exercisesFormMode = 'new';
            state.isExercises = false;
            state.isExerciseBtnLocked = true;
            state.trainingType = { name: '', id: '' };
            state.exercises = [];
            state.trainings = [];
            state.receivedExercises = [];
        },
    },
});

export const {
    closeTrainingModal,
    openTrainingModal,
    switchToExercises,
    setTrainingType,
    lockExerciseBtn,
    unlockExerciseBtn,
    setExercises,
    setReceivedExercises,
    resetExercises,
    setTrainings,
    clearExercises,
    addExercise,
    addEmptyFormExercise,
    removeFormExerciseById,
    resetFormExercises,
    setExerciseFormMode,
    setFormExercises,
    removeFormExercisesByIds,
} = trainingModalSlice.actions;
export const isTrainingModalOpenSelector = (state: RootState) => state.trainingModal.isOpen;
export const trainingModalSelector = (state: RootState) => state.trainingModal;
export const trainingModalReducer = trainingModalSlice.reducer;
