import { Fragment } from 'react';
import { Flex } from '@components/flex/flex';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';
import { Typography } from 'antd';

import { FriendsBox } from './friends-box/friends-box';

import styles from './training-pals.module.css';

export const TrainingPals = () => {
    const { data: trainingPals } = useGetTrainingPalsQuery();

    return (
        <Flex className={styles.wrapper} direction='column' gap='gap12'>
            <Fragment>
                <Typography.Title className={styles.title} level={4}>
                    Мои партнёры по тренировкам
                </Typography.Title>
                {trainingPals?.length ? (
                    <FriendsBox />
                ) : (
                    <Typography.Text className={styles.text}>
                        У вас пока нет партнёров для совместных тренировок
                    </Typography.Text>
                )}
            </Fragment>
        </Flex>
    );
};
