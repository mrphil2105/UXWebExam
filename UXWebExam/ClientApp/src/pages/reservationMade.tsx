import { CreditCard } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import Calender from "../components/calendar/Calendar";
import CarCard from "../components/cards/CarCard";
import CreditCardForm from "../components/payment/CreditCardForm";
import CarModel from "../models/CarModel";

interface Props {
    car: CarModel;
}

function ReservationMade(props: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <Typography gutterBottom variant="h4" component="div" >
                    Reservation Made!
                </Typography>
                <CarCard car={props.car} />
                <br />
                <Button variant="contained">Book another car</Button>
                <Button variant="contained">See all Reservations</Button>
            </Stack>
        </div>
    );
}

export default ReservationMade;