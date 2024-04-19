import { type ReactNode } from 'react';
import { Flex } from '@components/flex/flex';

import styles from './chart-block.module.css';

type ChartBlockProps = {
    children: ReactNode;
};

export const ChartBlock = ({ children }: ChartBlockProps) => (
    <Flex
        className={styles.chartBlock}
        direction={{ sm: 'column', lg: 'row' }}
        justify='justifyBetween'
        align={{ xl: 'alignCenter' }}
        gap='gap24'
    >
        {children}
    </Flex>
);
