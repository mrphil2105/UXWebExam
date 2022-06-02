import {Typography, Box, Container,Grid} from "@mui/material";
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
                    <Typography variant="h2">Bookings</Typography>
                <Grid container spacing={1.5}>
                    {userBookings.map(c => (
                        <Grid item xs={12} sm={6} md={4}>
                            <BookingCard booking={c} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default Bookings;
