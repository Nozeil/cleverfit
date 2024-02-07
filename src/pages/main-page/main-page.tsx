import { Layout } from 'antd';

import './main-page.css';

const { Header, Content, Footer } = Layout;

export const MainPage = () => {
    return (
        <Layout>
            <Header>Header</Header>
            <Content>Content</Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};
