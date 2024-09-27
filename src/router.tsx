import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayOut} from "./layouts/MainLayOut.tsx";
import {EventsPage} from "./pages/EventsPage.tsx";
import {UsersPage} from "./pages/UsersPage.tsx";
import {RegistrationPage} from "./pages/RegistrationPage.tsx";

const router = createBrowserRouter([
    {
        path: '/', element: <MainLayOut/>, children: [
            {index: true, element: <Navigate to={'events'}/>},
            {path: 'events', element: <EventsPage/>},
            {path: 'users/:id', element: <UsersPage/>},
            {path: 'registration/:id', element: <RegistrationPage/>},
        ]
    },
])

export {router}