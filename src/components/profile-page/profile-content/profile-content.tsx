import { CalendarTwoTone } from '@ant-design/icons';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Flex } from '@components/flex/flex';
import { EmailInput } from '@components/inputs/email-input';
import { PasswordsGroup } from '@components/passwords-group/passwords-group';
import { DATE_FORMATS } from '@constants/index';
import { type UpdateUserBody } from '@models/models';
import { useGetUserInfoQuery, useUpdateUserInfoMutation } from '@services/endpoints/user';
import { CenteredModalError } from '@utils/modal-error/modal-error';
import { Alert, Button, DatePicker, Form, FormProps, Grid, Input, Typography } from 'antd';
import { type UploadChangeParam } from 'antd/lib/upload';
import moment from 'moment';
import { useEffect, useState } from 'react';

import styles from './profile-content.module.css';
import { UploadAvatar } from './upload-avatar/upload-avatar';

const iconColor = 'var(--character-light-disable-25)';
const { useBreakpoint } = Grid;

type FormValues = {
    upload?: Pick<UploadChangeParam, 'file' | 'fileList'>;
    firstName?: string;
    lastName?: string;
    birthday?: moment.Moment;
    email: string;
    password: string;
    'password-confirm': string;
};

export const ProfileContent = () => {
    const { data } = useGetUserInfoQuery();
    const [updateUser] = useUpdateUserInfoMutation();
    const { xs } = useBreakpoint();
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const [required, setRequired] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const [form] = Form.useForm<FormValues>();

    useEffect(() => {
        if (data) {
            const { firstName, lastName, email, birthday } = data;

            form.setFieldsValue({
                firstName,
                lastName,
                email,
                birthday: birthday && moment(birthday),
                password: undefined,
                'password-confirm': undefined,
            });
        }
    }, [data, form]);

    const personalWrapperDirection = xs ? 'column-reverse' : 'row';

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
            readyForJointTraining: true,
            sendNotification: true,
        };

        if (upload) {
            const { status, response } = upload.file;

            if (status === 'done' && response?.url) {
                body.imgSrc = `https://training-api.clevertec.ru${response.url}`;
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
            await updateUser(body).unwrap();
            setIsAlert(true);
            setRequired(false);
            setIsSubmitDisabled(true);
        } catch {
            CenteredModalError({
                title: 'При сохранении данных произошла ошибка',
                content: 'Придётся попробовать ещё раз',
                okText: 'Закрыть',
            });
        }
    };

    const onFieldsChange = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setIsSubmitDisabled(hasErrors);
    };

    const onValuesChange: FormProps<FormValues>['onValuesChange'] = (changedValues) => {
        if (changedValues?.password || changedValues?.['password-confirm']) {
            setRequired(true);
        }

        if (changedValues?.upload && !changedValues.upload.file?.status) {
            setIsSubmitDisabled(true);
        } else {
            setIsSubmitDisabled(false);
        }
    };

    return (
        <ContentWrapper>
            {isAlert && (
                <Alert
                    className={styles.alert}
                    message='Данные профиля успешно обновлены'
                    type='success'
                    showIcon
                    closable
                    onClose={() => setIsAlert(false)}
                />
            )}
            <Form
                form={form}
                className={styles.form}
                name='user-data-update-form'
                autoComplete='off'
                size='large'
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                onFieldsChange={onFieldsChange}
            >
                <Flex direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
                    <Typography.Title className={styles.personalTitle} level={5}>
                        Личная информация
                    </Typography.Title>

                    <Flex direction={personalWrapperDirection} gap='gap16'>
                        <UploadAvatar />

                        <Flex className={styles.inputsWrapper} direction='column' gap='gap16'>
                            <Form.Item name='firstName' noStyle={true}>
                                <Input className={styles.input} placeholder='Имя' />
                            </Form.Item>
                            <Form.Item name='lastName' noStyle={true}>
                                <Input className={styles.input} placeholder='Фамилия' />
                            </Form.Item>
                            <Form.Item name='birthday' noStyle={true}>
                                <DatePicker
                                    className={styles.datePicker}
                                    placeholder='Дата рождения'
                                    format={DATE_FORMATS.DMY}
                                    suffixIcon={
                                        <CalendarTwoTone
                                            twoToneColor={[iconColor, iconColor]}
                                            style={{ fontSize: 12 }}
                                        />
                                    }
                                />
                            </Form.Item>
                        </Flex>
                    </Flex>

                    <Typography.Title className={styles.privacyTitle} level={5}>
                        Приватность и авторизация
                    </Typography.Title>

                    <Input.Group>
                        <EmailInput />
                        <PasswordsGroup required={required} />
                    </Input.Group>

                    <Button
                        className={styles.btn}
                        block={xs && true}
                        type='primary'
                        htmlType='submit'
                        disabled={isSubmitDisabled}
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </Form>
        </ContentWrapper>
    );
};
