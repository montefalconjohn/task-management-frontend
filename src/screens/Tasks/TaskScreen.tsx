import * as React from 'react';
import TaskScreenList from "./TaskScreenList";
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, IconButton} from "@mui/material";
import {config} from "../../config";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TaskDialog from "./TaskDialog";

const TaskScreen = (): JSX.Element => {
    const[tasks, setTasks] = useState({});
    const[show, setShowDialog] = useState<boolean>(false);
    const[task, setTask] = useState<Task | {}> ({});
    const[actionFilter, setActionFilter] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const document = await axios.get(`${config.apiBaseUrl}/tasks`);
                const {data} = document;
                setTasks(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        fetchTasks();
    }, []);

    const onAddClick = () => {
        setShowDialog(true);

        // True if add/post action
        setActionFilter(true);
    };

    const onEditClick = (task: {}) => {
        setTask(task);
        setShowDialog(true);

        // False if edit/patch action
        setActionFilter(false);
    }

    const onDeleteClick = () => {

    }

    const appendTask = (value: {}): void => {
        setTasks([...tasks, value]);
    };

    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <h2>Task List</h2>
            <IconButton aria-label="add" onClick={onAddClick}>
                <AddCircleRoundedIcon color="primary"/>
            </IconButton>
            <TaskScreenList tasks={tasks} onDeleteClick={onDeleteClick} onEditClick={onEditClick}/>
            <TaskDialog
                show={show}
                setShowDialog={setShowDialog}
                actionFilter={actionFilter}
                appendTask={appendTask}
            />
        </Box>
    );
};

export default TaskScreen;