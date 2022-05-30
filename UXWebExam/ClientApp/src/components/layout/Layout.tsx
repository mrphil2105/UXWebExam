import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";

function Layout(props: any) {
    var test= new Car("Toyta", 130,Type.Electric,"./day-exterior-04_2th.png");

    return (
        <div>
            <AppBarResponsive />
        </div>
    );
}

export default Layout;
