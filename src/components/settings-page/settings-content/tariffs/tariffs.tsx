import { CheckOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { useGetUserInfoQuery } from '@services/endpoints/user';
import { Button, Card, Typography } from 'antd';

import styles from './tariffs.module.css';

export const Tariffs = () => {
    const { data } = useGetUserInfoQuery();

    const proCardData = data?.tariff
        ? { src: '/png/pro-enabled.png' }
        : { src: '/png/pro-disabled.png' };

    return (
        <Flex direction='column' gap='gap16'>
            <Typography.Title className={styles.title} level={4}>
                Мой тариф
            </Typography.Title>

            <Flex
                direction={{ xs: 'column', sm: 'row' }}
                align='alignCenter'
                gap={{ xs: 'gap12', sm: 'gap24' }}
            >
                <Card
                    className={styles.card}
                    title='FREE tarif'
                    extra={
                        <Button className={styles.linkButton} type='link'>
                            Подробнее
                        </Button>
                    }
                    cover={<img src='/png/free.png' alt='tariff-cover' />}
                    bordered={false}
                >
                    <Flex
                        className={styles.tariffStatus}
                        justify='justifyCenter'
                        align='alignCenter'
                        gap='gap8'
                    >
                        <Typography.Text className={styles.tariffStatusText}>
                            активен
                        </Typography.Text>
                        <CheckOutlined style={{ fontSize: 16, color: 'var(--primary-light-10)' }} />
                    </Flex>
                </Card>
                <Card
                    className={styles.card}
                    title='PRO tarif'
                    extra={
                        <Button className={styles.linkButton} type='link'>
                            Подробнее
                        </Button>
                    }
                    cover={<img src={proCardData.src} alt='tariff-cover' />}
                    bordered={false}
                >
                    <Flex
                        className={styles.tariffStatus}
                        justify='justifyCenter'
                        align='alignCenter'
                    >
                        <Button className={styles.btn} type='primary' size='large'>
                            Активировать
                        </Button>
                    </Flex>
                </Card>
            </Flex>
        </Flex>
    );
};
