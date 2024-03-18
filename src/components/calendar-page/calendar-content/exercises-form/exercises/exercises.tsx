import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalFormExercisesSelector } from '@redux/slices/training-modal/training-modal';
import { Space } from 'antd';

import { Exercise } from './exercise/exercise';

export const Exercises = () => {
    const exercises = useAppSelector(trainingModalFormExercisesSelector);

    return (
        <Space direction='vertical' size='large'>
            {exercises.map(({ _id, name, approaches, replays, weight }, index) => (
                <Exercise
                    key={_id}
                    id={_id}
                    name={name}
                    approaches={approaches}
                    replays={replays}
                    weight={weight}
                    testIdIndex={index}
                />
            ))}
        </Space>
    );
};
