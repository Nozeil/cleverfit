import { type RootState } from '@redux/configure-store';
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import type {
    AddExerciseAction,
    AddTrainingTypesAction,
    Exercises,
    FormExercises,
    FormModes,
    RemoveFormExerciseByIdAction,
    RemoveFormExercisesByIdsAction,
    SetExerciseDateAction,
    SetExercisesAction,
    SetFormModeAction,
    SetTrainingsAction,
    SetTrainingTypeAction,
    TrainingModalDate,
    Trainings,
    TrainingType,
    TrainingTypesWithImplementation,
} from './training-modal-and-exercises-form.types';

type TrainingModalStateAndExercisesForm = {
    date: TrainingModalDate;
    exercisesFormMode: FormModes;
    trainingType: TrainingType;
    isPast: boolean;
    isOpen: boolean;
    isExercises: boolean;
    isExerciseBtnLocked: boolean;
    exerciseId: string;
    exercises: Exercises;
    formExercises: FormExercises;
    receivedExercises: Exercises;
    trainingTypes: TrainingTypesWithImplementation;
    trainings: Trainings;
};

const initialState: TrainingModalStateAndExercisesForm = {
    date: { iso: '', formated: '' },
    exercisesFormMode: 'new',
    isPast: false,
    isOpen: false,
    isExercises: false,
    isExerciseBtnLocked: true,
    exerciseId: uuidv4(),
    exercises: [],
    formExercises: [],
    receivedExercises: [],
    trainingType: { name: '', id: '' },
    trainingTypes: [],
    trainings: [],
};

export const trainingModalAndExercisesFormSlice = createSlice({
    name: 'trainingModalWithExercisesForm',
    initialState,
    reducers: {
        setIsPastTrue: (state) => {
            state.isPast = true;
        },
        setIsPastFalse: (state) => {
            state.isPast = false;
        },
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
        setFormExercises: (state) => {
            state.formExercises = state.receivedExercises;
        },
        addEmptyFormExercise: (state) => {
            const exercise = {
                _id: uuidv4(),
            };

            state.formExercises = [...state.formExercises, exercise];
        },
        resetFormExercises: (state) => {
            state.exerciseId = uuidv4();
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
        setExerciseDate(state, action: SetExerciseDateAction) {
            state.date = action.payload;
        },
        setTrainingTypes: (state, action: AddTrainingTypesAction) => {
            state.trainingTypes = action.payload;
        },
    },
});

export const {
    setIsPastFalse,
    setIsPastTrue,
    closeTrainingModal,
    openTrainingModal,
    switchToExercises,
    setTrainingType,
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
    setExerciseDate,
    setTrainingTypes,
} = trainingModalAndExercisesFormSlice.actions;
export const isTrainingModalOpenSelector = (state: RootState) =>
    state.trainingModalAndExercisesForm.isOpen;
export const trainingModalAndExercisesFormSelector = (state: RootState) =>
    state.trainingModalAndExercisesForm;
export const exercisesFormModeSelector = (state: RootState) =>
    state.trainingModalAndExercisesForm.exercisesFormMode;
export const exercisesFormFormExercisesSelector = (state: RootState) =>
    state.trainingModalAndExercisesForm.formExercises;
export const trainingModalAndExercisesFormDateSelector = (state: RootState) =>
    state.trainingModalAndExercisesForm.date;

export const trainingModalAndExercisesFormReducer = trainingModalAndExercisesFormSlice.reducer;
