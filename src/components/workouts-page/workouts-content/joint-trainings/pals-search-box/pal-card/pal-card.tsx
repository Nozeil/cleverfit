import { Flex } from '@components/flex/flex';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { EXERCISES_FORM_MODES, INVITES_STATUS } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import type { JointTrainingListItem } from '@models/models';
import { setUserInfo, userInfoSelector } from '@redux/slices/joint-training/joint-trainings';
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

type PalCardProps = JointTrainingListItem & { testId: string };

const cx = classNames.bind(styles);

const { ACCEPTED, REJECTED, PENDING } = INVITES_STATUS;
const { JOINT } = EXERCISES_FORM_MODES;

export const PalCard = ({
    id,
    avgWeightInWeek,
    imageSrc,
    inviteId,
    name,
    status,
    trainingType,
    testId,
}: PalCardProps) => {
    const userInfo = useAppSelector(userInfoSelector);
    const dispatch = useAppDispatch();

    const onCreateTraining = () => {
        dispatch(resetFormExercises());
        dispatch(resetExercises());

        dispatch(setExerciseFormMode(JOINT));
        dispatch(setTrainingType({ name: trainingType }));
        dispatch(setExerciseDate({ iso: '', formated: '' }));
        dispatch(setUserInfo({ userId: id, imageSrc, name, status }));
        dispatch(openSidePanel());
    };

    const isDisabled =
        status === PENDING ||
        status === REJECTED ||
        (userInfo.status === PENDING && userInfo.userId === id);

    return (
        <Flex
            className={cx(styles.card, {
                [styles.cardRejected]: status === REJECTED,
            })}
            direction='column'
            gap='gap12'
            testId={testId}
        >
            <Flex align='alignCenter' gap='gap8'>
                <UserAvatarWithName
                    imageSrc={imageSrc}
                    name={name && <HighlightedName name={name} />}
                />
            </Flex>

            <TrainingInfo trainingType={trainingType} avgWeight={avgWeightInWeek} />
            {inviteId && status === ACCEPTED ? (
                <Button className={styles.btn} block={true}>
                    Отменить тренировку
                </Button>
            ) : (
                <Button
                    className={styles.btn}
                    type='primary'
                    block={true}
                    disabled={isDisabled}
                    onClick={onCreateTraining}
                >
                    Создать тренировку
                </Button>
            )}
            <TrainingStatusBox status={status || userInfo.status} />
        </Flex>
    );
};
