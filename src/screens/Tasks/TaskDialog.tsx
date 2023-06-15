import * as React from 'react';
import {Dialog, DialogTitle} from "@mui/material";
import {Dispatch} from "react";
import TaskForm from "./TaskForm";
import {Task} from "../../services/models/Task";

type TaskDialogProps = {
    show: boolean;
    setShowDialog: Dispatch<React.SetStateAction<boolean>>;
    actionFilter: boolean;
    task: Task;
    appendTask: (val: {}) => void;
    replaceTask: (val: {}) => void;
    setTask: Dispatch<React.SetStateAction<Task | null>>;
}

const TaskDialog = (
    {
        show,
        setShowDialog,
        actionFilter,
        replaceTask,
        appendTask,
        task,
        setTask
    }
    : TaskDialogProps
): JSX.Element => {

    // Dynamic label for dialog title
    let action = actionFilter ? "Add" : "Edit";

    return (
        <Dialog open={show} onClose={() => setShowDialog(false)} fullWidth>
            <DialogTitle>{action} Task</DialogTitle>
            <TaskForm
                actionFilter={actionFilter}
                setShowDialog={setShowDialog}
                task={task}
                replaceTask={replaceTask}
                appendTask={appendTask}
                setTask={setTask}
            />
        </Dialog>
    );
};

export default TaskDialog;