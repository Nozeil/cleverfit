import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalSelector } from '@redux/slices/training-modal/training-modal';
import { Button } from 'antd';
import { type CSSProperties } from 'react';

import { ExercisesCard } from './exercises-card/exercises-card';
import { useOnSaveExercise } from './hooks/use-on-save-exercise';
import styles from './training-modal.module.css';
import { TrainingsCard } from './trainings-card/trainings-card';

type TrainingModalProps = {
    resetExercisesAndForm: () => void;
    resetForm: () => void;
    style?: CSSProperties;
};

export const TrainingModal = ({ style, resetForm, resetExercisesAndForm }: TrainingModalProps) => {
    const { isExercises, exercises, exercisesFormMode, isPast } =
        useAppSelector(trainingModalSelector);
    const { onSaveExercise, isLoading } = useOnSaveExercise(resetExercisesAndForm);

    const saveBtnContent = isPast ? 'Сохранить изменения' : 'Сохранить';

    const content = isExercises ? (
        <ExercisesCard
            saveButton={
                <Button
                    block
                    type='link'
                    disabled={!exercises.length && exercisesFormMode === 'new'}
                    onClick={onSaveExercise}
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
