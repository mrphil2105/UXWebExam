import React from "react";
import AppBarResponsive from "./AppBarResponsive";

function Layout(props: any) {
    return (
        <div>
            <AppBarResponsive />
            <main>{props.children} </main>
        </div>
    );
}

export default Layout;
