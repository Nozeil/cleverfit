import { Space } from 'antd';

import ActionCards from './components/action-cards';
import BenefitsCard from './components/benefits-card';
import TaglineCard from './components/tagline-card';

import styles from './index.module.css';
import './index.css';

const MainPageContent = () => {
    return (
        <Space className={styles.space} direction='vertical' size='large'>
            <BenefitsCard />
            <Space direction='vertical' size='middle'>
                <TaglineCard />
                <ActionCards />
            </Space>
        </Space>
    );
};

export default MainPageContent;
