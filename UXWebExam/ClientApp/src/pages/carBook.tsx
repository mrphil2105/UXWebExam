import { Button, Stack } from "@mui/material";
import React from "react";
import Calender from "../components/calendar/Calendar";
import CarCard from "../components/Cards/CarCard";
import CarModel from "../models/CarModel";

interface Props {
    car: CarModel;
}

function CarBook(props: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <CarCard car={props.car} />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Calender name="Start Time" />
                    <Calender name="End Time" />
                </div>
                <p style={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}>130 kr.</p>
                <Button variant="contained">Book</Button>
            </Stack>
        </div>
    );
}

export default CarBook;
