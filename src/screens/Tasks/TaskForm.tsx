import * as React from 'react';
import {Box, Button, DialogContent, Select, TextField} from "@mui/material";
import {Dispatch, useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../config";
import taskDefaultValue, {Task} from "../../services/models/Task";
import {Status} from "../../services/models/Status";

type TaskFormType = {
    actionFilter: boolean;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    appendTask: (val: {}) => void;
    task: Task;
    setTask: Dispatch<React.SetStateAction<Task | null>>;
}

const TaskForm = ({actionFilter, setShowDialog, appendTask, task, setTask}: TaskFormType): JSX.Element => {
    const {attributes} = task;
    const {name} = attributes;
    const[isProcessing, setProcessing] = useState<boolean>(false);
    const[statuses, setStatuses] = useState<Status>("");

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // Quick fix
        if (e.target.name === "name") {
            setTask({...task, attributes: { name: e.target.value}})
        } else {
            setTask({...task, relationships: { statuses: e.target.value}})
        }
    };

    useEffect(() => {
        // Clear task during unmounting
        return () => {
            setTask(taskDefaultValue())
        }
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();

        // If true post, else patch
        if (actionFilter) {
            postRequest();
        } else {
            patchRequest();
        }
    };

    const postRequest = async () => {
        const request = {
            name: name,
            status_id: 1
        }

        setProcessing(true);
        try {
            const response = await axios.post(`${config.apiBaseUrl}/tasks`, request);
            const {data} = response;
            setProcessing(false);
            setShowDialog(false);
            appendTask(data.data);
        } catch (e) {
            setProcessing(false);
            // Todo:: Catch error and display notifications here
        }
    };

    const patchRequest = async () => {
        console.log(task)
    };

    return (
        <DialogContent noValidate sx={{mt: 1}}>
            <Box component="form" onSubmit={handleSubmit} onChange={handleFormChange}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Task"
                    id="name"
                    name="name"
                    autoFocus
                    value={name}
                    disabled={isProcessing}
                />
                {
                    !actionFilter &&
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        maxWidth
                    >
                    </Select>
                }
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={isProcessing}>
                    Add Task
                </Button>
            </Box>
        </DialogContent>
    );
};

export default TaskForm;