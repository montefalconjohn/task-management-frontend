import * as React from 'react';
import {Box, Button, DialogContent, TextField} from "@mui/material";
import {Dispatch, useState} from "react";
import axios from "axios";
import {config} from "../../config";

type TaskFormType = {
    actionFilter: boolean;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    appendTask: (val: {}) => void;
}
const TaskForm = ({actionFilter, setShowDialog, appendTask}: TaskFormType): JSX.Element => {
    const[taskName, setTaskName] = useState<string>("");
    const[processing, setProcessing] = useState<boolean>(false);

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setTaskName(e.target.value);
    };

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
            name: taskName,
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

    };

    return (
        <DialogContent noValidate sx={{mt: 1}}>
            <Box component="form" onSubmit={handleSubmit} onChange={handleFormChange}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="taskName"
                    label="Task"
                    name="taskName"
                    autoFocus
                    value={taskName}
                />
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                    Add Task
                </Button>
            </Box>
        </DialogContent>
    );
};

export default TaskForm;