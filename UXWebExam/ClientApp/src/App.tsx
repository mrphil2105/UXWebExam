import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Map from "./pages/mapPage";
import Overview from "./pages/overview";
import Reservations from "./pages/reservations";
import Profile from "./pages/profile";
import { ApplicationPath } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import RequireAuth from "./components/api-authorization/RequireAuth";
import CreateCar from "./pages/createCar";
import SystemExplained from "./pages/systemExplained";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/map" element={<Map />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/create-car" element={<CreateCar />} />
                <Route
                    path="/reservations"
                    element={
                        <RequireAuth>
                            <Reservations />
                        </RequireAuth>
                    }
                />
                <Route path="/profile" element={<Profile />} />
                <Route path="/help" element={<SystemExplained />} />
                <Route
                    path={`${ApplicationPath.ApiAuthorizationPrefix}/*`}
                    element={<ApiAuthorizationRoutes />}
                />
            </Routes>
        </Layout>
    );
}

export default App;
