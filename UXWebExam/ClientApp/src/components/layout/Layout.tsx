import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";
import CarBook from "../../pages/CarBook";
import { Car, Type } from "../../classes/Car";
import Calender from "../Calender/Calender";


function Layout(props: any) {
    return (
       
        <div>
            <AppBarResponsive />
            <main>{props.children} </main>
        </div>
    );
}

export default Layout;
