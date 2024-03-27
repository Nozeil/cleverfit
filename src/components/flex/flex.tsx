import { Grid } from 'antd';
import classNames from 'classnames/bind';
import { type ElementType } from 'react';

import styles from './flex.module.css';
import { FlexProps } from './flex.types';
import { createFlexClassNames } from './flex.utils';

const { useBreakpoint } = Grid;
const cx = classNames.bind(styles);

export const Flex = <T extends ElementType = 'div'>({
    children,
    as,
    className,
    ...additionalStyles
}: FlexProps<T>) => {
    const screens = useBreakpoint();

    const classNames = createFlexClassNames(screens, additionalStyles);

    const Component = as || 'div';

    return <Component className={cx(styles.flex, className, ...classNames)}>{children}</Component>;
};
