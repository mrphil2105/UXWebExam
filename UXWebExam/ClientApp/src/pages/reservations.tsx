import { Stack } from "@mui/material";
import React from "react";
import { Car } from "../classes/Car";
import { Reservation } from "../classes/Reservation";
import { Type } from "../classes/Car";
import ReservationCard from "../components/cards/ReservationCard";

function Reservations() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <h1>Reservations</h1>
                <h3>Active</h3>
                <ReservationCard reservation={new Reservation(new Car("yo", 200, Type.Electric, "idk"), "hey", "yo")} />
                <h3>Future</h3>
            </Stack>
        </div>
    );
}

export default Reservations;
