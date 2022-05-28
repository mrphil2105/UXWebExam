import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";

function Layout(props: any) {
    return (
        <div>
            <AppBarResponsive />
            <main>{props.children} </main>
        </div>
    );
}

export default Layout;
