import * as React from 'react';
import TaskScreenList from "./TaskScreenList";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, Container, Grid} from "@mui/material";

const TaskScreen = () => {
    const[tasks, setTasks] = useState({});

    // I need to do this since the exam was given to me so late
    axios.defaults.baseURL = 'http://localhost:8000';

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const document = await axios.get(`/task-management/tasks`);
                const {data} = document;
                setTasks(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        fetchTasks();
    }, []);

    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <h2>Task List</h2>
            <TaskScreenList tasks={tasks}/>
        </Box>
    );
};

export default TaskScreen;