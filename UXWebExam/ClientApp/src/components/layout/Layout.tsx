import React from "react";
import AppBarResponsive from "./AppBarResponsive";
import Style from "./Style";

function Layout(props: any) {
    return (
        <Style>
            <AppBarResponsive />
            <main>{props.children} </main>
        </Style>
    );
}

export default Layout;
