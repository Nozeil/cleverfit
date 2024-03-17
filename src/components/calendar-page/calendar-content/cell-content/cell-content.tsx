import { TrainingBadge } from '@components/calendar-page/training-badge';
import { Flex } from '@components/flex/flex';
import { type MouseEventHandler } from 'react';

import { useGetTrainingQueryWithSkip } from '../hooks/use-get-training-with-skip';
import styles from './cell-content.module.css';

type CellContentProps = {
    iso: string;
    onClick: MouseEventHandler<HTMLDivElement>;
    breakpoint?: boolean;
};

export const CellContent = ({ breakpoint, iso, onClick }: CellContentProps) => {
    const { filteredTrainings } = useGetTrainingQueryWithSkip(iso);

    const wrapperClassName = filteredTrainings?.length ? styles.wrapper : undefined;

    return (
        <>
            <div className={styles.cellMask} onClick={onClick} />
            <Flex className={wrapperClassName} direction='column'>
                {breakpoint &&
                    filteredTrainings?.map((training) => (
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
