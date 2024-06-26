import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Flex } from '@components/flex/flex';
import { UserAvatarWithName } from '@components/user-avatar/user-avatar-with-name';
import { DATE_FORMATS } from '@constants/index';
import { Feedback as FeedbackModel } from '@models/models';
import { type RateProps, Card, List, Rate, Space, Typography } from 'antd';
import moment from 'moment';

import styles from './feedback.module.css';

type FeedbackProps = Omit<FeedbackModel, 'id'>;

export const Feedback = ({ createdAt, fullName, imageSrc, message, rating }: FeedbackProps) => {
    const character: RateProps['character'] = ({ index }) =>
        index !== undefined && rating > index ? <StarFilled /> : <StarOutlined />;

    return (
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
                            <UserAvatarWithName
                                nameClassName={styles.title}
                                name={fullName}
                                imageSrc={imageSrc}
                            />
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
                                    disabled={true}
                                    defaultValue={5}
                                    character={character}
                                />

                                <Typography.Text disabled={true} className={styles.date}>
                                    {moment(new Date(createdAt)).format(DATE_FORMATS.DMY)}
                                </Typography.Text>
                            </Space>

                            {message}
                        </Flex>
                    }
                />
            </Card>
        </List.Item>
    );
};
