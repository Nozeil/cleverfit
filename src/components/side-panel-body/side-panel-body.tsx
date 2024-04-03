import { type ReactNode } from 'react';
import { Flex } from '@components/flex/flex';

import styles from './side-panel-body.module.css';

type SidePanelBodyProps = {
    children: ReactNode;
    head?: ReactNode;
};

export const SidePanelBody = ({ head, children }: SidePanelBodyProps) => (
    <Flex className={styles.contentBody} direction='column' gap='gap24'>
        {head && (
            <Flex className={styles.contentBodyHeader} justify='justifyBetween' align='alignCenter'>
                {head}
            </Flex>
        )}

        {children}
    </Flex>
);
