import { Flex } from '@components/flex/flex';
import { DATE_FORMATS } from '@constants/index';
import { useGetUserInfoQuery } from '@services/endpoints/user';
import { Button, Card, Typography } from 'antd';
import moment from 'moment';

import styles from './tariffs.module.css';
import type { ProCardProps } from './tariffs.types';

export const ProCard = ({ onClick, extra }: ProCardProps) => {
    const { data } = useGetUserInfoQuery();

    const { src, content } = data?.tariff
        ? {
              src: '/png/pro-enabled.png',
              content: (
                  <Typography.Text className={styles.tariffStatusText}>
                      активен до {moment(data?.tariff.expired).format(DATE_FORMATS.DM)}
                  </Typography.Text>
              ),
          }
        : {
              src: '/png/pro-disabled.png',
              content: (
                  <Button className={styles.btn} type='primary' size='large' onClick={onClick}>
                      Активировать
                  </Button>
              ),
          };

    return (
        <Card
            className={styles.card}
            title='PRO tarif'
            extra={extra}
            cover={<img src={src} alt='tariff-cover' />}
            bordered={false}
        >
            <Flex className={styles.tariffStatus} justify='justifyCenter' align='alignCenter'>
                {content}
            </Flex>
        </Card>
    );
};
