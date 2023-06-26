import * as React from 'react';
import {Task} from "../../services/models/Task";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from '@mui/icons-material/Restore';

type TrashListProp = {
    tasks: {}[];
    onRestoreClick: (item: Task) => void;
    onDeleteClick: (item: Task) => void;
}

export const DisplayList = ({tasks, onRestoreClick, onDeleteClick}: TrashListProp) => {
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
                                tasks.length >= 1 && tasks.map((item: Task) => {
                                        return (
                                            <TableRow key={item.id}>
                                                <>
                                                    <TableCell>{item.attributes.name}</TableCell>
                                                    <TableCell
                                                    >{item.relationships.statuses.attributes.statusName}</TableCell>
                                                    <TableCell>
                                                        <IconButton aria-label="edit" onClick={() => onRestoreClick(item)}
                                                                    sx={{align: "right"}}>
                                                            <RestoreIcon color="success"/>
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
};

const TrashList = ({tasks, onRestoreClick, onDeleteClick}: TrashListProp): JSX.Element => {
    return (
        <>
            {
                tasks.length < 1 ?
                    <div style={{textAlign: "center"}}><p>Results not found.</p></div> :
                    DisplayList({tasks, onRestoreClick, onDeleteClick})
            }
        </>
    );
};

export default TrashList;