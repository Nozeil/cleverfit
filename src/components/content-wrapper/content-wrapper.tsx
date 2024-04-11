import { type ReactNode } from 'react';
import classNames from 'classnames/bind';

import styles from './content-wrapper.module.css';

type ContentWrapperProps = {
    children: ReactNode;
    className?: string;
};

const cx = classNames.bind(styles);

export const ContentWrapper = ({ children, className }: ContentWrapperProps) => (
    <div className={cx(styles.wrapper, className)}>{children}</div>
);
