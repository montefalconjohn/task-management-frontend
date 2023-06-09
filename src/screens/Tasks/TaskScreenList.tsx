// @flow
import * as React from 'react';
import {Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TravelIndexProp = {
    tasks: {}[];
    onEditClick: (item: {}) => void;
    onDeleteClick: () => void;
}

type ItemProps = {
    id: string;
    attributes: {
        name: string
    };
    relationships: {
        statuses: {
            attributes: {
                statusName: string
            }
        }
    };
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
                                <TableCell colSpan={3}>Task</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                tasks.length >= 1 && tasks.map((item: ItemProps, index) => {
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
                                                            <IconButton aria-label="edit" onClick={onDeleteClick}>
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

const TaskScreenList = ({tasks}: TravelIndexProp): JSX.Element => {
    const onEditClick = () => {

    };

    const onDeleteClick = () => {

    };

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