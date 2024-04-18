import { Flex } from '@components/flex/flex';
import { ACTIVE_FILTER_ALL } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import type { TrainingListItem, TrainingListResponse } from '@models/models';
import { activeFilterSelector, setActiveFilter } from '@redux/slices/achieviements/achieviements';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Tag, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './filters.module.css';

const cx = classNames.bind(styles);

export const Filters = () => {
    const { data, isSuccess } = useGetTrainingListQuery();
    const activeFilter = useAppSelector(activeFilterSelector);
    const dispatch = useAppDispatch();

    let filters: TrainingListResponse = [
        { name: ACTIVE_FILTER_ALL.NAME, key: ACTIVE_FILTER_ALL.KEY },
    ];

    if (isSuccess) {
        filters = [...filters, ...data];
    }

    const clickHandler = (filter: TrainingListItem) => dispatch(setActiveFilter(filter));

    return (
        <Flex className={styles.filters} gap={{ xs: 'gap16', sm: 'gap16', lg: 'gap24' }}>
            <Typography.Text className={styles.text}>Тип тренировки :</Typography.Text>
            <Flex className={styles.filtersGroup} gap={{ xs: 'gap8', sm: 'gap8', lg: 'gap12' }}>
                {filters.map(({ name, key }) => (
                    <Tag
                        key={key}
                        className={cx(styles.tag, {
                            [styles.activeFilter]: key === activeFilter.key,
                        })}
                        onClick={() => clickHandler({ name, key })}
                    >
                        {name}
                    </Tag>
                ))}
            </Flex>
        </Flex>
    );
};
