import React, { useEffect, useState } from "react";
import { Car } from "../classes/Car";
import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import CarCard from "../components/cards/CarCard";
import Calender from "../components/calendar/Calendar";
import { Button } from "@mui/material";
import CarModel from "../models/CarModel";
import CreditCardForm from "../components/payment/CreditCardForm";
import { Link } from "react-router-dom";
import BookingCard from "../components/cards/BookingCard";
import { Reservation } from "../classes/Reservation";
import {BookingModel} from "../models/BookingModel";

export default function BookingMade() {
    const pathname = window.location.pathname;
    const slashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(slashIndex + 1, pathname.length);

    const [ isLoading, setIsLoading ] = useState(true);
    const [ car, setCar ] = useState<CarModel | null>();

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/Car/GetCar?id=${id}`);
            const car: CarModel = await response.json();
            setCar(car);
            setIsLoading(false);
        })();
    }, [])

    if (isLoading) {
        return (<Container><Typography>Loading payment...</Typography></Container>);
    }

    if (!car) {
        return (<Container><Typography>No car could be found.</Typography></Container>)
    }
    
    const booking: BookingModel = {car: car, endDate:"2",startDate:"3", id:3}

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={3} sx={{ width: '600px', padding:2  }}>
            <Typography gutterBottom variant="h4" >
                Booking Made!
            </Typography>
            <BookingCard booking={booking}  active={true} />
            <br />
            <Link to={"/"} style={{ textDecoration: 'none' }} >
                <Button variant="contained" fullWidth>Book another car</Button>
            </Link>
            <Link to={"/bookings" } style={{ textDecoration: 'none' }}>
                            <Button variant="contained" fullWidth>See all Bookings</Button>
            </Link>
        </Stack>
    </div>
    );
}
