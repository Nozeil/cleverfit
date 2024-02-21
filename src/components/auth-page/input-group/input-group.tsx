import { type ReactNode } from 'react';
import { InputGroupTypeValues } from '../auth-page.types';

import styles from './input-group.module.css';
import { INPUT_GROUP_TYPE_KEYS } from '../auth-page.constants';

interface InputGroupProps {
    children: ReactNode;
    type: InputGroupTypeValues;
    mobileBreakpoint?: boolean;
}

const InputGroup = ({ children, type, mobileBreakpoint }: InputGroupProps) => {
    const classNames = mobileBreakpoint
        ? {
              [INPUT_GROUP_TYPE_KEYS.XL]: styles.group32MobileBreakpoint,
          }
        : {
              [INPUT_GROUP_TYPE_KEYS.LG]: styles.group24,
              [INPUT_GROUP_TYPE_KEYS.XL]: styles.group32,
          };
    const className = classNames[type];

    return <div className={className}>{children}</div>;
};

export default InputGroup;
