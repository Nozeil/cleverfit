import { Fragment, useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { deletedUserIdSelector } from '@redux/slices/joint-training/joint-trainings';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';
import { Typography } from 'antd';

import { FriendsBox } from './friends-box/friends-box';

import styles from './training-pals.module.css';

export const TrainingPals = () => {
    const { data: trainingPals } = useGetTrainingPalsQuery();
    const deletedUserId = useAppSelector(deletedUserIdSelector);

    const filteredPals = useMemo(
        () => trainingPals?.filter(({ id }) => deletedUserId !== id),
        [deletedUserId, trainingPals],
    );

    return (
        <Flex className={styles.wrapper} direction='column' gap='gap12'>
            <Fragment>
                <Typography.Title className={styles.title} level={4}>
                    Мои партнёры по тренировкам
                </Typography.Title>
                {filteredPals && filteredPals?.length ? (
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
