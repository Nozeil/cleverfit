import { Fragment } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { searchValueSelector } from '@redux/slices/joint-training/joint-trainings';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import styles from './higlighted-name.module.css';

type HighlightedNameProps = {
    name: string;
};

export const HighlightedName = ({ name }: HighlightedNameProps) => {
    const searchValue = useAppSelector(searchValueSelector);
    const parts = name.split(new RegExp(`(${searchValue})`, 'gi'));

    return parts.map((part) => (
        <Fragment key={uuidv4()}>
            {part.toLowerCase() === searchValue.toLowerCase() ? (
                <Typography.Text className={styles.highlight}>{part}</Typography.Text>
            ) : (
                part
            )}
        </Fragment>
    ));
};
