import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    activeFilterSelector,
    setActiveFilter,
} from '@redux/slices/achieviements-filter/achieviements-filters';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Tag, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './filters.module.css';

const cx = classNames.bind(styles);

export const Filters = () => {
    const { data, isSuccess } = useGetTrainingListQuery();
    const activeFilter = useAppSelector(activeFilterSelector);
    const dispatch = useAppDispatch();

    let filters = [{ name: 'Все', key: 'all' }];

    if (isSuccess) {
        filters = [...filters, ...data];
    }

    const clickHandler = (key: string) => dispatch(setActiveFilter(key));

    return (
        <Flex className={styles.filters} gap={{ xs: 'gap16', sm: 'gap16', lg: 'gap24' }}>
            <Typography.Text className={styles.text}>Тип тренировки :</Typography.Text>
            <Flex className={styles.filtersGroup} gap={{ xs: 'gap8', sm: 'gap8', lg: 'gap12' }}>
                {filters.map(({ name, key }) => (
                    <Tag
                        key={key}
                        className={cx(styles.tag, { [styles.activeFilter]: key === activeFilter })}
                        onClick={() => clickHandler(key)}
                    >
                        {name}
                    </Tag>
                ))}
            </Flex>
        </Flex>
    );
};
