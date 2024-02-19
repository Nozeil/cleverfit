import { Route, Routes } from 'react-router-dom';
import { HistoryRouter } from 'redux-first-history/rr6';
import { history } from '@redux/configure-store';
import { MainPage } from '@pages/main-page/main-page';
import { MainPageLayout } from '@components/main-page-layout/main-page-layout';
import AppLayout from '@components/app-layout/app-layout';
import AuthPage from '@pages/auth/auth';
import LoginForm from '@components/auth-forms/login-form/login-form';
import RegistartionForm from '@components/auth-forms/registration-form/registration-form';
import { ROUTES } from '@constants/routes';

const routes = (
    <Routes>
        <Route element={<AppLayout />}>
            <Route path={ROUTES.AUTH} element={<AuthPage />}>
                <Route index element={<LoginForm />} />
                <Route path={ROUTES.REGISTRATION} element={<RegistartionForm />} />
            </Route>
            <Route path={ROUTES.MAIN} element={<MainPageLayout />}>
                <Route index element={<MainPage />} />
            </Route>
        </Route>
    </Routes>
);

export const Router = () => <HistoryRouter history={history}>{routes}</HistoryRouter>;
