import { useEffect, useMemo } from 'react';
import { EXERCISES_FORM_MODES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    clearExercises,
    resetFormExercises,
    setExerciseFormMode,
    setFormExercises,
    setReceivedExercises,
    setTrainingType,
    trainingModalAndExercisesFormSelector,
    unlockExerciseBtn,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Select } from 'antd';

import styles from '../training-modal.module.css';

type ExercisesSelectProps = {
    reset: () => void;
};

const { NEW, EDIT } = EXERCISES_FORM_MODES;

export const ExercisesSelect = ({ reset }: ExercisesSelectProps) => {
    const { data } = useGetTrainingListQuery();
    const { isPast, trainingTypes, trainingType, trainings } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();

    const selectOptions = useMemo(() => {
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
        const selectedTraining = trainings.find((training) => training.name === value);

        reset();

        dispatch(resetFormExercises());
        dispatch(clearExercises());
        dispatch(setTrainingType({ name: value, id: selectedTraining?._id }));

        if (selectedTraining) {
            dispatch(setExerciseFormMode(EDIT));
            dispatch(setReceivedExercises(selectedTraining.exercises));
            dispatch(setFormExercises());
        } else {
            dispatch(setExerciseFormMode(NEW));
        }
    };

    return (
        <Select
            data-test-id='modal-create-exercise-select'
            className={styles.select}
            size='middle'
            defaultValue={trainingType.name ? trainingType.name : 'Выбор типа тренировки'}
            options={selectOptions}
            onSelect={onSelect}
        />
    );
};
