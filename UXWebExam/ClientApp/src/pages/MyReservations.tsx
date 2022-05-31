import { Button, Stack } from "@mui/material";
import React from "react";
import { Car } from "../classes/Car";
import { Reservation } from "../classes/Reservation";
import { Type } from "../classes/Car";
import Calender from "../components/Calender/Calender";
import CarCard from "../components/Cards/CarCard";
import SmallReservationCard from "../components/Cards/SmallReservationCard";

function MyReservations() {
    return (
        
        <div style={{display: 'flex',  justifyContent:'center'}}>
            <Stack spacing={3} sx={{ width: '600px' }}>
            <h1>Reservations</h1>
            <h3>Active</h3>
            <SmallReservationCard reservation={new Reservation(new Car("toyota",200,Type.Electric,"idk","testvej","22","0000","testby"),"01/03","10/11")} />
            <h3>Future</h3>
            </Stack>
        </div>
    );
}

export default MyReservations;
