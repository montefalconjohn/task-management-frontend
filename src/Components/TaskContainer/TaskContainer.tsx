import * as React from 'react';
// import {Box} from '@mui/material';
import {Tab} from '@mui/material';
// import {TabList} from '@mui/lab';
// import {TabPanel} from '@mui/lab';
import {useState} from "react";
// import {TabContext} from "@mui/lab";

const TaskContainer = (): JSX.Element => {
    const[value, setValue] = useState<string>("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <h1>Here</h1>
        // <Box sx={{ width: '100%', typography: 'body1' }}>
        //     <TabContext value={value}>
        //         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        //             <TabList onChange={handleChange} aria-label="lab API tabs example">
        //                 <Tab label="Item One" value="1" />
        //                 <Tab label="Item Two" value="2" />
        //                 <Tab label="Item Three" value="3" />
        //             </TabList>
        //         </Box>
        //         <TabPanel value="1">Item One</TabPanel>
        //         <TabPanel value="2">Item Two</TabPanel>
        //         <TabPanel value="3">Item Three</TabPanel>
        //     </TabContext>
        // </Box>
    );
};

export default TaskContainer;