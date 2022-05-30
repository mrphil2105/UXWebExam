import { Button, Stack } from "@mui/material";
import React from "react";
import Calender from "../components/Calender/Calender";
import CarCard from "../components/Cards/CarCard";

function SystemExplained({car}:any) {
    return (
        
        <div style={{display: 'flex',  justifyContent:'center'}}>
        <Stack spacing={3} sx={{ width: '600px' }}>
        <h1>How to use website</h1>
        <h3>1. Pick a car</h3>
        <p>Pick a car near you, that you want to drive. You can see cars on a map, or in a list of cars</p>
        <h3>2. Book</h3>
        <p>Once you have picked a car, you can book it between a given start and end date and time.</p>
        <h3>3. Drive</h3>
        <p>
        When your reservation starts, you can find the car at the given address. 
        Find the reservation on the "my Reservation" page. Here you can press "unlock", 
        to unlock the car.You must deliver the car back to the same address, before your reservation ends. 
        If you don't do this you will be charged extra. Once you've the delivered the car, find the reservation on the website and press "fisnish".
        </p>
        <Button variant="contained">Understood</Button>

        </Stack>
    </div>
    );
}


export default SystemExplained;