import * as React from 'react';
import {Dialog, DialogTitle} from "@mui/material";
import {Dispatch} from "react";

type TaskDialogProps = {
    show: boolean;
    setShowDialog: Dispatch<React.SetStateAction<string>>;
    actionFilter: boolean;
}

const TaskDialog = ({show, setShowDialog, actionFilter}: TaskDialogProps): JSX.Element => {
    return (
        <Dialog open={show} onClose={() => setShowDialog(false)}>
            <DialogTitle>{actionFilter} Task</DialogTitle>
        </Dialog>
    );
};

export default TaskDialog;