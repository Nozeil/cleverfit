import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    clearExercises,
    resetFormExercises,
    setExerciseFormMode,
    setFormExercises,
    setReceivedExercises,
    setTrainingType,
    trainingModalSelector,
    unlockExerciseBtn,
} from '@redux/slices/training-modal/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Select } from 'antd';
import { useEffect, useMemo } from 'react';

import styles from './../training-modal.module.css';

type ExercisesSelectProps = {
    reset: () => void;
};

export const ExercisesSelect = ({ reset }: ExercisesSelectProps) => {
    const { data } = useGetTrainingListQuery();
    const { isPast, trainingTypes, trainingType, trainings } =
        useAppSelector(trainingModalSelector);
    const dispatch = useAppDispatch();

    const options = useMemo(() => {
        let options;

        if (!isPast) {
            options = data?.filter(({ name }) => !trainingTypes.some((type) => type.name === name));
        }

        return options?.map(({ name }) => ({
            value: name,
            label: name,
        }));
    }, [data, isPast, trainingTypes]);

    useEffect(() => {
        if (trainingType.name) {
            dispatch(unlockExerciseBtn());
        }
    }, [dispatch, trainingType]);

    const onSelect = (value: string) => {
        const training = trainings.find((training) => training.name === value);

        reset();

        dispatch(resetFormExercises());
        dispatch(clearExercises());
        dispatch(setTrainingType({ name: value, id: training?._id }));

        if (training) {
            dispatch(setExerciseFormMode('edit'));
            dispatch(setReceivedExercises(training.exercises));
            dispatch(setFormExercises());
        } else {
            dispatch(setExerciseFormMode('new'));
        }
    };

    return (
        <Select
            data-test-id='modal-create-exercise-select'
            className={styles.select}
            size='middle'
            defaultValue={trainingType.name ? trainingType.name : 'Выбор типа тренировки'}
            options={options}
            onSelect={onSelect}
        />
    );
};
