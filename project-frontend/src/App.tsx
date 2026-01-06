import React, { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import './styles/App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';

import CssBaseline from '@mui/material/CssBaseline';


function App() {
    return (
        <Fragment>
            <CssBaseline />
            <ToastContainer />
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
