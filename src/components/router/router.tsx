import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { AppLayout } from '@components/app-layout/app-layout';
import { MainPage } from '@pages/main-page/main-page';

const routes = (
    <Routes>
        <Route path='main' element={<AppLayout />}>
            <Route index element={<MainPage />} />
        </Route>
    </Routes>
);

export const Router = () => <HistoryRouter history={history}>{routes}</HistoryRouter>;
