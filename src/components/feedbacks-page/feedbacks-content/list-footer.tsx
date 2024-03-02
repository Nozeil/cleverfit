import { Flex } from '@components/flex/flex';
import { Button } from 'antd';

import styles from './feedback-content.module.css';

export const ListFooter = () => (
    <Flex
        className={styles.flex}
        direction={{ sm: 'row', xs: 'column' }}
        align='alignCenter'
        gap={{ sm: 'gap8', xs: 'gap16' }}
    >
        <Button block className={styles.btn} type='primary' size='large'>
            Написать отзыв
        </Button>
        <Button block type='link' size='large'>
            Развернуть все отзывы
        </Button>
    </Flex>
);
