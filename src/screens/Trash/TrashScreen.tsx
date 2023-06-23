import * as React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import {config} from "../../config";

const TrashScreen = (): JSX.Element => {
    const[trashTasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const document = await axios.get(`${config.apiBaseUrl}/trash-tasks  `);
                const {data} = document;
                setTasks(data.data)
            } catch (err: any) {
                throw err;
            }
        };

        fetchTasks();
    }, []);

    console.log(trashTasks)
    return (
        <h1>Trash</h1>
    );
};

export default TrashScreen;