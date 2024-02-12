import { Space } from 'antd';

import ActionCards from './components/action-cards/action-cards';
import BenefitsCard from './components/benefits-card';
import TaglineCard from './components/tagline-card';

import styles from './main-page-content.module.css';

const MainPageContent = () => (
    <Space className={styles.space} direction='vertical' size='large'>
        <BenefitsCard />
        <Space direction='vertical' size='middle'>
            <TaglineCard />
            <ActionCards />
        </Space>
    </Space>
);

export default MainPageContent;
