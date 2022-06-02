import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BookingModel } from "../models/BookingModel";
import BookingCard from "../components/cards/BookingCard";

function Bookings() {

    const [ bookings, setBookings ] = useState<BookingModel[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetBookings");
            const bookings = await response.json();
            setBookings(bookings)
        })();
    }, []);

    const activeBookings = bookings.filter((obj) => {
        if (new Date(obj.startDate)<new Date() && new Date(obj.endDate)>new Date()) {
            return true;
        }
        return false;
    });

    const futureBookings = bookings.filter((obj) => {
        if (new Date(obj.startDate)>new Date()) {
            return true;
        }
        return false;
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <h1>Bookings</h1>
                <h3>Active</h3>
                 {activeBookings.map(c => (<BookingCard booking={c} active={true}/>))}
                <h3>Future</h3>
                {futureBookings.map(c => (<BookingCard booking={c} active={false}/>))}
            </Stack>
        </div>
    );
}

export default Bookings;
