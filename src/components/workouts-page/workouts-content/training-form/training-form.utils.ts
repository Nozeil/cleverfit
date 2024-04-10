import { FormModes } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form.types';
import type { ExercisesFormValues } from '@typings/index';
import { FormInstance } from 'rc-field-form';

import type { TrainingInfoFormValues } from '../workouts-content.types';

export const checkIsFieldsValid = (
    trainingInfoForm: FormInstance<TrainingInfoFormValues>,
    exercisesForm: FormInstance<ExercisesFormValues>,
    formMode: FormModes,
) => {
    const exercisesFormValues = exercisesForm.getFieldsValue();
    const trainingInfoFormValues = trainingInfoForm.getFieldsValue();

    const exercises = Object.values(exercisesFormValues);

    const isFieldsValid =
        !trainingInfoFormValues?.date || exercises.some((exercise) => exercise?.name === undefined);

    return formMode === 'joint'
        ? !exercises.length || isFieldsValid
        : !trainingInfoFormValues?.name || isFieldsValid;
};
