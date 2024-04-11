import { EditOutlined } from '@ant-design/icons';
import { TrainingBadge } from '@components/training-badge';
import { EXERCISES_FORM_MODES } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { TrainingResponse } from '@models/models';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    setExerciseFormMode,
    setFormExercises,
    setReceivedExercises,
    setTrainings,
    switchToExercises,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button, Row } from 'antd';

import { useTrainingTypes } from './hooks/use-training-types';

import styles from '../training-modal.module.css';

type TrainingProps = Omit<TrainingResponse, 'date' | 'userId' | 'parameters'> & { index: number };

const { VIEW, EDIT } = EXERCISES_FORM_MODES;

export const Training = ({ _id, name, isImplementation, index, exercises }: TrainingProps) => {
    const { trainingQueryResult, trainingTypes, isPast } = useTrainingTypes();
    const dispatch = useAppDispatch();

    const onClick = () => {
        if (trainingQueryResult.filteredTrainings) {
            dispatch(
                setTrainings({
                    trainingType: {
                        name,
                        id: _id,
                    },
                    trainings: trainingQueryResult.filteredTrainings,
                }),
            );
        }

        dispatch(setReceivedExercises(exercises));
        dispatch(setFormExercises());

        if (isImplementation) {
            dispatch(setExerciseFormMode(VIEW));
            dispatch(openSidePanel());
        } else {
            dispatch(setExerciseFormMode(EDIT));

            if (trainingTypes) {
                const paylaod = isPast
                    ? trainingTypes.filter((type) => type.isImplementation)
                    : trainingTypes.filter((type) => type.name !== name);

                dispatch(switchToExercises(paylaod));
            }
        }
    };

    return (
        <Row className={styles.trainingWrapper} justify='space-between'>
            <TrainingBadge
                className={isImplementation ? styles.badgeDisabled : undefined}
                text={name}
            />
            <Button
                data-test-id={`modal-update-training-edit-button${index}`}
                className={styles.editBtn}
                disabled={isImplementation}
                icon={<EditOutlined />}
                onClick={onClick}
            />
        </Row>
    );
};
