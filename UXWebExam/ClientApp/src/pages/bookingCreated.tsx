import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import BookingCard from "../components/cards/BookingCard";
import { BookingModel } from "../models/BookingModel";
import authService from "../components/api-authorization/AuthorizeService";

export default function BookingCreated() {
    const pathname = window.location.pathname;
    const slashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(slashIndex + 1, pathname.length);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ booking, setBooking ] = useState<BookingModel | null>();

    useEffect(() => {
        (async () => {
            const token = await authService.getAccessToken();
            const response = await fetch(`/api/Booking/GetBooking?id=${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const booking: BookingModel = await response.json();
            setBooking(booking);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (<Container><Typography>Loading booking...</Typography></Container>);
    }

    if (!booking) {
        return (<Container><Typography>No booking could be found.</Typography></Container>)
    }

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={3} sx={{ width: "600px" }}>
                    <Typography variant="h3">Booking Created!</Typography>
                    <BookingCard booking={booking} />
                    <Link to="/search" style={{ textDecoration: "none" }}>
                        <Button variant="contained" fullWidth>Book another car</Button>
                    </Link>
                    <Link to="/bookings" style={{ textDecoration: "none" }}>
                        <Button variant="contained" fullWidth>See all Bookings</Button>
                    </Link>
                </Stack>
            </div>
        </Container>
    );
}
