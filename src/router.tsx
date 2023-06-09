import {createBrowserRouter} from "react-router-dom";
import ProtectedLayout from "./Components/Layout/ProtectedLayout";
import UnauthenticatedLayout from "./Components/Layout/UnauthenticatedLayout";
import Login from "./screens/Login/Login";
import TaskContainer from "./Components/TaskContainer/TaskContainer";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout/>,
        children: [
            {
                path: '/tasks',
                element: <TaskContainer/>
            }
        ]
    },
    {
        path: '/',
        element: <UnauthenticatedLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }
]);

export default router;