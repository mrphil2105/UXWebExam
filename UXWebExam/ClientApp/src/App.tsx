import React from "react";
import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/index";
import Bookings from "./pages/bookings";
import Search from "./pages/search";
import {ApplicationPath} from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import RequireAuth from "./components/api-authorization/RequireAuth";
import CreateCar from "./pages/createCar";
import Help from "./pages/help";
import Book from "./pages/book";
import Payment from "./pages/payment";
import BookingCreated from "./pages/bookingCreated";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Index/>}/>
                <Route path="/search" element={<Search/>}/>
                <Route path="/create-car" element={<CreateCar/>}/>
                <Route path="/bookings" element={
                    <RequireAuth>
                        <Bookings/>
                    </RequireAuth>
                }/>
                <Route path="/book/*" element={
                    <RequireAuth>
                        <Book/>
                    </RequireAuth>
                }/>
                <Route path="/payment/*" element={
                    <RequireAuth>
                        <Payment/>
                    </RequireAuth>
                }/>
                <Route path="/booking-created/*" element={
                    <RequireAuth>
                        <BookingCreated/>
                    </RequireAuth>
                }/>
                <Route path="/help" element={<Help/>}/>
                <Route path={`${ApplicationPath.ApiAuthorizationPrefix}/*`} element={<ApiAuthorizationRoutes/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
