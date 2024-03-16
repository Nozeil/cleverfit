import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { TrainingBadge } from '@components/calendar-page/training-badge';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { openCalendarSidePanel } from '@redux/slices/calendar-side-panel';
import {
    closeTrainingModal,
    setExerciseFormMode,
    setFormExercises,
    setReceivedExercises,
    setTrainings,
    switchToExercises,
    trainingModalIsPast,
} from '@redux/slices/training-modal/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Card, Empty, Row, Typography } from 'antd';
import { type ReactNode, useMemo } from 'react';

import { useGetTrainingQueryWithSkip } from '../hooks/use-get-training-with-skip';
import styles from './training-modal.module.css';

type TrainingsCardProps = {
    date: ReactNode;
    iso: string;
};

export const TrainingsCard = ({ date, iso }: TrainingsCardProps) => {
    const isPast = useAppSelector(trainingModalIsPast);

    const { data: trainingList } = useGetTrainingListQuery();
    const { filteredTrainings } = useGetTrainingQueryWithSkip(iso);
    const dispatch = useAppDispatch();
    const closeModal = () => dispatch(closeTrainingModal());

    const trainingTypes = useMemo(
        () => filteredTrainings?.map(({ name, isImplementation }) => ({ name, isImplementation })),
        [filteredTrainings],
    );

    const areTrainingsEmpty = !filteredTrainings?.length;

    const content = areTrainingsEmpty ? (
        <Empty description='' image={<EmptyIcon />} imageStyle={{ height: 64, marginBottom: 0 }} />
    ) : (
        <Flex className={styles.trainings} direction='column' align='alignStart' gap='gap4'>
            {filteredTrainings?.map(({ _id, isImplementation, name, exercises }, index) => {
                return (
                    <Row className={styles.trainingWrapper} key={_id} justify='space-between'>
                        <TrainingBadge
                            className={isImplementation ? styles.badgeDisabled : undefined}
                            text={name}
                        />
                        <Button
                            data-test-id={`modal-update-training-edit-button${index}`}
                            className={styles.editBtn}
                            disabled={isImplementation}
                            icon={<EditOutlined />}
                            onClick={() => {
                                dispatch(
                                    setTrainings({
                                        trainingType: {
                                            name,
                                            id: _id,
                                        },
                                        trainings: filteredTrainings,
                                    }),
                                );
                                dispatch(setReceivedExercises(exercises));
                                dispatch(setFormExercises());

                                if (isImplementation) {
                                    dispatch(setExerciseFormMode('view'));
                                    dispatch(openCalendarSidePanel());
                                } else {
                                    dispatch(setExerciseFormMode('edit'));

                                    if (trainingTypes) {
                                        const paylaod = isPast
                                            ? trainingTypes.filter((type) => type.isImplementation)
                                            : trainingTypes.filter((type) => type.name !== name);
                                        dispatch(switchToExercises(paylaod));
                                    }
                                }
                            }}
                        />
                    </Row>
                );
            })}
        </Flex>
    );

    return (
        <Card
            className={styles.card}
            bordered={false}
            actions={[
                <Button
                    className={styles.actionBtn}
                    block
                    type='primary'
                    size='large'
                    disabled={trainingList?.length === trainingTypes?.length || isPast}
                    onClick={() => {
                        if (trainingTypes) {
                            dispatch(switchToExercises(trainingTypes));
                        }

                        dispatch(setExerciseFormMode('new'));
                    }}
                >
                    Создать тренировку
                </Button>,
            ]}
            data-test-id='modal-create-training'
        >
            <Flex className={styles.cardHead} justify='justifyBetween'>
                <Flex direction='column' gap='gap4'>
                    <Typography.Text className={styles.title}>Тренировки на {date}</Typography.Text>
                    {areTrainingsEmpty && (
                        <Typography.Text className={styles.subtitle} disabled>
                            Нет активных тренировок
                        </Typography.Text>
                    )}
                </Flex>

                <Button
                    className={styles.iconBtn}
                    type='text'
                    onClick={closeModal}
                    icon={
                        <CloseOutlined
                            style={{
                                color: 'var(--character-light-title-85)',
                                fontSize: 12,
                            }}
                        />
                    }
                    data-test-id='modal-create-training-button-close'
                />
            </Flex>
            {content}
        </Card>
    );
};
