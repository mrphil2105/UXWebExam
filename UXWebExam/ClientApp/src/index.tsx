import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import App from "./App";

const baseUrl = document
    .getElementsByTagName("base")[0]
    .getAttribute("href") as string;
const rootElement = document.getElementById("root");

const root = createRoot(rootElement as HTMLElement);
root.render(
    <BrowserRouter basename={baseUrl}>
        <App />
    </BrowserRouter>
);
