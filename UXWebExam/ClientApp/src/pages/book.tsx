import React, { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/material";
import BookCard from "../components/cards/BookCard";
import { Button } from "@mui/material";
import CarModel from "../models/CarModel";
import { Link } from "react-router-dom";
import { useCalendarInput } from "../formControls";
import Calendar from "../components/calendar/Calendar";
import {doNothing} from "@mui/x-date-pickers/internals/utils/utils";

export default function Book() {
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
        return (<Container><Typography>Loading car...</Typography></Container>);
    }

    if (!car) {
        return (<Container><Typography>No car could be found.</Typography></Container>)
    }
    
    return (
<       div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px', padding:2 }}>
                <BookCard car={car} />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Calendar name="Start Time"  onChange={doNothing} value={new Date()}/>
                    <Calendar name="End Time"  onChange={doNothing} value={new Date()}/>
                </div>
                <Typography style={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}>130 kr.</Typography>
                <Link to={"/payment/"+car.id} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" fullWidth>Book</Button>
                </Link>
            </Stack>
        </div>
    );
}
