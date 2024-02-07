import { AppLayout } from '@components/index';
import { MainPage } from '@pages/index';
import {
    createRoutesFromElements,
    Route,
    createHashRouter,
    RouterProvider,
} from 'react-router-dom';

const routes = createRoutesFromElements(
    <Route element={<AppLayout />}>
        <Route index path='/' element={<MainPage />} />
    </Route>,
);

const router = createHashRouter(routes);

export const Router = () => {
    return <RouterProvider router={router} />;
};
