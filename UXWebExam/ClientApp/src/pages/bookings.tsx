import {Stack, Typography, Box, Container} from "@mui/material";
import React, {useEffect, useState} from "react";
import {BookingModel} from "../models/BookingModel";
import BookingCard from "../components/cards/BookingCard";

function Bookings() {

    const [bookings, setBookings] = useState<BookingModel[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetBookings");
            const bookings = await response.json();
            setBookings(bookings)
        })();
    }, []);

    const activeBookings = bookings.filter((obj) => {
        if (new Date(obj.startDate) < new Date() && new Date(obj.endDate) > new Date()) {
            return true;
        }
        return false;
    });

    const futureBookings = bookings.filter((obj) => {
        if (new Date(obj.startDate) > new Date()) {
            return true;
        }
        return false;
    });

    return (
        <Container>
            <Box sx={{display: "flex", justifyContent: "content"}}>
                <Stack spacing={3} sx={{width: '600px'}}>
                    <Typography variant="h1">Bookings</Typography>
                    <Typography variant="h3">Active Bookings</Typography>
                    {activeBookings.map(c => (<BookingCard booking={c} active={true}/>))}
                    <Typography variant="h3">Future Bookings</Typography>
                    {futureBookings.map(c => (<BookingCard booking={c} active={false}/>))}
                </Stack>
            </Box>
        </Container>
    );
}

export default Bookings;
