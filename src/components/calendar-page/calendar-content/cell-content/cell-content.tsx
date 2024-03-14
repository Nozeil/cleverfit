import { TrainingBadge } from '@components/calendar-page/training-badge';
import { Flex } from '@components/flex/flex';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { routerSelector } from '@redux/router-selector';
import { useGetTrainingQuery } from '@services/endpoints/training';
import { type MouseEventHandler, useMemo } from 'react';

import styles from './cell-content.module.css';

type CellContentProps = {
    iso: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    breakpoint?: boolean;
};

export const CellContent = ({ breakpoint, iso, onClick }: CellContentProps) => {
    const { previousLocations } = useAppSelector(routerSelector);
    const { data } = useGetTrainingQuery(
        { name: undefined },
        {
            /* skip: previousLocations?.at(-1)?.location?.pathname !== ROUTES.MAIN, */
        },
    );

    const trainings = useMemo(() => data?.filter((training) => training.date === iso), [data, iso]);

    const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => onClick(e);

    const wrapperClassName = trainings?.length ? styles.wrapper : undefined;

    return (
        <>
            <div className={styles.cellMask} onClick={clickHandler} />
            <Flex className={wrapperClassName} direction='column'>
                {breakpoint &&
                    trainings?.map((training) => (
                        <TrainingBadge
                            key={training._id}
                            className={styles.badge}
                            text={training.name}
                        />
                    ))}
            </Flex>
        </>
    );
};
