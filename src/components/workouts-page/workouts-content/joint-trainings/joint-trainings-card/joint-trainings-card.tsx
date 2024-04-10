import { Fragment, useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { Notification } from '@components/notification/notification';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    isRandomSelector,
    openSearch,
    setIsRandomFalse,
    setIsRandomTrue,
    setTrainingKey,
} from '@redux/slices/joint-training/joint-trainings';
import {
    closeErrorNotification,
    openErrorNotification,
} from '@redux/slices/training-list-error-notification';
import {
    useGetTrainingListQuery,
    useLazyGetUserJointTrainingListQuery,
} from '@services/endpoints/catalogs';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { Button, Card, Typography } from 'antd';

import styles from './joint-trainings-card.module.css';

export const JointTrainingsCard = () => {
    const [getUserJointTrainingList] = useLazyGetUserJointTrainingListQuery();
    const { data: trainings } = useGetTrainingQuery();
    const { data: trainingList } = useGetTrainingListQuery();

    const isRandom = useAppSelector(isRandomSelector);
    const dispatch = useAppDispatch();

    const mostPopularTraining = useMemo(() => {
        const training = trainings?.reduce(
            (prevTraining, { name, exercises }) => {
                const maxLoad = exercises.reduce((prevLoad, { weight, approaches, replays }) => {
                    const load = weight * approaches * replays;

                    return load > prevLoad ? load : prevLoad;
                }, 0);

                return maxLoad >= prevTraining.maxLoad ? { name, maxLoad } : prevTraining;
            },
            { name: '', maxLoad: 0 },
        );
        const trainingType = trainingList?.find(({ name }) => training?.name === name);

        if (trainingType && training) {
            training.name = trainingType.key;
        }

        return training;
    }, [trainingList, trainings]);

    const onTrainingTypeSelection = async () => {
        dispatch(setIsRandomFalse());

        const key = mostPopularTraining?.name;

        if (key) {
            dispatch(setTrainingKey(key));
        }

        try {
            await getUserJointTrainingList({ trainingType: mostPopularTraining?.name }).unwrap();
            dispatch(openSearch());
        } catch {
            dispatch(openErrorNotification());
        }
    };

    const onRandomSelection = async () => {
        dispatch(setIsRandomTrue());

        try {
            await getUserJointTrainingList().unwrap();
            dispatch(openSearch());
        } catch {
            dispatch(openErrorNotification());
        }
    };

    const refresh = () => {
        if (isRandom) {
            onRandomSelection();
        } else {
            onTrainingTypeSelection();
        }

        dispatch(closeErrorNotification());
    };

    return (
        <Fragment>
            <Notification refresh={refresh} />
            <Card
                className={styles.card}
                actions={[
                    <Flex
                        direction={{ xs: 'column', sm: 'column', xl: 'row' }}
                        align='alignCenter'
                        gap='gap16'
                    >
                        <Button block={true} type='link' onClick={onRandomSelection}>
                            Случайный выбор
                        </Button>
                        <Button
                            block={true}
                            className={styles.textBtn}
                            type='text'
                            onClick={onTrainingTypeSelection}
                        >
                            Выбор друга по моим видам тренировок
                        </Button>
                    </Flex>,
                ]}
            >
                <Flex direction='column' align='alignCenter' gap='gap32'>
                    <Typography.Title className={styles.title} level={3}>
                        {`Хочешь тренироваться с тем, кто разделяет твои цели и темп?
Можешь найти друга для совместных тренировок среди других пользователей.`}
                    </Typography.Title>
                    <Typography.Text className={styles.text}>
                        Можешь воспользоваться случайным выбором или выбрать друга с похожим на твой
                        уровень и вид тренировки, и мы найдем тебе идеального спортивного друга.
                    </Typography.Text>
                </Flex>
            </Card>
        </Fragment>
    );
};
