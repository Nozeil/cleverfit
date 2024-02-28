import 'antd/dist/antd.css';
import 'normalize.css';
import './index.css';
import './index.module.css';

import { Router } from '@components/router/router';
import { store } from '@redux/configure-store';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>,
);
