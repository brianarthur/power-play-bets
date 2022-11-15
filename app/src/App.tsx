import React from 'react';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './App.scss';

import Root, { loader as rootLoader } from './routes/Root';
import Games, { loader as gameLoader } from './routes/Games';
import ErrorPage from './routes/ErrorPage';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        loader: rootLoader,
    },
    {
        path: '/games/:gameId',
        element: <Games />,
        loader: gameLoader,
        errorElement: <ErrorPage />,
    }
]);

const App = () => {
    return <RouterProvider router={router} />
}

export default App;
