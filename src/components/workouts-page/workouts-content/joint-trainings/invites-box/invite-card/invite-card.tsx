import { Flex } from '@components/flex/flex';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { DATE_FORMATS, INVITES_STATUS } from '@constants/index';
import type { Invite } from '@models/models';
import { useUpdateInviteMutation } from '@services/endpoints/invite';
import { Button, Typography } from 'antd';
import moment from 'moment';

import { TrainingDetails } from './training-details/training-details';
import { MESSAGES } from './invite-card.constants';

import styles from './invite-card.module.css';

type InviteCardProps = Omit<Invite, 'status'>;

const { ACCEPTED, REJECTED } = INVITES_STATUS;

export const InviteCard = ({ _id, from, training, createdAt }: InviteCardProps) => {
    const [updateInvite] = useUpdateInviteMutation();

    const onAccept = () => updateInvite({ id: _id, status: ACCEPTED });

    const onReject = async () => updateInvite({ id: _id, status: REJECTED });

    return (
        <Flex
            className={styles.card}
            direction={{ xs: 'column', sm: 'column', lg: 'row' }}
            gap={{ xs: 'gap16', sm: 'gap16', lg: 'gap12' }}
        >
            <Flex
                className={styles.user}
                direction={{ xs: 'row', sm: 'row', lg: 'column' }}
                align='alignCenter'
                gap='gap14'
            >
                <UserAvatarWithName
                    imageSrc={from.imageSrc ?? ''}
                    name={`${from.firstName ?? ''} ${from.lastName ?? ''}`}
                    nameClassName={styles.name}
                />
            </Flex>

            <Flex
                className={styles.textWrapper}
                direction='column'
                gap={{ xs: 'gap12', sm: 'gap12', lg: 'gap8' }}
            >
                <Typography.Text className={styles.date}>
                    {moment(createdAt).format(DATE_FORMATS.DMY)}
                </Typography.Text>
                <Typography.Text className={styles.message}>
                    Привет, я ищу партнёра для совместных {MESSAGES['Силовая']}. Ты хочешь
                    присоединиться ко мне на следующих тренировках?
                </Typography.Text>

                <TrainingDetails
                    date={training.date}
                    exercises={training.exercises}
                    name={training.name}
                />
            </Flex>

            <Flex direction='column' gap='gap16'>
                <Button className={styles.btn} type='primary' onClick={onAccept}>
                    Тренироваться вместе
                </Button>
                <Button className={styles.btn} onClick={onReject}>
                    Отклонить запрос
                </Button>
            </Flex>
        </Flex>
    );
};
