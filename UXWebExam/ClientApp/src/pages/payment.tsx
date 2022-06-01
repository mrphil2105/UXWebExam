import { CreditCard } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import React from "react";
import Calender from "../components/calendar/Calendar";
import CarCard from "../components/cards/CarCard";
import CreditCardForm from "../components/payment/CreditCardForm";
import CarModel from "../models/CarModel";

interface Props {
    car: CarModel;
}

function PaymentPage(props: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <CarCard car={props.car} />
                <br />
                <p style={{ display: 'flex', justifyContent: 'center', fontSize: 30 }}>130 kr.</p>
                <CreditCardForm/>
                <Button variant="contained">Confirm Payment</Button>
            </Stack>
        </div>
    );
}

export default PaymentPage;