import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import TaskScreen from "./screens/Tasks/TaskScreen";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <TaskScreen/>,
)
