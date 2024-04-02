import { Flex } from '@components/flex/flex';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Typography } from 'antd';

import styles from './empty-trainings.module.css';

export const EmptyTrainings = () => {
    const { isSuccess } = useGetTrainingListQuery();

    return isSuccess ? (
        <Flex className={styles.wrapper} direction='column' align='alignCenter' gap='gap20'>
            <Typography.Text className={styles.text}>
                У вас ещё нет созданных тренировок
            </Typography.Text>

            <Button className={styles.btn} type='primary' size='large'>
                Создать тренировку
            </Button>
        </Flex>
    ) : null;
};
