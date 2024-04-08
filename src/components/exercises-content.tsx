import { type ReactNode } from 'react';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { trainingModalAndExercisesFormSelector } from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { Empty } from 'antd';

type ExercisesContentProps = {
    content: ReactNode;
};

export const ExercisesContent = ({ content }: ExercisesContentProps) => {
      const { exercises } = useAppSelector(trainingModalAndExercisesFormSelector);

      return exercises.length ? (
          content
      ) : (
          <Empty description='' image={<EmptyIcon />} imageStyle={{ height: 91, marginBottom: 0 }} />
      );
};
