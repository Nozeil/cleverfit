import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Flex } from '@components/flex/flex';
import { useGetUserInfoQuery } from '@services/endpoints/user';
import { Form } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

import { useFormHandlers } from './hooks/use-form-handlers';
import { PersonalGroup } from './personal-group';
import { PrivacyGroup } from './privacy-group';
import { ProfileAlert } from './profile-alert/profile-alert';
import styles from './profile-content.module.css';
import { FormValues } from './profile-content.types';
import { SubmitBtn } from './submit-btn/submit-btn';

export const ProfileContent = () => {
    const { data } = useGetUserInfoQuery();
    const [form] = Form.useForm<FormValues>();
    const { onFieldsChange, onFinish, onValuesChange } = useFormHandlers(form);

    useEffect(() => {
        if (data) {
            form.resetFields();
        }
    }, [data, form]);

    return (
        <ContentWrapper>
            <ProfileAlert />
            {data && (
                <Form
                    form={form}
                    className={styles.form}
                    initialValues={{
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        birthday: data.birthday && moment(data.birthday),
                    }}
                    name='user-data-update-form'
                    autoComplete='off'
                    size='large'
                    onFinish={onFinish}
                    onValuesChange={onValuesChange}
                    onFieldsChange={onFieldsChange}
                >
                    <Flex direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
                        <PersonalGroup />
                        <PrivacyGroup />
                        <SubmitBtn />
                    </Flex>
                </Form>
            )}
        </ContentWrapper>
    );
};
