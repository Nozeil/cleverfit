import { Flex } from '@components/flex/flex';
import { TrainingBadge } from '@components/training-badge';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { userInfoSelector } from '@redux/slices/joint-training/joint-trainings';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';

import styles from './side-panel-body-head.module.css';

export const SidePanelBodyHead = () => {
    const { trainingType } = useAppSelector(trainingModalAndExercisesFormSelector);
    const userInfo = useAppSelector(userInfoSelector);

    return (
        <Flex className={styles.wrapper} align='alignEnd' gap='gap10'>
            <Flex align='alignCenter' gap='gap8'>
                <UserAvatarWithName imageSrc={userInfo.imageSrc} name={userInfo.name} />
            </Flex>
            <TrainingBadge className={styles.badge} text={trainingType.name} />
        </Flex>
    );
};
