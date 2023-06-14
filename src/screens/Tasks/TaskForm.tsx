import * as React from 'react';
import {Box, Button, DialogContent, MenuItem, OutlinedInput, Select, TextField} from "@mui/material";
import {Dispatch, useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../config";
import taskDefaultValue, {Task} from "../../services/models/Task";
import statusDefaultValue, {Status} from "../../services/models/Status";

type TaskFormType = {
    actionFilter: boolean;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    appendTask: (val: Task) => void;
    replaceTask: (val: Task) => void;
    task: Task;
    setTask: Dispatch<React.SetStateAction<Task | null>>;
}

const TaskForm = (
    {
        actionFilter,
        setShowDialog,
        replaceTask,
        appendTask,
        task,
        setTask
    }: TaskFormType): JSX.Element => {

    const {attributes, relationships} = task;
    const {name} = attributes;
    const {id} = relationships.statuses;

    const[isProcessing, setProcessing] = useState<boolean>(false);
    const[statuses, setStatuses] = useState<Status[]>([]);

    const handleFormChange = (e: React.ChangeEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // Quick fix
        if (e.target.name === "name") {
            setTask({...task, attributes: { name: e.target.value}})
        } else {
            setTask({
                ...task,
                relationships: {
                    ...task.relationships,
                    statuses : {
                        ...task.relationships.statuses,
                        id: e.target.value
                    }
                }
            })
        }
    };

    // componentDidMount
    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const document = await axios.get(`${config.apiBaseUrl}/statuses`);
                const {data} = document;
                setStatuses(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        !actionFilter && fetchStatuses();
    }, []);

    // Clear task during unmounting
    useEffect(() => {
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
        let attributes = {
            "name": name,
            "status_id": id,
        }

        setProcessing(true);
        try {
            await axios.patch(`${config.apiBaseUrl}/tasks/${task.id}`, attributes);
            setProcessing(false);
            setShowDialog(false);
            replaceTask(task);
        } catch (err) {
            console.log(err)
            throw err;
        }
    };

    const label = actionFilter ? "Add" : "Edit";
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
                    !actionFilter && statuses.length >= 1 &&
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Status"
                        fullWidth
                        name="status"
                        value={id}
                        sx={{mt: 1}}
                        onChange={handleFormChange}
                    >
                        {
                            statuses.map(({id, attributes: {statusName}} = status) => {
                                return (
                                    <MenuItem
                                        key={id}
                                        value={id}
                                    >
                                        {statusName}
                                    </MenuItem>
                                );
                            })
                        }
                    </Select>
                }
                <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}} disabled={isProcessing}>
                    {label} Task
                </Button>
            </Box>
        </DialogContent>
    );
};

export default TaskForm;