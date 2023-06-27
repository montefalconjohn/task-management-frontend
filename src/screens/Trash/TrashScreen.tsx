import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../config";
import {Box} from "@mui/material";
import ListItem from "../../Components/ListItem/ListItem";

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

    // On Restore task click
    const onRestoreClick = async task => {
        const {id} = task;
        try {
            await axios.patch(`${config.apiBaseUrl}/trash-tasks/${id}`);
            updateTrashTaskList(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // On Delete task click
    const onDeleteClick = async task => {
        const {id} = task;
        try {
            await axios.delete(`${config.apiBaseUrl}/trash-tasks/${id}`);
            updateTrashTaskList(id);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    // Update trash task list for restore and delete
    const updateTrashTaskList = (id: string): void => {
        setTasks(trashTasks.filter(item => item.id !== id));
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>
            <h2>Trash List</h2>
            <ListItem tasks={trashTasks} onEditClick={onRestoreClick} onDeleteClick={onDeleteClick} isTrash={true}/>
        </Box>
    );
};

export default TrashScreen;