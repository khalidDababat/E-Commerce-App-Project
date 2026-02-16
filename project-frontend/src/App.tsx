import React, { Fragment, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import './styles/App.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/router';

import CssBaseline from '@mui/material/CssBaseline';

import { socket } from './socket';


function App() {


    useEffect(() => {



        socket.connect();

        // socket.on("connect", () => {
        //     console.log("🟢 Connected:", socket.id);
        // });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <Fragment>
            <CssBaseline />
            <ToastContainer />
            <RouterProvider router={router} />
        </Fragment>
    );
}

export default App;
