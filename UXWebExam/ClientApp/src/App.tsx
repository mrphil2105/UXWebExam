import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login";
import Register from "./pages/register";
import Map from "./pages/map";
import Overview from "./pages/overview";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/overview" element={<Overview />} />
      </Routes>
    </Layout>
  );
}
export default App;
