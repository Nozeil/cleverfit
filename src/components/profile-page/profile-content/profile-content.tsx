import { CalendarTwoTone } from '@ant-design/icons';
import { ContentWrapper } from '@components/content-wrapper/content-wrapper';
import { Flex } from '@components/flex/flex';
import { EmailInput } from '@components/inputs/email-input';
import { PasswordsGroup } from '@components/passwords-group/passwords-group';
import { Button, DatePicker, Form, Grid, Input, Typography } from 'antd';

import styles from './profile-content.module.css';
import { UploadAvatar } from './upload-avatar/upload-avatar';

const iconColor = 'var(--character-light-disable-25)';
const { useBreakpoint } = Grid;

export const ProfileContent = () => {
    const { xs } = useBreakpoint();

    const personalWrapperDirection = xs ? 'column-reverse' : 'row';

    return (
        <ContentWrapper>
            <Form
                className={styles.form}
                name='user-data-update-form'
                autoComplete='off'
                size='large'
            >
                <Flex direction='column' gap={{ xs: 'gap20', sm: 'gap24' }}>
                    <Typography.Title className={styles.personalTitle} level={5}>
                        Личная информация
                    </Typography.Title>

                    <Flex direction={personalWrapperDirection} gap='gap16'>
                        <UploadAvatar />

                        <Flex className={styles.inputsWrapper} direction='column' gap='gap16'>
                            <Form.Item noStyle={true}>
                                <Input
                                    className={styles.input}
                                    name='firstName'
                                    placeholder='Имя'
                                />
                            </Form.Item>
                            <Form.Item noStyle={true}>
                                <Input
                                    className={styles.input}
                                    name='lastName'
                                    placeholder='Фамилия'
                                />
                            </Form.Item>
                            <Form.Item noStyle={true}>
                                <DatePicker
                                    className={styles.datePicker}
                                    name='lastName'
                                    placeholder='Дата рождения'
                                    format='DD.MM.YYYY'
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
                        <PasswordsGroup />
                    </Input.Group>

                    <Button
                        className={styles.btn}
                        block={xs && true}
                        type='primary'
                        htmlType='submit'
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </Form>
        </ContentWrapper>
    );
};
