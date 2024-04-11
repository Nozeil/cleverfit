import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { exercisesFormFormExercisesSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Space } from 'antd';

import { Exercise } from './exercise/exercise';

export const Exercises = () => {
    const exercises = useAppSelector(exercisesFormFormExercisesSelector);

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
