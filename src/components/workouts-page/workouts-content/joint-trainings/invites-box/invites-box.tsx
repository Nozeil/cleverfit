import { useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useGetInvitesQuery } from '@services/endpoints/invite';
import { isArrayWithItems } from '@utils/utils';
import { Button, Typography } from 'antd';

import { InviteCard } from './invite-card/invite-card';
import { ICON_STYLE, MIN_INVITES_AMOUNT } from './invites-box.constants';

import styles from './invites-box.module.css';

export const InvitesBox = () => {
    const { data: invites } = useGetInvitesQuery();
    const [isShowAll, setIsShowAll] = useState(false);

    const btnProps = isShowAll
        ? { children: 'Скрыть все сообщения', icon: <UpOutlined style={ICON_STYLE} /> }
        : { children: 'Показать все сообщения', icon: <DownOutlined style={ICON_STYLE} /> };

    const toggleShowAll = () => setIsShowAll((prevIsShowAll) => !prevIsShowAll);

    const slicedInvites = isShowAll ? invites : invites?.slice(0, MIN_INVITES_AMOUNT);

    if (!isArrayWithItems(invites)) {
        return null;
    }

    const isMoreThanMinInvites = invites && invites.length > MIN_INVITES_AMOUNT;

    return (
        <Flex className={styles.box} direction='column' gap='gap16'>
            {isMoreThanMinInvites && (
                <Typography.Text className={styles.text}>
                    Новое сообщение {`(${invites.length})`}
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
    );
};
