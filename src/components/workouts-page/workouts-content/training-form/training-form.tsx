import { useEffect } from 'react';
import { ExercisesForm } from '@components/exercises-form/exercises-form';
import { DATE_FORMATS, FORM_NAMES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setIsTrainingFormSubmitDisabled } from '@redux/slices/training-form';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useCreateTrainingMutation } from '@services/endpoints/training';
import type { ExercisesFormValues } from '@typings/index';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { Form, FormInstance } from 'antd';
import { type FormProviderProps } from 'antd/lib/form/context';
import moment from 'moment';

import type { TrainingInfoFormValues } from '../workouts-content.types';

import { TrainingInfoForm } from './training-info-form/training-info-form';
import { checkIsFieldsValid } from './training-form.utils';

type TrainingFormProps = {
    trainingInfoForm: FormInstance;
    exercisesForm: FormInstance;
    onClose: () => void;
};

export const TrainingForm = ({ trainingInfoForm, exercisesForm, onClose }: TrainingFormProps) => {
    const { formExercises, isPast } = useAppSelector(trainingModalAndExercisesFormSelector);
    const dispatch = useAppDispatch();

    const [createTraining] = useCreateTrainingMutation();

    useEffect(() => {
        const isValid = checkIsFieldsValid(trainingInfoForm, exercisesForm);

        dispatch(setIsTrainingFormSubmitDisabled(isValid));
    }, [dispatch, exercisesForm, formExercises, trainingInfoForm]);

    const onFormFinish: FormProviderProps['onFormFinish'] = async (_, info) => {
        const trainingInfoFormValues = info.forms[
            FORM_NAMES.TRAINING_INFO_FORM
        ].getFieldsValue() as TrainingInfoFormValues;

        const exercisesFormValues = Object.values(
            info.forms[FORM_NAMES.EXERCISES_FORM].getFieldsValue() as ExercisesFormValues,
        );
        const exercises = exercisesFormValues.map(
            ({ name, approaches, weight, replays, isImplementation }) => ({
                name,
                approaches: approaches ?? 1,
                weight: weight ?? 0,
                replays: replays ?? 1,
                isImplementation: isImplementation ?? false,
            }),
        );

        const parameters = trainingInfoFormValues?.period
            ? { repeat: true, period: trainingInfoFormValues.period }
            : undefined;

        const body = {
            name: trainingInfoFormValues.name,
            date: moment(trainingInfoFormValues.date.toISOString(true)).format(DATE_FORMATS.ISO),
            isImplementation: isPast,
            parameters,
            exercises,
        };

        try {
            await createTraining(body).unwrap();
        } catch {
            CenteredModalError();
        } finally {
            onClose();
        }
    };

    const onFormChange: FormProviderProps['onFormChange'] = (_, info) => {
        const isValid = checkIsFieldsValid(
            info.forms[FORM_NAMES.TRAINING_INFO_FORM],
            info.forms[FORM_NAMES.EXERCISES_FORM],
        );

        dispatch(setIsTrainingFormSubmitDisabled(isValid));
    };

    return (
        <Form.Provider onFormChange={onFormChange} onFormFinish={onFormFinish}>
            <TrainingInfoForm form={trainingInfoForm} />
            <ExercisesForm form={exercisesForm} />
        </Form.Provider>
    );
};
