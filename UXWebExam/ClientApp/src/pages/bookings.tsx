import { Typography, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BookingModel } from "../models/BookingModel";
import BookingCard from "../components/cards/BookingCard";
import authService from "../components/api-authorization/AuthorizeService";

function Bookings() {
    const [ bookings, setBookings ] = useState<BookingModel[]>([]);

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

    return (
        <Container>
            <Typography gutterBottom variant="h3">Bookings</Typography>
            <Grid container spacing={1.5}>
                {bookings.map(b => (
                    <Grid key={b.id} item xs={12} sm={6} md={4}>
                        <BookingCard booking={b} />
                    </Grid>
                ))}
            </Grid>
            {bookings.length === 0 && <Typography sx={{ mt: 1 }}>You have no bookings.</Typography>}
        </Container>
    );
}

export default Bookings;
