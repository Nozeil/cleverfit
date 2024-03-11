import { ArrowLeftOutlined, CloseOutlined } from '@ant-design/icons';
import EmptyIcon from '@assets/icons/empty.svg?react';
import { Flex } from '@components/flex/flex';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { closeTrainingModal } from '@redux/slices/training-modal';
import { useGetTrainingListQuery } from '@services/endpoints/catalogs';
import { Button, Card, Empty, Select, Typography } from 'antd';
import { type CSSProperties, useState } from 'react';

import styles from './training-card.module.css';

type TrainingCardProps = {
    date: { iso: string; formated: string };
    style?: CSSProperties;
};

export const TrainingCard = ({ date, style }: TrainingCardProps) => {
    const [isAddTraining, setIsAddTraining] = useState(false);
    const [isExerciseBtnBlocked, setIsExerciseBtnBlocked] = useState(true);

    const { data } = useGetTrainingListQuery();
    const dispatch = useAppDispatch();

    const { iso, formated } = date;
    const closeModal = () => dispatch(closeTrainingModal());

    const title = isAddTraining && (
        <Flex className={styles.cardTitleWrapper}>
            <ArrowLeftOutlined onClick={closeModal} />
            <Select
                className={styles.select}
                size='middle'
                defaultValue='Выбор типа тренировки'
                options={data?.map((dataItem) => ({
                    value: dataItem.name,
                    label: dataItem.name,
                }))}
                onSelect={() => setIsExerciseBtnBlocked(false)}
            />
        </Flex>
    );

    const actions = isAddTraining
        ? [
              <Flex direction='column' gap='gap8'>
                  <Button
                      block
                      type='default'
                      onClick={() => {
                          if (!isExerciseBtnBlocked) {
                              console.log('click');
                          }
                      }}
                  >
                      Добавить упражнения
                  </Button>
                  <Button block type='text' disabled>
                      Сохранить
                  </Button>
              </Flex>,
          ]
        : [
              <Button
                  className={styles.actionBtn}
                  block
                  type='primary'
                  size='large'
                  onClick={() => setIsAddTraining(true)}
              >
                  Создать тренировку
              </Button>,
          ];

    const emptyHeight = isAddTraining ? 91 : 64;

    return (
        <Card
            className={styles.card}
            bordered={false}
            style={style}
            title={title}
            actions={actions}
        >
            {!isAddTraining && (
                <Flex className={styles.cardHead} justify='justifyBetween'>
                    <Flex direction='column' gap='gap4'>
                        <Typography.Text className={styles.title}>
                            Тренировки на <span className={styles.date}>{formated}</span>
                        </Typography.Text>
                        <Typography.Text className={styles.subtitle} disabled>
                            Нет активных тренировок
                        </Typography.Text>
                    </Flex>

                    <Button
                        className={styles.iconBtn}
                        type='text'
                        onClick={closeModal}
                        icon={
                            <CloseOutlined
                                style={{
                                    color: 'var(--character-light-title-85)',
                                    fontSize: 12,
                                }}
                            />
                        }
                    />
                </Flex>
            )}
            <Empty
                description=''
                image={<EmptyIcon />}
                imageStyle={{ height: emptyHeight, marginBottom: 0 }}
            />
        </Card>
    );
};
