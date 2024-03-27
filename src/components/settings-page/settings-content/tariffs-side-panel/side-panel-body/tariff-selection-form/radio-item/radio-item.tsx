import { Flex } from '@components/flex/flex';
import { Radio, Typography } from 'antd';

import styles from './radio-item.module.css';
import { createPrice } from './radio-item.utils';

type RadioItemProps = {
    text: string;
    cost: number;
    days: number;
};

export const RadioItem = ({ text, cost, days }: RadioItemProps) => (
    <Radio className={styles.radio} value={days}>
        <Flex className={styles.tariffSelectionItem} align='alignCenter'>
            <Typography.Text>{text}</Typography.Text>
            <Flex align='alignCenter'>
                <Typography.Text className={styles.price}>{createPrice(cost)}</Typography.Text>
            </Flex>
        </Flex>
    </Radio>
);
