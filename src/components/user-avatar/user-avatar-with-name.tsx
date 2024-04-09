import { type ReactNode, Fragment } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps, Typography } from 'antd';
import classNames from 'classnames/bind';

import styles from './user-avatar-with-name.module.css';

type UserAvatarWithNameProps = {
    imageSrc: AvatarProps['src'];
    name: ReactNode | null;
    nameClassName?: string;
};

const cx = classNames.bind(styles);

export const UserAvatarWithName = ({ imageSrc, name, nameClassName }: UserAvatarWithNameProps) => (
    <Fragment>
        <Avatar
            className={styles.avatar}
            src={imageSrc}
            size={42}
            alt='avatar'
            icon={
                <UserOutlined
                    style={{
                        color: 'var(--character-light-title-85)',
                    }}
                />
            }
        />
        <Typography.Text className={cx(styles.text, nameClassName)}>
            {name ?? 'Пользователь'}
        </Typography.Text>
    </Fragment>
);
