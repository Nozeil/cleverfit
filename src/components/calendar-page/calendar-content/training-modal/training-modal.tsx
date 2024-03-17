import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeTrainingModal,
    trainingModalSelector,
} from '@redux/slices/training-modal/training-modal';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@services/endpoints/training';
import { Button, Modal } from 'antd';
import { type CSSProperties } from 'react';

import { ExercisesCard } from './exercises-card';
import styles from './training-modal.module.css';
import { TrainingsCard } from './trainings-card/trainings-card';

type TrainingModalProps = {
    resetExercisesAndForm: () => void;
    resetForm: () => void;
    style?: CSSProperties;
};

export const TrainingModal = ({ style, resetForm, resetExercisesAndForm }: TrainingModalProps) => {
    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

    const { isExercises, trainingType, exercises, exercisesFormMode, isPast, date } =
        useAppSelector(trainingModalSelector);
    const dispatch = useAppDispatch();

    const isLoading = isCreateLoading || isUpdateLoading;

    const onSaveExerciseBtnClick = async () => {
        try {
            const body = {
                name: trainingType.name,
                date: date.iso,
                isImplementation: isPast,
                parameters: {
                    repeat: false,
                    period: 7,
                    jointTraining: false,
                    participants: [],
                },
                exercises: exercises.map(
                    ({ name, approaches, isImplementation, replays, weight }) => ({
                        name,
                        approaches,
                        isImplementation,
                        replays,
                        weight,
                    }),
                ),
            };
            if (exercisesFormMode === 'new') {
                await createTraining(body).unwrap();
            } else if (exercisesFormMode === 'edit') {
                if (trainingType.id) {
                    await updateTraining({ body, id: trainingType.id }).unwrap();
                }
            }
        } catch {
            Modal.error({
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
                centered: true,
                autoFocusButton: null,
                okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
                okButtonProps: {
                    className: styles.modalOkBtn,
                },
                maskStyle: { backgroundColor: 'var(--blue-2)' },
                onOk: (close) => {
                    close();
                    dispatch(closeTrainingModal());
                },
            });
        } finally {
            resetExercisesAndForm();
        }
    };

    const saveBtnContent = isPast ? 'Сохранить изменения' : 'Сохранить';

    const content = isExercises ? (
        <ExercisesCard
            saveButton={
                <Button
                    block
                    type='link'
                    disabled={!exercises.length && exercisesFormMode === 'new'}
                    onClick={onSaveExerciseBtnClick}
                    loading={isLoading}
                >
                    {saveBtnContent}
                </Button>
            }
            resetForm={resetForm}
            onArrowLeftClick={resetExercisesAndForm}
        />
    ) : (
        <TrainingsCard />
    );

    return (
        <div className={styles.modal} style={style}>
            {content}
        </div>
    );
};
