import { Layout } from 'antd';
import HeaderContent from '@components/header-content';
import MainPageContent from '@components/main-page-content';
import FooterContent from '@components/footer-content';

import './index.css';

const { Header, Content, Footer } = Layout;

export const MainPage = () => {
    return (
        <Layout>
            <Header>
                <HeaderContent />
            </Header>
            <Content>
                <MainPageContent />
            </Content>
            <Footer>
                <FooterContent />
            </Footer>
        </Layout>
    );
};
