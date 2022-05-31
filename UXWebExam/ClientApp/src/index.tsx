import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"
import "typeface-roboto";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
