import { Grid } from 'antd';
import classNames from 'classnames/bind';

import styles from './flex.module.css';
import { FlexProps } from './flex.types';
import { createFlexClassNames } from './flex.utils';

const { useBreakpoint } = Grid;
const cx = classNames.bind(styles);

export const Flex = ({ children, className, ...additionalStyles }: FlexProps) => {
    const screens = useBreakpoint();

    const classNames = createFlexClassNames(screens, additionalStyles);

    return <div className={cx(styles.flex, className, ...classNames)}>{children}</div>;
};
