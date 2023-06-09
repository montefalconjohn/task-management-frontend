import * as React from 'react';
import {Dialog, DialogTitle} from "@mui/material";
import {Dispatch} from "react";
import TaskForm from "./TaskForm";

type TaskDialogProps = {
    show: boolean;
    setShowDialog: Dispatch<React.SetStateAction<string>>;
    actionFilter: boolean;
}

const TaskDialog = ({show, setShowDialog, actionFilter}: TaskDialogProps): JSX.Element => {
    let action = actionFilter ? "Add" : "Edit";
    return (
        <Dialog open={show} onClose={() => setShowDialog(false)} fullWidth>
            <DialogTitle>{action} Task</DialogTitle>
            <TaskForm actionFilter={actionFilter}/>
        </Dialog>
    );
};

export default TaskDialog;