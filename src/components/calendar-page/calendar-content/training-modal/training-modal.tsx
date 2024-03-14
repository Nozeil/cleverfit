import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { closeTrainingModal, exercisesSelector } from '@redux/slices/training-modal/training-modal';
import { useCreateTrainingMutation } from '@services/endpoints/training';
import { Button, Modal } from 'antd';
import { type CSSProperties, useState } from 'react';

import type { PickedDate } from '../calendar-content.types';
import { ExercisesCard } from './exercises-card';
import styles from './training-modal.module.css';
import { TrainingsCard } from './trainings-card';

type TrainingModalProps = {
    date: PickedDate;
    trainingType: string;
    isExerciseBtnBlocked: boolean;
    resetExercisesAndForm: () => void;
    addExerciseBtnHandler: () => void;
    onTrainingSelect: (training: string) => void;
    style?: CSSProperties;
};

export const TrainingModal = ({
    date,
    trainingType,
    isExerciseBtnBlocked,
    style,
    resetExercisesAndForm,
    addExerciseBtnHandler,
    onTrainingSelect,
}: TrainingModalProps) => {
    const [createTraining, { isLoading }] = useCreateTrainingMutation();
    const dispatch = useAppDispatch();

    const exercises = useAppSelector(exercisesSelector);

    const [isAddTraining, setIsAddTraining] = useState(false);

    const { iso, formated } = date;

    const onSaveExerciseBtnClick = async () => {
        try {
            const body = {
                name: trainingType,
                date: iso,
                isImplementation: false,
                parameters: {
                    repeat: false,
                    period: 7,
                    jointTraining: false,
                    participants: [],
                },
                exercises,
            };
            await createTraining(body).unwrap();
            setIsAddTraining(false);
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
        setIsAddTraining(false);
    };

    const content = isAddTraining ? (
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
            onArrowLeftClick={onArrowLeftClick}
            onSelect={onTrainingSelect}
            onAddExerciseBtnClick={() => {
                if (!isExerciseBtnBlocked) {
                    addExerciseBtnHandler();
                }
            }}
        />
    ) : (
        <TrainingsCard
            date={<span className={styles.date}>{formated}</span>}
            iso={iso}
            onBtnClick={() => setIsAddTraining(true)}
        />
    );

    return (
        <div className={styles.modal} style={style}>
            {content}
        </div>
    );
};
