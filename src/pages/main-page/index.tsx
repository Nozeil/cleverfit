import { Layout } from 'antd';
import HeaderContent from '@components/header-content';

const { Header, Content, Footer } = Layout;

export const MainPage = () => {
    return (
        <Layout>
            <Header>
                <HeaderContent />
            </Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};
