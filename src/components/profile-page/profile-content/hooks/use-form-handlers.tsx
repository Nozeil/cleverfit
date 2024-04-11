import { DATE_FORMATS } from '@constants/index';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { type UpdateUserBody } from '@models/models';
import {
    disableProfileSubmit,
    enableProfileSubmit,
    setProfileRequiredTrue,
    setProfileStateAfterSuccess,
    setProfileSubmit,
} from '@redux/slices/profile';
import { openSuccessAlert } from '@redux/slices/success-alert';
import { AVATAR_BASE_URL } from '@services/api.constants';
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '@services/endpoints/user';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { type FormInstance, type FormProps } from 'antd';
import moment from 'moment';

import { INPUT_NAMES } from '../profile-content.constants';
import type { FormValues } from '../profile-content.types';

export const useFormHandlers = (form: FormInstance) => {
    const { data } = useGetUserInfoQuery();
    const [updateUser] = useUpdateUserInfoMutation();
    const dispatch = useAppDispatch();

    const onFinish: FormProps<FormValues>['onFinish'] = async ({
        upload,
        birthday,
        email,
        password,
        firstName,
        lastName,
    }) => {
        const body: UpdateUserBody = {
            firstName,
            lastName,
            email,
            password,
            readyForJointTraining: data?.readyForJointTraining,
            sendNotification: data?.sendNotification,
        };

        if (upload) {
            const { status, response } = upload.file;

            if (status === 'done' && response?.url) {
                body.imgSrc = `${AVATAR_BASE_URL}${response.url}`;
            }

            if (status === 'removed') {
                body.imgSrc = '';
            }
        }

        if (birthday) {
            const localDate = birthday.toISOString(true);

            body.birthday = moment(localDate).format(DATE_FORMATS.ISO);
        }

        try {
            const formValues = await updateUser(body).unwrap();

            form.setFieldsValue({
                firstName: formValues.firstName,
                lastName: formValues.lastName,
                email: formValues.email,
                birthday: formValues.birthday && moment(formValues.birthday),
                password: undefined,
                'password-confirm': undefined,
            });
            dispatch(setProfileStateAfterSuccess());
            dispatch(openSuccessAlert());
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
            });
        }
    };

    const onFieldsChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        const upload = form.getFieldValue(INPUT_NAMES.UPLOAD);
        const isError = hasErrors || upload?.file?.status === 'error';

        dispatch(setProfileSubmit(isError));
    };

    const onValuesChange: FormProps<FormValues>['onValuesChange'] = (changedValues) => {
        if (changedValues?.password || changedValues?.['password-confirm']) {
            dispatch(setProfileRequiredTrue());
        }

        const submitAction =
            changedValues?.upload && changedValues.upload.file?.status === 'error'
                ? disableProfileSubmit
                : enableProfileSubmit;

        dispatch(submitAction());
    };

    return { onValuesChange, onFieldsChange, onFinish };
};
