import * as React from 'react';
import {Box, Button, DialogContent, TextField} from "@mui/material";

const TaskForm = (actionFilter: boolean): JSX.Element => {
    // console.log(actionFilter)
    return (
        <DialogContent component="form" noValidate sx={{mt: 1}}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="taskName"
                label="Task"
                name="taskName"
                autoFocus
            />
            <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>
                Add Task
            </Button>
        </DialogContent>
    );
};

export default TaskForm;