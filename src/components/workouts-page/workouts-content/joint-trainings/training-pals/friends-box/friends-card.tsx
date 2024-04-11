import { Fragment, useState } from 'react';
import { Flex } from '@components/flex/flex';
import { ModalWithShadowMd } from '@components/modal-with-shadow-md/modal-with-shadow-md';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { WIDTH_540 } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import type { TrainingPal } from '@models/models';
import { setDeletedUserId } from '@redux/slices/joint-training/joint-trainings';
import { useDeleteInviteMutation } from '@services/endpoints/invite';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { Button, Card } from 'antd';

import { TrainingInfo } from '../../training-info/training-info';
import { TrainingStatusBox } from '../../training-status-box/training-status-box';

import styles from './friends-box.module.css';

type FriendCardProps = TrainingPal & { testId: string };

export const FriendsCard = ({
    imageSrc,
    name,
    trainingType,
    avgWeightInWeek,
    status,
    inviteId,
    testId,
    id,
}: FriendCardProps) => {
    const [deleteInvite] = useDeleteInviteMutation();
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();

    const onOpenModal = () => setIsOpen(true);
    const onCloseModal = () => setIsOpen(false);

    const onCancelTraining = async () => {
        try {
            await deleteInvite({ id: inviteId, status }).unwrap();
            dispatch(setDeletedUserId(id));
        } catch {
            CenteredModalError({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При сохранении данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Придётся попробовать ещё раз
                    </span>
                ),
                okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
            });
        } finally {
            onCloseModal();
        }
    };

    return (
        <Fragment>
            <ModalWithShadowMd
                className={styles.modal}
                open={isOpen}
                closable={true}
                centered={true}
                width={WIDTH_540}
                footer={null}
                maskStyle={{ backgroundColor: 'var(--blue-1)' }}
                onCancel={onCloseModal}
                data-test-id='partner-modal'
            >
                <Flex
                    className={styles.modalContent}
                    direction='column'
                    gap={{ xs: 'gap16', sm: 'gap24' }}
                >
                    <Flex
                        direction={{ xs: 'column' }}
                        justify={{ xs: 'justifyStart', sm: 'justifyBetween' }}
                        align='alignCenter'
                        gap={{ xs: 'gap12' }}
                    >
                        <Flex align='alignCenter' gap='gap8'>
                            <UserAvatarWithName imageSrc={imageSrc} name={name} />
                        </Flex>
                        <div className={styles.trainingInfoWrapper}>
                            <TrainingInfo trainingType={trainingType} avgWeight={avgWeightInWeek} />
                        </div>
                    </Flex>
                    <Flex
                        direction={{ xs: 'column-reverse' }}
                        justify='justifyBetween'
                        gap={{ xs: 'gap16' }}
                    >
                        <TrainingStatusBox status={status} />

                        <Button className={styles.btn} onClick={onCancelTraining}>
                            Отменить тренировку
                        </Button>
                    </Flex>
                </Flex>
            </ModalWithShadowMd>
            <Card className={styles.card} onClick={onOpenModal} data-test-id={testId}>
                <Flex direction='column' gap='gap8'>
                    <Flex align='alignCenter' gap='gap8'>
                        <UserAvatarWithName imageSrc={imageSrc} name={name} />
                    </Flex>
                    <TrainingInfo trainingType={trainingType} avgWeight={avgWeightInWeek} />
                </Flex>
            </Card>
        </Fragment>
    );
};
