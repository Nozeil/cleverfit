import { DownOutlined, EditOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { TRAINING_COLORS } from '@constants/index';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsTableSortedTrainingsSelector } from '@redux/slices/trainings-table/trainings-table';
import { Badge, Button, Typography } from 'antd';

import { PERIODS } from '../workouts-content.constants';

import styles from './trainings-list.module.css';

export const TrainingsList = () => {
    const sortedTrainings = useAppSelector(trainingsTableSortedTrainingsSelector);

    return (
        <Flex className={styles.list} as='ul' direction='column' gap='gap5'>
            {sortedTrainings?.map(({ _id, name, parameters }) => (
                <Flex as='li' className={styles.listItem} key={_id} align='alignCenter' gap='gap12'>
                    <Flex className={styles.training} gap='gap12'>
                        <Badge color={TRAINING_COLORS[name]} />
                        <Flex
                            className={styles.trainingName}
                            align='alignCenter'
                            justify='justifyBetween'
                        >
                            <Typography.Text>{name}</Typography.Text>
                            <Button
                                className={styles.btn}
                                type='text'
                                icon={<DownOutlined style={{ fontSize: 12 }} />}
                            />
                        </Flex>
                    </Flex>

                    <Flex
                        className={styles.period}
                        justify='justifyBetween'
                        align='alignCenter'
                        gap='gap12'
                    >
                        <Typography.Text className={styles.periodText}>
                            {parameters.period && PERIODS[parameters.period - 1]}
                        </Typography.Text>

                        <Button
                            className={styles.btn}
                            type='text'
                            icon={
                                <EditOutlined
                                    style={{ fontSize: 28, color: 'var(--primary-light-6)' }}
                                />
                            }
                        />
                    </Flex>
                </Flex>
            ))}
        </Flex>
    );
};
