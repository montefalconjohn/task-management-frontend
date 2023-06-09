import * as React from 'react';
import {Dialog, DialogTitle} from "@mui/material";
import {Dispatch} from "react";
import TaskForm from "./TaskForm";

type TaskDialogProps = {
    show: boolean;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    actionFilter: boolean;
    appendTask: (val: {}) => void;
    task: Task;
    setTask: Dispatch<React.SetStateAction<Task | null>>;
}

const TaskDialog = (
    {
        show,
        setShowDialog,
        actionFilter,
        appendTask,
        task,
        setTask
    }
    : TaskDialogProps
): JSX.Element => {
    let action = actionFilter ? "Add" : "Edit";
    return (
        <Dialog open={show} onClose={() => setShowDialog(false)} fullWidth>
            <DialogTitle>{action} Task</DialogTitle>
            <TaskForm
                actionFilter={actionFilter}
                setShowDialog={setShowDialog}
                appendTask={appendTask}
                setTask={setTask}
                task={task}
            />
        </Dialog>
    );
};

export default TaskDialog;