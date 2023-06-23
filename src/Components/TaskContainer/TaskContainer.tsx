import * as React from 'react';
import {Box, Tab} from '@mui/material';
import {TabList, TabPanel, TabContext} from '@mui/lab';
import {useState} from "react";
import TaskScreen from "../../screens/Tasks/TaskScreen";
import TrashScreen from "../../screens/Trash/TrashScreen";

const TaskContainer = (): JSX.Element => {
    const[value, setValue] = useState<string>("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Task" value="1" />
                        <Tab label="Trash" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1"><TaskScreen/></TabPanel>
                <TabPanel value="2"><TrashScreen/></TabPanel>
            </TabContext>
        </Box>
    );
};

export default TaskContainer;