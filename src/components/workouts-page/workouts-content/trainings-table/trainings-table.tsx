import { PlusOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';

import { NewTrainingBtn } from '../new-training-btn/new-training-btn';

import { Heading } from './heading/heading';
import { TrainingsList } from './trainings-list/trainings-list';
import { TrainingsPagination } from './trainings-pagination';

import styles from './trainings-table.module.css';

export const TrainingsTable = () => (
    <Flex className={styles.wrapper} direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
        <Flex className={styles.table} direction='column' gap={{ xs: 'gap12', sm: 'gap24' }}>
            <Heading />
            <TrainingsList />
            <TrainingsPagination />
        </Flex>
        <NewTrainingBtn icon={<PlusOutlined />}>Новая тренировка</NewTrainingBtn>
    </Flex>
);
