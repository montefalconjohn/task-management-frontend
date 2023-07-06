import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {Box, IconButton, Stack, TextField} from "@mui/material";
import {config} from "../../config";
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import TaskDialog from "./TaskDialog";
import taskDefaultValue from "../../services/models/Task";
import Task from "../../services/models/Task";
import ListItem from "../../Components/ListItem/ListItem";

interface keyable {
    [key: string]: any
}

const TaskScreen = (): JSX.Element => {
    const[tasks, setTasks] = useState<Task[]>([]);
    const[show, setShowDialog] = useState<boolean>(false);
    const[task, setTask] = useState<Task>(taskDefaultValue());
    const[actionFilter, setActionFilter] = useState<boolean>(false);
    const[searchParameter, setSearchParameter] = useState<string>("all");

    // componentDidUpdate
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const document = await axios.get(`${config.apiBaseUrl}/tasks/search/search=${searchParameter}`);
                const {data} = document;
                setTasks(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        fetchTasks();
    }, [searchParameter]);

    // On Add click
    const onAddClick = (): void => {
        setShowDialog(true);

        // True if add/post action
        setActionFilter(true);
    };

    // On Edit Click
    const onEditClick = (task: Task): void => {
        setTask(task);
        setShowDialog(true);

        // False if edit/patch action
        setActionFilter(false);
    }

    // Delete task
    const deleteTask = (id: string): void => {
        setTasks(tasks.filter(item => item.id !== id));
    }

    // On Delete task button
    const onDeleteTask = async task => {
        const {id} = task;
        try {
            await axios.delete(`${config.apiBaseUrl}/tasks/${id}`);
            deleteTask(id)
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // Add new task
    const appendTask = (task: Task): void => {
        setTasks([...tasks, task]);
    };

    // Replace/Update task
    const replaceTask = (task: Task): void => {
        setTasks(tasks.map(item => item.id === task.id ? task : item));
    };

    const sortList = (tasks: Task[]) => {
        return tasks.sort(function(a: keyable,b: keyable){
            return new Date(a.attributes.createdBy) - new Date(b.plantingDate)
        })
    }

    let sorted = sortList(tasks);
    return (
        <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
            <Stack direction="row" spacing={2}>
                <h2>Task List</h2>
                <IconButton aria-label="add" onClick={onAddClick} sx={{verticalAlign: "middle"}}>
                    <AddCircleRoundedIcon color="primary"/>
                </IconButton>
            </Stack>
            <TextField
                margin="normal"
                required
                id="searchParameter"
                label="Search parameter..."
                sx={{width: '100%'}}
                autoFocus
                onChange={(event) => setSearchParameter(event.target.value)}
            />
            <ListItem tasks={tasks} onEditClick={onEditClick} onDeleteClick={onDeleteTask} isTrash={false}/>
            <TaskDialog
                show={show}
                setShowDialog={setShowDialog}
                actionFilter={actionFilter}
                replaceTask={replaceTask}
                appendTask={appendTask}
                task={task}
                setTask={setTask}
            />
        </Box>
    );
};

export default TaskScreen;