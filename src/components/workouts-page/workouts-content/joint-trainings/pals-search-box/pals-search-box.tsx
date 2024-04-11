import { useEffect } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { closeSearch, setSearchValue } from '@redux/slices/joint-training/joint-trainings';
import { Button, Input } from 'antd';
import { SearchProps } from 'antd/lib/input';

import { PalCards } from './pal-cards/pal-cards';

import styles from './pals-search-box.module.css';

export const PalsSearchBox = () => {
    const dispatch = useAppDispatch();

    useEffect(
        () => () => {
            dispatch(setSearchValue(''));
        },
        [dispatch],
    );

    const onBack = () => dispatch(closeSearch());

    const onSearch: SearchProps['onSearch'] = (value) => dispatch(setSearchValue(value));

    return (
        <Flex direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
            <Flex
                className={styles.searchWrapper}
                align={{ sm: 'alignCenter' }}
                justify='justifyBetween'
                direction={{ xs: 'column' }}
                gap='gap8'
            >
                <Button
                    className={styles.btn}
                    type='text'
                    icon={<ArrowLeftOutlined />}
                    onClick={onBack}
                >
                    Назад
                </Button>
                <Input.Search
                    className={styles.input}
                    placeholder='Поиск по имени'
                    onSearch={onSearch}
                    data-test-id='search-input'
                />
            </Flex>
            <PalCards />
        </Flex>
    );
};
