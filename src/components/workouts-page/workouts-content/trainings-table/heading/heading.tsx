import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    setSortedBy,
    trainingsTableSortedBySelector,
} from '@redux/slices/trainings-table/trainings-table';
import type { TrainingsTableSortedBy } from '@typings/index';
import { Button, Typography } from 'antd';

import { createIconStyle } from './heading.utils';

import styles from './heading.module.css';

export const Heading = () => {
    const sortedBy = useAppSelector(trainingsTableSortedBySelector);
    const dispatch = useAppDispatch();

    const ascIconStyle = createIconStyle(sortedBy, 'asc');
    const dscIconStyle = createIconStyle(sortedBy, 'dsc');

    const onClick = () => {
        let sort: TrainingsTableSortedBy = null;

        if (!sortedBy) {
            sort = 'asc';
        } else if (sortedBy === 'asc') {
            sort = 'dsc';
        } else {
            sort = null;
        }

        dispatch(setSortedBy(sort));
    };

    return (
        <Flex gap='gap12'>
            <Typography.Text className={styles.trainingText}>Тип тренировки</Typography.Text>

            <div className={styles.sortWrapper}>
                <Button className={styles.sort} type='text' onClick={onClick}>
                    <Flex justify='justifyBetween'>
                        <Typography.Text className={styles.sortText}>Периодичность</Typography.Text>
                        <Flex direction='column'>
                            <CaretUpOutlined className={styles.icon} style={ascIconStyle} />
                            <CaretDownOutlined className={styles.icon} style={dscIconStyle} />
                        </Flex>
                    </Flex>
                </Button>
            </div>
        </Flex>
    );
};
