import { type ReactNode } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ExercisesContent } from '@components/exercises-content';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    resetFormExercises,
    trainingModalAndExercisesFormSelector,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button, Card } from 'antd';

import { Exercises } from './exercises';
import { ExercisesSelect } from './exercises-select';

import styles from '../training-modal.module.css';

type ExercisesCardProps = {
    saveButton: ReactNode;
    resetForm: () => void;
    onArrowLeftClick: () => void;
};

export const ExercisesCard = ({ saveButton, resetForm, onArrowLeftClick }: ExercisesCardProps) => {
    const { formExercises, isExerciseBtnLocked } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();

    const onAddExerciseClick = () => {
        if (!formExercises.length) {
            dispatch(resetFormExercises());
        }

        dispatch(openSidePanel());
    };

    return (
        <Card
            className={styles.card}
            bordered={false}
            title={
                <Flex className={styles.cardTitleWrapper}>
                    <ArrowLeftOutlined
                        onClick={onArrowLeftClick}
                        data-test-id='modal-exercise-training-button-close'
                    />
                    <ExercisesSelect reset={resetForm} />
                </Flex>
            }
            actions={[
                <Flex direction='column' gap='gap8'>
                    <Button
                        block={true}
                        type='default'
                        onClick={onAddExerciseClick}
                        disabled={isExerciseBtnLocked}
                    >
                        Добавить упражнения
                    </Button>
                    {saveButton}
                </Flex>,
            ]}
            data-test-id='modal-create-exercise'
        >
            <ExercisesContent content={<Exercises onAdd={onAddExerciseClick} />} />
        </Card>
    );
};
