import { useEffect } from 'react';
import { ExercisesForm } from '@components/exercises-form/exercises-form';
import { EXERCISES_FORM_MODES, FORM_NAMES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setUserInfo, userInfoSelector } from '@redux/slices/joint-training/joint-trainings';
import { openSuccessAlert } from '@redux/slices/success-alert';
import { setIsTrainingFormSubmitDisabled } from '@redux/slices/training-form';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useCreateInviteMutation } from '@services/endpoints/invite';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@services/endpoints/training';
import type { ExercisesFormValues } from '@typings/index';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { formatDate } from '@utils/utils';
import { Form, FormInstance } from 'antd';
import { type FormProviderProps } from 'antd/lib/form/context';

import type { TrainingInfoFormValues } from '../workouts-content.types';

import { TrainingInfoForm } from './training-info-form/training-info-form';
import { checkIsFieldsValid } from './training-form.utils';

type TrainingFormProps = {
    trainingInfoForm: FormInstance;
    exercisesForm: FormInstance;
    onClose: () => void;
};

const { NEW, EDIT, JOINT } = EXERCISES_FORM_MODES;

export const TrainingForm = ({ trainingInfoForm, exercisesForm, onClose }: TrainingFormProps) => {
    const { formExercises, isPast, exercisesFormMode, trainingType } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const userInfo = useAppSelector(userInfoSelector);
    const dispatch = useAppDispatch();

    const [createTraining] = useCreateTrainingMutation();
    const [updateTraining] = useUpdateTrainingMutation();
    const [createInvite] = useCreateInviteMutation();

    useEffect(() => {
        const isValid = checkIsFieldsValid(trainingInfoForm, exercisesForm, exercisesFormMode);

        dispatch(setIsTrainingFormSubmitDisabled(isValid));
    }, [dispatch, exercisesForm, exercisesFormMode, formExercises, trainingInfoForm]);

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

        const date = formatDate(trainingInfoFormValues.date);

        const body = {
            name: trainingInfoFormValues.name,
            date: date.iso,
            isImplementation: isPast,
            parameters,
            exercises,
        };

        try {
            if (exercisesFormMode === NEW) {
                await createTraining(body).unwrap();
            }

            if (exercisesFormMode === EDIT && trainingType.id) {
                await updateTraining({ body, id: trainingType.id }).unwrap();
            }

            if (exercisesFormMode === JOINT) {
                body.name = trainingType.name;
                const { _id: trainingId } = await createTraining(body).unwrap();

                const { to, status } = await createInvite({
                    to: userInfo.userId,
                    trainingId,
                }).unwrap();

                dispatch(
                    setUserInfo({
                        userId: to._id,
                        imageSrc: to.imageSrc,
                        name: `${to.firstName} ${to.lastName}`,
                        status,
                    }),
                );
            }

            if (exercisesFormMode !== JOINT) {
                dispatch(openSuccessAlert());
            }
        } catch {
            CenteredModalError({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При сохранении данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Придётся попробовать ещё раз
                    </span>
                ),
                okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
            });
        } finally {
            onClose();
        }
    };

    const onFormChange: FormProviderProps['onFormChange'] = (_, info) => {
        const isValid = checkIsFieldsValid(
            info.forms[FORM_NAMES.TRAINING_INFO_FORM],
            info.forms[FORM_NAMES.EXERCISES_FORM],
            exercisesFormMode,
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
