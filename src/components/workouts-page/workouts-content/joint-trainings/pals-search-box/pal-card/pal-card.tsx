import { Flex } from '@components/flex/flex';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import type { JointTrainingListItem } from '@models/models';
import { Button } from 'antd';
import classNames from 'classnames/bind';

import { TrainingStatusBox } from '../../training-status-box/training-status-box';

import { HighlightedName } from './highlighted-name/highlighted-name';
import { TrainingInfo } from './training-info/training-info';

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
}: PalCardProps) => (
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
            >
                Создать тренировку
            </Button>
        )}
        <TrainingStatusBox status={status} />
    </Flex>
);
