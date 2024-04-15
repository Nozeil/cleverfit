import { type ReactNode } from 'react';
import { Flex } from '@components/flex/flex';

import { Filters } from './filters/filters';

type TabChildrenWrapperProps = {
    children: ReactNode;
};

export const TabChildrenWrapper = ({ children }: TabChildrenWrapperProps) => (
    <Flex direction='column' gap='gap24'>
        <Filters />
        {children}
    </Flex>
);
