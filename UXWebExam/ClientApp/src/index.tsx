import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href") as string;
const container = document.getElementById("app");
const root = createRoot(container!);

root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
);
