import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";
import Calender  from "../Calender";

function Layout(props: any) {
    return (
        <div>
            <AppBarResponsive />
            <main>{props.children} </main>
            <Calender/>
        </div>
    );
}

export default Layout;
