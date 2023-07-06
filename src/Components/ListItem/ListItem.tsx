import * as React from 'react';
import {Task} from "../../services/models/Task";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import moment from 'moment'

type ListItemProps = {
    tasks: Task[],
    onEditClick: (item: Task) => void;
    onDeleteClick: (item: Task) => void;
    isTrash: boolean;
};

type TableRowItemComponentProps = {
    task: Task,
    onEditClick: (item: Task) => void;
    onDeleteClick: (item: Task) => void;
    isTrash: boolean;
};

// TableHeader
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
                            <IconButton onClick={() => console.log('here')}>
                                <ArrowDropDownIcon/>
                            </IconButton>
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
                           return <TableRowItemComponent
                               task={item}
                               onEditClick={onEditClick}
                               onDeleteClick={onDeleteClick}
                               isTrash={isTrash}
                               key={item.id}
                           />
                        }
                    )
                }
            </TableBody>
        </>
    )
};

// TableRowItemComponent
const TableRowItemComponent = ({task, onEditClick, onDeleteClick, isTrash}: TableRowItemComponentProps) => {
    const date = moment(task.attributes.createdBy, 'Y-MM-DD 00:00:00');
    return (
        <TableRow>
            <>
                <TableCell>{task.attributes.name}</TableCell>
                <TableCell>{task.relationships.statuses.attributes.statusName}</TableCell>
                <TableCell>{date.format('LL')}</TableCell>
                <TableCell>
                    <IconButton aria-label="edit" onClick={() => onEditClick(task)}
                                sx={{align: "right"}}>
                        {
                            !isTrash ? <EditIcon color="success"/> : <RestoreIcon color="success"/>
                        }
                    </IconButton>
                </TableCell>
                <TableCell>
                    <IconButton aria-label="edit" onClick={() => onDeleteClick(task)}>
                        <DeleteForeverIcon color="error"/>
                    </IconButton>
                </TableCell>
            </>
        </TableRow>
    )
};

// Display Tasks
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

// List Item
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