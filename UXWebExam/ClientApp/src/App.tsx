import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Map from "./pages/mapPage";
import Overview from "./pages/overview";
import Profile from "./pages/profile";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/map" element={<Map />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </Layout>
    );
}
export default App;
