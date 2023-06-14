// @flow
import * as React from 'react';
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Task} from "../../services/models/Task";

type TravelIndexProp = {
    tasks: {}[];
    onEditClick: (item: Task) => void;
    onDeleteClick: (item: Task) => void;
}

const displayTasks = ({tasks, onEditClick, onDeleteClick}: TravelIndexProp): JSX.Element => {
    return (
        <>
            {
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Task</TableCell>
                                <TableCell colSpan={3}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tasks.length >= 1 && tasks.map((item: Task, index) => {
                                        return (
                                            <TableRow key={item.id}>
                                                    <>
                                                        <TableCell>{item.attributes.name}</TableCell>
                                                        <TableCell
                                                        >{item.relationships.statuses.attributes.statusName}</TableCell>
                                                        <TableCell>
                                                            <IconButton aria-label="edit" onClick={() => onEditClick(item)}
                                                                        sx={{align: "right"}}>
                                                                <EditIcon color="success"/>
                                                            </IconButton>
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton aria-label="edit" onClick={() => onDeleteClick(item)}>
                                                                <DeleteForeverIcon color="error"/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </>
                                            </TableRow>
                                        )
                                    }
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

const TaskScreenList = ({tasks, onEditClick, onDeleteClick}: TravelIndexProp): JSX.Element => {
    return (
        <>
            {
                tasks.length < 1 ?
                    <div style={{textAlign: "center"}}><p>Results not found.</p></div> :
                    displayTasks({tasks, onEditClick, onDeleteClick})
            }
        </>
    );
};

export default TaskScreenList;