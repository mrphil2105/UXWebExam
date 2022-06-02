import {Stack, Typography, Box, Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BookingModel} from "../models/BookingModel";
import BookingCard from "../components/cards/BookingCard";
import authService from "../components/api-authorization/AuthorizeService";

function Bookings() {

    const [bookings, setBookings] = useState<BookingModel[]>([]);

    useEffect(() => {
        (async () => {
            const token = await authService.getAccessToken();
            const response = await fetch("/api/Booking/GetBookings", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const bookings = await response.json();
            setBookings(bookings)
        })();
    }, []);

    const userBookings = bookings.filter((obj) => {
        return new Date(obj.startDate) < new Date() && new Date(obj.endDate) > new Date();
    });

    return (
        <Container>
            <Box sx={{display: "flex", justifyContent: "content"}}>
                <Stack spacing={3} sx={{width: '600px'}}>
                    <Typography variant="h1">Bookings</Typography>
                    {userBookings.map(c => (<BookingCard booking={c} />))}
                </Stack>
            </Box>
        </Container>
    );
}

export default Bookings;
