import * as React from 'react';
import {Container} from "@mui/material";
import {Navigate, Outlet} from "react-router-dom";

const UnauthenticatedLayout = (): JSX.Element => {
    // TODO:: Check if the user is logged in. If loggedIn, redirect to protected route
    return <Navigate to="/tasks"/>
    return (
        <Container maxWidth="lg" sx={{marginTop: "20px"}}>
            <Outlet/>
        </Container>
    );
};

export default UnauthenticatedLayout;