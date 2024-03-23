import { CalendarTwoTone } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { DATE_FORMATS } from '@constants/index';
import { DatePicker, Form, Grid, Input, Typography } from 'antd';

import styles from './profile-content.module.css';
import { UploadAvatar } from './upload-avatar/upload-avatar';

const iconColor = 'var(--character-light-disable-25)';
const { useBreakpoint } = Grid;

export const PersonalGroup = () => {
    const { xs } = useBreakpoint();

    const personalWrapperDirection = xs ? 'column-reverse' : 'row';

    return (
        <>
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
        </>
    );
};
