import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import { Container } from "@mui/material";
import CarBook from "../../pages/CarBook";
import { Car, Type } from "../Car";


function Layout(props: any) {
    const toyta = new Car("Toyota",130,Type.Electric,'C:/Users/Albert/Documents/GitHub/UXWebExam/UXWebExamClientApp/src/components/toyota.png');
    return (
       
        <div>
            <AppBarResponsive />
            <main>{props.children} </main>
        
        </div>
    );
}

export default Layout;
