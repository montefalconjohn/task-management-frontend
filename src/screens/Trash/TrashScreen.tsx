import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../config";
import {Box} from "@mui/material";
import TrashList from "./TrashList";

const TrashScreen = (): JSX.Element => {
    const[trashTasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const document = await axios.get(`${config.apiBaseUrl}/trash-tasks`);
                const {data} = document;
                setTasks(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        fetchTasks();
    }, []);

    const onRestoreClick = () => {
        console.log('Restore');
    };

    const onDeleteClick = () => {
        console.log('Delete');
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h2>Trash List</h2>
            <TrashList tasks={trashTasks} onRestoreClick={onRestoreClick} onDeleteClick={onDeleteClick}/>
        </Box>
    );
};

export default TrashScreen;