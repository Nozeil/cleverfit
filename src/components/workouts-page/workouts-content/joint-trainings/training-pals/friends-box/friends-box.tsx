import { Flex } from '@components/flex/flex';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';

import { FriendsCard } from './friends-card';

import styles from './friends-box.module.css';

export const FriendsBox = () => {
    const { data: trainingPals } = useGetTrainingPalsQuery();

    return (
        <Flex className={styles.box} gap='gap16'>
            {trainingPals?.map(
                (
                    { avgWeightInWeek, id, imageSrc, inviteId, name, status, trainingType },
                    index,
                ) => (
                    <FriendsCard
                        key={id}
                        status={status}
                        name={name}
                        trainingType={trainingType}
                        imageSrc={imageSrc}
                        avgWeightInWeek={avgWeightInWeek}
                        inviteId={inviteId}
                        testId={`joint-training-cards${index}`}
                        id={id}
                    />
                ),
            )}
        </Flex>
    );
};
