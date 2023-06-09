import {createBrowserRouter} from "react-router-dom";
import ProtectedLayout from "./Components/ProtectedLayout";
import UnauthenticatedLayout from "./Components/UnauthenticatedLayout";
import Login from "./screens/Login/Login";
import TaskScreen from "./screens/Tasks/TaskScreen";

const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedLayout/>,
        children: [
            {
                path: '/tasks',
                element: <TaskScreen/>
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