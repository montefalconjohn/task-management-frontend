// @flow
import * as React from 'react';
import {Grid, IconButton, TableCell} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type TravelIndexProp = {
    tasks: {}[]
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

const displayTasks = (tasks: {}[]): JSX.Element => {
    const onEditClick = () => {

    };

    const onDeleteClick = () => {

    };

    if (tasks.length > 1) {
        return (
            <>
                {
                    <TableCell sx={{width: "80%"}}>
                        {
                            tasks.map((item: ItemProps, index) => {
                                return (
                                    <Grid container direction="row" alignItems="center" key={index}>
                                        <Grid item sx={{flexGrow: 1}}>
                                                <span className="span-body">
                                                    {item.attributes.name}
                                                </span>
                                        </Grid>
                                        <Grid item sx={{flexGrow: 1}}>
                                                <span className="span-body">
                                                    {item.relationships.statuses.attributes.statusName}
                                                </span>
                                        </Grid>
                                        <Grid item justifyContent="flex-end">
                                            <IconButton aria-label="edit" onClick={() => onEditClick(item)}
                                                        sx={{align: "right"}}>
                                                <EditIcon color="success"/>
                                            </IconButton>
                                            <IconButton aria-label="edit" onClick={onDeleteClick}>
                                                <DeleteForeverIcon color="error"/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </TableCell>
                }
            </>
        )
    } else {
        return (
            <TableCell className="span-body" align={"center"}
                       sx={{fontFamily: "Roboto, Helvetica, Arial, sans-serif"}}>
                Results not found.
            </TableCell>
        );
    }
}

const TaskScreenList = ({tasks}: TravelIndexProp): JSX.Element => {
    return (
        <>
            {
                tasks.length < 1 ?
                    <div style={{textAlign: "center"}}><p>Results not found.</p></div> : displayTasks(tasks)
            }
        </>
    );
};

export default TaskScreenList;