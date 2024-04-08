import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { TRAINING_COLORS } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { TrainingResponse } from '@models/models';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    resetExercises,
    resetFormExercises,
    setExerciseDate,
    setExerciseFormMode,
    setFormExercises,
    setIsPastFalse,
    setIsPastTrue,
    setReceivedExercises,
    setTrainingType,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { setIsExerciseCard } from '@redux/slices/trainings-table/trainings-table';
import { Badge, Button, ButtonProps, Typography } from 'antd';
import moment from 'moment';

import { formatExerciseDate } from '../../workouts-content.utils';
import { PERIODS } from '../workouts-content.constants';

import { ContainersRefCurrent } from './trainings-list.type';

import styles from './trainings-list.module.css';

type TrainingListItemProps = {
    setContainers: (current: ContainersRefCurrent) => void;
} & Omit<TrainingResponse, 'userId'>;

export const TrainingListItem = ({
    name,
    _id,
    parameters,
    isImplementation,
    date,
    exercises,
    setContainers,
}: TrainingListItemProps) => {
    const dispatch = useAppDispatch();

    const prepareFormData = () => {
        const exerciseDate = formatExerciseDate(date);
        const setIsPastAction = moment(date).isBefore() ? setIsPastTrue : setIsPastFalse;

        dispatch(resetFormExercises());
        dispatch(resetExercises());

        dispatch(setExerciseFormMode('edit'));
        dispatch(setReceivedExercises(exercises));
        dispatch(setFormExercises());
        dispatch(setExerciseDate(exerciseDate));
        dispatch(setTrainingType({ name, id: _id }));
        dispatch(setIsPastAction());
    };

    const onEdit = () => {
        prepareFormData();
        dispatch(openSidePanel());
    };

    const onShowExerciseCard: ButtonProps['onClick'] = (e) => {
        const containersWithKeys = [
            ['xs', `.${styles.listItem}`],
            ['default', `.${styles.trainingName}`],
        ].map(([key, selector]) => [key, e.currentTarget.closest(selector)]);

        const containers: ContainersRefCurrent = Object.fromEntries(containersWithKeys);

        prepareFormData();
        setContainers(containers);

        dispatch(setIsExerciseCard(false));
        dispatch(setIsExerciseCard(true));
    };

    return (
        <Flex as='li' className={styles.listItem} align='alignCenter' gap='gap12'>
            <Flex className={styles.training} align='alignCenter' gap='gap12'>
                <Flex className={styles.badgeWrapper} align='alignCenter'>
                    <Badge color={TRAINING_COLORS[name]} />
                </Flex>
                <Flex className={styles.trainingName} align='alignCenter' justify='justifyBetween'>
                    <Typography.Text>{name}</Typography.Text>
                    <Button
                        className={styles.btn}
                        type='text'
                        icon={<DownOutlined style={{ fontSize: 12 }} />}
                        onClick={onShowExerciseCard}
                    />
                </Flex>
            </Flex>

            <Flex
                className={styles.period}
                justify='justifyBetween'
                align='alignCenter'
                gap='gap12'
            >
                <Flex className={styles.periodTextWrapper} align='alignCenter'>
                    <Typography.Text className={styles.periodText}>
                        {parameters.period && PERIODS[parameters.period - 1]}
                    </Typography.Text>
                </Flex>

                <Button
                    className={styles.editBtn}
                    type='text'
                    icon={<EditOutlined style={{ fontSize: 28 }} />}
                    disabled={isImplementation}
                    onClick={onEdit}
                />
            </Flex>
        </Flex>
    );
};
