import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page/main-page';
import { MainPageLayout } from '@components/main-page-layout/main-page-layout';
import AppLayout from '@components/app-layout/app-layout';
import AuthPage from '@pages/auth/auth';
import LoginForm from '@components/forms/login-form/login-form';
import RegistartionForm from '@components/forms/registration-form/registration-form';

const routes = (
    <Routes>
        <Route element={<AppLayout />}>
            <Route path='auth' element={<AuthPage />}>
                <Route index element={<LoginForm />} />
                <Route path='registration' element={<RegistartionForm />} />
            </Route>
            <Route path='main' element={<MainPageLayout />}>
                <Route index element={<MainPage />} />
            </Route>
        </Route>
    </Routes>
);

export const Router = () => <HistoryRouter history={history}>{routes}</HistoryRouter>;
