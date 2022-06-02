import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Map from "./pages/mapPage";
import Overview from "./pages/overview";
import Bookings from "./pages/bookings";
import Profile from "./pages/profile";
import { ApplicationPath } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import RequireAuth from "./components/api-authorization/RequireAuth";
import CreateCar from "./pages/createCar";
import Help from "./pages/help";
import Book from "./pages/book";
import Payment from "./pages/payment";
import BookingMade from "./pages/bookingMade";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Map />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/create-car" element={<CreateCar />} />
                <Route path="/bookings" element={
                    <RequireAuth>
                        <Bookings />
                    </RequireAuth>
                } />
                <Route path="/book/*" element={
                <RequireAuth>
                    <Book/>
                </RequireAuth>
                } />
                <Route path="/payment/*" element={
                <RequireAuth>
                    <Payment/>
                </RequireAuth>
                    } />
                <Route path="/bookingMade/*" element={
                <RequireAuth>
                    <BookingMade/>
                </RequireAuth>
                    } />
                <Route path="/profile" element={
                <RequireAuth>
                    <Profile />
                </RequireAuth>
                } />
                <Route path="/help" element={<Help />} />
                <Route path={`${ApplicationPath.ApiAuthorizationPrefix}/*`} element={<ApiAuthorizationRoutes />} />
            </Routes>
        </Layout>
    );
}

export default App;
