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
import ReservationCard from "../components/cards/ReservationCard";
import { Reservation } from "../classes/Reservation";

export default function ReservationMade() {
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Stack spacing={3} sx={{ width: '600px' }}>
            <Typography gutterBottom variant="h4" component="div" >
                Reservation Made!
            </Typography>
            <ReservationCard reservation={new Reservation(car,"01/05","02/06")} />
            <br /> 
            <Link to={"/map"} style={{ textDecoration: 'none' }} >
                <Button variant="contained" fullWidth>Book another car</Button>
            </Link>
            <Link to={"/reservations" } style={{ textDecoration: 'none' }}>
                            <Button variant="contained" fullWidth>See all Reservations</Button>
            </Link>
        </Stack>
    </div>
    );
}
