import { useEffect, useMemo } from 'react';
import { Flex } from '@components/flex/flex';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    jointTrainingsSelector,
    setPaginationTotal,
} from '@redux/slices/joint-training/joint-trainings';
import { useLazyGetUserJointTrainingListQuery } from '@services/endpoints/catalogs';

import { PalCard } from '../pal-card/pal-card';
import { SearchPagination } from '../search-pagination';

import { Sorter } from './pal-cards.utils';

import styles from './pal-cards.module.css';

export const PalCards = () => {
    const { searchValue, paginationPage, paginationPageSize, trainingKey, isRandom } =
        useAppSelector(jointTrainingsSelector);
    const dispatch = useAppDispatch();

    const [getUserJointTrainingList, { data }] = useLazyGetUserJointTrainingListQuery();

    useEffect(() => {
        getUserJointTrainingList(isRandom ? undefined : { trainingType: trainingKey });
    }, [getUserJointTrainingList, isRandom, trainingKey]);

    const sortedData = useMemo(() => {
        const dataCopy = data?.slice() ?? [];

        const accepted = dataCopy
            ?.filter((training) => training.status === 'accepted')
            .sort(Sorter);
        const rejected = dataCopy
            ?.filter((training) => training.status === 'rejected')
            .sort(Sorter);
        const others = dataCopy
            ?.filter((training) => training.status !== 'accepted' && training.status !== 'rejected')
            .sort(Sorter);

        return [...accepted, ...others, ...rejected].filter((training) =>
            training.name?.toLowerCase().includes(searchValue.toLowerCase()),
        );
    }, [data, searchValue]);

    const paginatedData = useMemo(() => {
        const sliceStart = (paginationPage - 1) * paginationPageSize;
        const sliceEnd = sliceStart + paginationPageSize;

        return sortedData.slice(sliceStart, sliceEnd);
    }, [paginationPage, paginationPageSize, sortedData]);

    useEffect(() => {
        dispatch(setPaginationTotal(sortedData.length));
    }, [dispatch, sortedData]);

    return (
        <Flex
            className={styles.palsWithPagination}
            direction='column'
            gap={{ xs: 'gap16', sm: 'gap12', lg: 'gap16' }}
        >
            <Flex className={styles.palsWrapper} gap={{ xs: 'gap12', sm: 'gap12', lg: 'gap16' }}>
                {paginatedData.map(
                    ({ id, name, avgWeightInWeek, imageSrc, inviteId, status, trainingType }) => (
                        <PalCard
                            key={id}
                            id={id}
                            name={name}
                            avgWeightInWeek={avgWeightInWeek}
                            imageSrc={imageSrc}
                            inviteId={inviteId}
                            status={status}
                            trainingType={trainingType}
                        />
                    ),
                )}
            </Flex>
            {data && <SearchPagination />}
        </Flex>
    );
};
