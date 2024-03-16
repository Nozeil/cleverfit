import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeTrainingModal,
    resetFormExercises,
    trainingModalSelector,
} from '@redux/slices/training-modal/training-modal';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@services/endpoints/training';
import { Button, Modal } from 'antd';
import { type CSSProperties } from 'react';

import type { PickedDate } from '../calendar-content.types';
import { ExercisesCard } from './exercises-card';
import styles from './training-modal.module.css';
import { TrainingsCard } from './trainings-card';

type TrainingModalProps = {
    date: PickedDate;
    resetExercisesAndForm: () => void;
    resetForm: () => void;
    addExerciseBtnHandler: () => void;
    style?: CSSProperties;
};

export const TrainingModal = ({
    date,
    style,
    resetForm,
    resetExercisesAndForm,
    addExerciseBtnHandler,
}: TrainingModalProps) => {
    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

    const isLoading = isCreateLoading || isUpdateLoading;

    const {
        isExercises,
        isExerciseBtnLocked,
        trainingType,
        exercises,
        formExercises,
        exercisesFormMode,
    } = useAppSelector(trainingModalSelector);
    const dispatch = useAppDispatch();

    const { iso, formated } = date;

    const onSaveExerciseBtnClick = async () => {
        try {
            const body = {
                name: trainingType.name,
                date: iso,
                isImplementation: false,
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
                title: 'При сохранении данных произошла ошибка',
                content: 'Придётся попробовать ещё раз',
                centered: true,
                autoFocusButton: null,
                okText: 'Закрыть',
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

    const onArrowLeftClick = () => {
        resetExercisesAndForm();
    };

    const content = isExercises ? (
        <ExercisesCard
            saveButton={
                <Button
                    block
                    type='link'
                    disabled={!exercises.length}
                    onClick={onSaveExerciseBtnClick}
                    loading={isLoading}
                >
                    Сохранить
                </Button>
            }
            resetForm={resetForm}
            onArrowLeftClick={onArrowLeftClick}
            onAddExerciseBtnClick={() => {
                if (!isExerciseBtnLocked) {
                    if (!formExercises.length) {
                        dispatch(resetFormExercises());
                    }
                    addExerciseBtnHandler();
                }
            }}
        />
    ) : (
        <TrainingsCard date={<span className={styles.date}>{formated}</span>} iso={iso} />
    );

    return (
        <div className={styles.modal} style={style}>
            {content}
        </div>
    );
};
