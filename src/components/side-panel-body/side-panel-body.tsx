import { type ReactNode } from 'react';
import { Flex } from '@components/flex/flex';
import type { FlexProps } from '@components/flex/flex.types';

import styles from './side-panel-body.module.css';

type SidePanelBodyProps = {
    children: ReactNode;
    head?: ReactNode;
    gap?: FlexProps<'div'>['gap'];
};

export const SidePanelBody = ({ head, children, gap }: SidePanelBodyProps) => (
    <Flex className={styles.contentBody} direction='column' gap={gap}>
        {head && (
            <Flex className={styles.contentBodyHeader} justify='justifyBetween' align='alignCenter'>
                {head}
            </Flex>
        )}

        {children}
    </Flex>
);
