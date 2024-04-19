import { Flex } from '@components/flex/flex';
import { Typography } from 'antd';

import styles from './empty.module.css';

import emptyAchievements from '/png/empty-achieviements.png';

export const Empty = () => (
    <Flex className={styles.wrapper} direction='column' align='alignCenter' gap='gap24'>
        <img src={emptyAchievements} alt='empty' />
        <Typography.Title className={styles.title} level={3}>
            Ой, такой тренировки на этой неделе не было.
        </Typography.Title>
    </Flex>
);
