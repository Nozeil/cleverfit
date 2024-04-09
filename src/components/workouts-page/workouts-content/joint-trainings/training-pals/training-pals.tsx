import { Flex } from '@components/flex/flex';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';
import { Typography } from 'antd';

import styles from './training-pals.module.css';

export const TrainingPals = () => {
    const { data } = useGetTrainingPalsQuery();

    console.log(data);

    return (
        <Flex className={styles.wrapper} direction='column' gap='gap12'>
            <Typography.Title className={styles.title} level={4}>
                Мои партнёры по тренировкам
            </Typography.Title>
            {data?.length ? (
                <div>Pals</div>
            ) : (
                <Typography.Text className={styles.text}>
                    У вас пока нет партнёров для совместных тренировок
                </Typography.Text>
            )}
        </Flex>
    );
};
