import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";
import CarCard from "../CarCard";
import { Car } from "../Car";
import { Type } from "../Car";


function Layout(props: any) {
    var test= new Car("Toyta", 130,Type.Electric,"./day-exterior-04_2th.png");

    return (
        <div>
            <AppBarResponsive />
            <main>{props.children}</main>
            <CarCard car={test} />

        </div>
    );
}

export default Layout;
