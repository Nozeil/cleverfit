import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useGetInvitesQuery } from '@services/endpoints/invite';
import { Button, Typography } from 'antd';

import { InviteCard } from './invite-card/invite-card';

import styles from './invites-box.module.css';

const iconStyle = { fontSize: 10 };

export const InvitesBox = () => {
    const { data: invites } = useGetInvitesQuery();
    const [isShowAll, setIsShowAll] = useState(false);

    const btnProps = isShowAll
        ? { children: 'Скрыть все сообщения', icon: <UpOutlined style={iconStyle} /> }
        : { children: 'Показать все сообщения', icon: <DownOutlined style={iconStyle} /> };

    const toggleShowAll = () => setIsShowAll((prevIsShowAll) => !prevIsShowAll);

    const slicedInvites = isShowAll ? invites : invites?.slice(0, 1);

    return invites && invites.length ? (
        <Flex className={styles.box} direction='column' gap='gap16'>
            {invites && invites.length > 1 && (
                <Typography.Text className={styles.text}>
                    Новое сообщение {`(${invites?.length})`}
                </Typography.Text>
            )}

            <Flex direction='column' gap='gap8'>
                {slicedInvites?.map(({ _id, createdAt, from, training }) => (
                    <InviteCard
                        key={_id}
                        _id={_id}
                        createdAt={createdAt}
                        from={from}
                        training={training}
                    />
                ))}
            </Flex>

            <Button className={styles.btn} type='link' icon={btnProps.icon} onClick={toggleShowAll}>
                {btnProps.children}
            </Button>
        </Flex>
    ) : null;
};
