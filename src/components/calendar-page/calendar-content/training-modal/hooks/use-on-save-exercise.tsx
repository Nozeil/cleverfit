import { DATE_FORMATS, EXERCISES_FORM_MODES } from '@constants/index';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import {
    closeTrainingModal,
    trainingModalAndExercisesFormSelector,
} from '@redux/slices/training-modal-and-exercises-form/training-modal-and-exercises-form';
import { useCreateTrainingMutation, useUpdateTrainingMutation } from '@services/endpoints/training';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import moment from 'moment';

const { NEW, EDIT } = EXERCISES_FORM_MODES;

export const useOnSaveExercise = (reset: () => void) => {
    const [createTraining, { isLoading: isCreateLoading }] = useCreateTrainingMutation();
    const [updateTraining, { isLoading: isUpdateLoading }] = useUpdateTrainingMutation();

    const { trainingType, exercises, exercisesFormMode, isPast, date } = useAppSelector(
        trainingModalAndExercisesFormSelector,
    );
    const dispatch = useAppDispatch();

    const isLoading = isCreateLoading || isUpdateLoading;

    const onSaveExercise = async () => {
        try {
            const localDate = moment(date.iso).toISOString(true);

            const body = {
                name: trainingType.name,
                date: moment(localDate).format(DATE_FORMATS.ISO),
                isImplementation: isPast,

                exercises: exercises.map(
                    ({ name, approaches, isImplementation, replays, weight }) => ({
                        name,
                        approaches,
                        isImplementation,
                        replays,
                        weight,
                    }),
                ),
            };

            if (exercisesFormMode === NEW) {
                await createTraining(body).unwrap();
            } else if (exercisesFormMode === EDIT) {
                if (trainingType.id) {
                    await updateTraining({ body, id: trainingType.id }).unwrap();
                }
            }
        } catch {
            CenteredModalError({
                title: (
                    <span data-test-id='modal-error-user-training-title'>
                        При сохранении данных произошла ошибка
                    </span>
                ),
                content: (
                    <span data-test-id='modal-error-user-training-subtitle'>
                        Придётся попробовать ещё раз
                    </span>
                ),
                okText: <span data-test-id='modal-error-user-training-button'>Закрыть</span>,
                onOk: (close) => {
                    close();
                    dispatch(closeTrainingModal());
                },
            });
        } finally {
            reset();
        }
    };

    return { onSaveExercise, isLoading };
};
