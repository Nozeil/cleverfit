import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import {
    removeFormExerciseById,
    removeFormExercisesByIds,
    setExercises,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { type ExercisesFormValues } from '@typings/index';
import { type FormInstance } from 'antd/es/form/Form';

export const useExercisesFormHandlers = (
    form: FormInstance,
    setIsDisabled: (isDisabled: boolean) => void,
) => {
    const dispatch = useAppDispatch();

    const onDelete = () => {
        const formValues: ExercisesFormValues = form.getFieldsValue();
        const fields = Object.values(formValues);
        const ids = fields.filter((field) => field.shouldDelete).map((field) => field.id);

        if (fields.length !== ids.length || fields.length === 1) {
            setIsDisabled(true);
        }

        dispatch(removeFormExercisesByIds(ids));
    };

    const onFinish = (values: ExercisesFormValues) => {
        const formExercises = Object.values(values)
            .map((exercise) => {
                if (!exercise.name) {
                    dispatch(removeFormExerciseById(exercise.id));
                }

                return {
                    _id: exercise.id,
                    name: exercise.name,
                    approaches: exercise.approaches ?? 1,
                    weight: exercise.weight ?? 0,
                    replays: exercise.replays ?? 1,
                    isImplementation: exercise.isImplementation ?? false,
                };
            })
            .filter((exercise) => exercise.name)
            .sort((exercise1, exercise2) => `${exercise2._id}`.length - `${exercise1._id}`.length);

        dispatch(setExercises(formExercises));
    };

    const valuesChangeHandler = (values: ExercisesFormValues) => {
        const isDisabled = !Object.values(values).some((field) => field?.shouldDelete);

        setIsDisabled(isDisabled);
    };

    return { onDelete, onFinish, valuesChangeHandler };
};
