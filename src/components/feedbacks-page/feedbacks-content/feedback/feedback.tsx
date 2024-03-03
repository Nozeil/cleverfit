import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { Feedback as FeedbackModel } from '@models/models';
import { Avatar, Card, List, Rate, Space, Typography } from 'antd';
import { format } from 'date-fns';

import styles from './feedback.module.css';

type FeedbackProps = Omit<FeedbackModel, 'id'>;

export const Feedback = ({ createdAt, fullName, imageSrc, message, rating }: FeedbackProps) => (
    <List.Item>
        <Card className={styles.card} bordered={false}>
            <List.Item.Meta
                className={styles.meta}
                avatar={
                    <Flex
                        direction={{ sm: 'column', xs: 'row' }}
                        align={{ sm: 'alignCenter' }}
                        gap={{ sm: 'gap12', xs: 'gap16' }}
                    >
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

                        <Typography.Title className={styles.title} level={5}>
                            {fullName ?? 'Пользователь'}
                        </Typography.Title>
                    </Flex>
                }
                description={
                    <Flex
                        className={styles.flex}
                        direction='column'
                        gap={{ sm: 'gap12', xs: 'gap14' }}
                    >
                        <Space size={12}>
                            <Rate
                                className={styles.rate}
                                disabled
                                defaultValue={5}
                                character={({ index }) =>
                                    index !== undefined && rating > index ? (
                                        <StarFilled />
                                    ) : (
                                        <StarOutlined />
                                    )
                                }
                            />

                            <Typography.Text disabled className={styles.date}>
                                {format(new Date(createdAt), 'dd.MM.yyyy')}
                            </Typography.Text>
                        </Space>

                        {message}
                    </Flex>
                }
            />
        </Card>
    </List.Item>
);
