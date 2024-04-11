import { EXERCISES_FORM_MODES } from '@constants/index';
import type { ExercisesFormModes, ExercisesFormValues } from '@typings/index';
import { FormInstance } from 'rc-field-form';

import type { TrainingInfoFormValues } from '../workouts-content.types';

const { JOINT } = EXERCISES_FORM_MODES;

export const checkIsFieldsValid = (
    trainingInfoForm: FormInstance<TrainingInfoFormValues>,
    exercisesForm: FormInstance<ExercisesFormValues>,
    formMode: ExercisesFormModes,
) => {
    const exercisesFormValues = exercisesForm.getFieldsValue();
    const trainingInfoFormValues = trainingInfoForm.getFieldsValue();

    const exercises = Object.values(exercisesFormValues);

    const isFieldsValid =
        !trainingInfoFormValues?.date || exercises.some((exercise) => exercise?.name === undefined);

    return formMode === JOINT
        ? !exercises.length || isFieldsValid
        : !trainingInfoFormValues?.name || isFieldsValid;
};
