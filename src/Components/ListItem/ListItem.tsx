import * as React from 'react';
import {Task} from "../../services/models/Task";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type ListItemProps = {
    tasks: {}[],
    onEditClick: (item: Task) => void;
    onDeleteClick: (item: Task) => void;
    isTrash: boolean;
};

const TableHeader = (): JSX.Element => {
    return (
        <>
            {
                <TableHead>
                    <TableRow>
                        <TableCell>Task</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell colSpan={3}>
                            Date Created
                            <ArrowDropDownIcon/>
                        </TableCell>
                    </TableRow>
                </TableHead>
            }
        </>
    );
}

// Table Body
const Body = ({tasks, onEditClick, onDeleteClick, isTrash}: ListItemProps): JSX.Element => {
    return (
        <>
            <TableBody>
                {
                    tasks.length >= 1 && tasks.map((item: Task) => {
                            return (
                                <TableRow key={item.id}>
                                    <>
                                        <TableCell>{item.attributes.name}</TableCell>
                                        <TableCell>{item.relationships.statuses.attributes.statusName}</TableCell>
                                        <TableCell>{item.relationships.statuses.attributes.statusName}</TableCell>
                                        <TableCell>
                                            <IconButton aria-label="edit" onClick={() => onEditClick(item)}
                                                        sx={{align: "right"}}>
                                                {
                                                    !isTrash ? <EditIcon color="success"/> : <RestoreIcon color="success"/>
                                                }
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
        </>
    )
};

const DisplayTasks = ({tasks, onEditClick, onDeleteClick, isTrash}: ListItemProps): JSX.Element => {
        return (
          <>
              {
                  <TableContainer component={Paper}>
                      <Table>
                          <TableHeader/>
                          <Body tasks={tasks} onEditClick={onEditClick} onDeleteClick={onDeleteClick} isTrash={isTrash}/>
                      </Table>
                  </TableContainer>
              }
          </>
        );
};

const ListItem = ({tasks, onEditClick, onDeleteClick, isTrash}: ListItemProps): JSX.Element => {
    return (
        <>
            {
                tasks.length < 1 ?
                    <div style={{textAlign: "center"}}><p>Results not found.</p></div> :
                    <DisplayTasks tasks={tasks} onEditClick={onEditClick} onDeleteClick={onDeleteClick} isTrash={isTrash}/>
            }
        </>
    );
};

export default ListItem;