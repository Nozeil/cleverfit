import { Flex } from '@components/flex/flex';
import { Button } from 'antd';

import styles from './feedback-content.module.css';

type ListFooterProps = {
    expendBtnText: string;
    expendOnClick: () => void;
};

export const ListFooter = ({ expendBtnText, expendOnClick }: ListFooterProps) => (
    <Flex
        className={styles.flex}
        direction={{ sm: 'row', xs: 'column' }}
        align='alignCenter'
        gap={{ sm: 'gap8', xs: 'gap16' }}
    >
        <Button block className={styles.btn} type='primary' size='large'>
            Написать отзыв
        </Button>
        <Button block type='link' size='large' onClick={expendOnClick}>
            {expendBtnText}
        </Button>
    </Flex>
);
