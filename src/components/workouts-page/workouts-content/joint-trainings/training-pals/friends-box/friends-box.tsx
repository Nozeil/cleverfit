import { Flex } from '@components/flex/flex';
import { useGetTrainingPalsQuery } from '@services/endpoints/catalogs';

import { FriendsCard } from './friends-card';

import styles from './friends-box.module.css';

export const FriendsBox = () => {
    const { data: trainingPals } = useGetTrainingPalsQuery();

    return (
        <Flex className={styles.box} gap='gap16'>
            {trainingPals?.map((pal) => (
                <FriendsCard key={pal.id} {...pal} />
            ))}
        </Flex>
    );
};
