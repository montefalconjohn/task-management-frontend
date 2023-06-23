// @flow 
import * as React from 'react';
import {Container} from "@mui/material";
import {Outlet} from "react-router-dom";

const ProtectedLayout = (): JSX.Element => {
    return (
        <Container maxWidth="lg" sx={{marginTop: "20px"}}>
            <Outlet/>
        </Container>
    );
};

export default ProtectedLayout;