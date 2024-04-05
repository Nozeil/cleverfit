import type { ExercisesFormValues } from '@typings/index';
import { FormInstance } from 'rc-field-form';

import type { TrainingInfoFormValues } from '../workouts-content.types';

export const checkIsFieldsValid = (
    trainingInfoForm: FormInstance<TrainingInfoFormValues>,
    exercisesForm: FormInstance<ExercisesFormValues>,
) => {
    const exercisesFormValues = exercisesForm.getFieldsValue();
    const trainingInfoFormValues = trainingInfoForm.getFieldsValue();

    const isFieldsValid =
        !trainingInfoFormValues?.name ||
        !trainingInfoFormValues?.date ||
        Object.values(exercisesFormValues).some((exercise) => exercise?.name === undefined);

    return isFieldsValid;
};
