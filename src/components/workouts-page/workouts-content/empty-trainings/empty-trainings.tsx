import { Flex } from '@components/flex/flex';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Typography } from 'antd';

import { NewTrainingBtn } from '../new-training-btn/new-training-btn';

import styles from './empty-trainings.module.css';

export const EmptyTrainings = () => {
    const { isSuccess } = useGetTrainingListQuery();

    return isSuccess ? (
        <Flex className={styles.wrapper} direction='column' align='alignCenter' gap='gap20'>
            <Typography.Text className={styles.text}>
                У вас ещё нет созданных тренировок
            </Typography.Text>

            <NewTrainingBtn>Создать тренировку</NewTrainingBtn>
        </Flex>
    ) : null;
};
