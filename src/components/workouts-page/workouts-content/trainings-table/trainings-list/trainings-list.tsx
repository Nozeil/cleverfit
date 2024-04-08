import { Fragment, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingsTableSelector } from '@redux/slices/trainings-table/trainings-table';
import { Grid } from 'antd';

import { ExercisesCard } from './exercises-card/exercises-card';
import { TrainingListItem } from './training-list-item';
import { ContainersRefCurrent } from './trainings-list.type';

import styles from './trainings-list.module.css';

const { useBreakpoint } = Grid;

export const TrainingsList = () => {
    const { isExerciseCard, sortedTrainings, paginationPage, paginationPageSize } =
        useAppSelector(trainingsTableSelector);
    const containersRef = useRef<ContainersRefCurrent>();
    const { xs } = useBreakpoint();

    const paginatedTrainings = useMemo(() => {
        const sliceStart = (paginationPage - 1) * paginationPageSize;
        const sliceEnd = sliceStart + paginationPageSize;

        return sortedTrainings.slice(sliceStart, sliceEnd);
    }, [paginationPage, paginationPageSize, sortedTrainings]);

    const setContainers = (current: ContainersRefCurrent) => {
        containersRef.current = current;
    };

    let container;

    if (xs) {
        container = containersRef.current?.xs;
    } else {
        container = containersRef.current?.default;
    }

    return (
        <Fragment>
            {isExerciseCard && container && createPortal(<ExercisesCard />, container)}
            <Flex className={styles.list} as='ul' direction='column' gap='gap5'>
                {paginatedTrainings?.map(
                    ({ _id, name, date, parameters, exercises, isImplementation }) => (
                        <TrainingListItem
                            key={_id}
                            _id={_id}
                            name={name}
                            date={date}
                            parameters={parameters}
                            exercises={exercises}
                            isImplementation={isImplementation}
                            setContainers={setContainers}
                        />
                    ),
                )}
            </Flex>
        </Fragment>
    );
};
