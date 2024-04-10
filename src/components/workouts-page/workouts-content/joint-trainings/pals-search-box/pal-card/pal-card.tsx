import { Flex } from '@components/flex/flex';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import type { JointTrainingListItem } from '@models/models';
import { setUserInfo } from '@redux/slices/joint-training/joint-trainings';
import { openSidePanel } from '@redux/slices/side-panel';
import {
    resetExercises,
    resetFormExercises,
    setExerciseDate,
    setExerciseFormMode,
    setTrainingType,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Button } from 'antd';
import classNames from 'classnames/bind';

import { TrainingInfo } from '../../training-info/training-info';
import { TrainingStatusBox } from '../../training-status-box/training-status-box';

import { HighlightedName } from './highlighted-name/highlighted-name';

import styles from './pal-card.module.css';

type PalCardProps = JointTrainingListItem;

const cx = classNames.bind(styles);

export const PalCard = ({
    id,
    avgWeightInWeek,
    imageSrc,
    inviteId,
    name,
    status,
    trainingType,
}: PalCardProps) => {
    const dispatch = useAppDispatch();

    const onCreateTraining = () => {
        dispatch(resetFormExercises());
        dispatch(resetExercises());

        dispatch(setExerciseFormMode('joint'));
        dispatch(setTrainingType({ name: trainingType }));
        dispatch(setExerciseDate({ iso: '', formated: '' }));
        dispatch(setUserInfo({ userId: id, imageSrc: imageSrc ?? '', name: name ?? '' }));
        dispatch(openSidePanel());
    };

    return (
        <Flex
            className={cx(styles.card, { [styles.cardRejected]: status === 'rejected' })}
            direction='column'
            gap='gap12'
        >
            <Flex align='alignCenter' gap='gap8'>
                <UserAvatarWithName
                    imageSrc={imageSrc}
                    name={name && <HighlightedName name={name} />}
                />
            </Flex>

            <TrainingInfo trainingType={trainingType} avgWeight={avgWeightInWeek} />
            {inviteId && status === 'accepted' ? (
                <Button className={styles.btn} block={true}>
                    Отменить тренировку
                </Button>
            ) : (
                <Button
                    className={styles.btn}
                    type='primary'
                    block={true}
                    disabled={status === 'pending' || status === 'rejected'}
                    onClick={onCreateTraining}
                >
                    Создать тренировку
                </Button>
            )}
            <TrainingStatusBox status={status} />
        </Flex>
    );
};
