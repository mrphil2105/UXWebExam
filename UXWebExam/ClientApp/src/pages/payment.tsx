import React, { MouseEventHandler, useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import CarModel from "../models/CarModel";
import CreditCardForm from "../components/payment/CreditCardForm";
import { useLocation, useNavigate } from "react-router-dom";
import authService from "../components/api-authorization/AuthorizeService";
import { BookModel } from "../models/BookModel";
import { ProblemDetails } from "../models/ProblemDetails";

export default function Payment() {
    const pathname = window.location.pathname;
    const slashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(slashIndex + 1, pathname.length);

    const location = useLocation();
    const navigate = useNavigate();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ car, setCar ] = useState<CarModel | null>();

    const [ canConfirm, setCanConfirm ] = useState(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/Car/GetCar?id=${id}`);
            const car: CarModel = await response.json();
            setCar(car);
            setIsLoading(false);
        })();
    }, []);

    const invalidationHandler: (isFilled: boolean) => void = (isFilled) => setCanConfirm(isFilled);

    const handleClick: MouseEventHandler = async () => {
        setError(null);
        const bookModel = location.state as BookModel;

        if (!bookModel) {
            // Dirty redirect in case the state is not present.
            navigate("/");
        }

        const token = await authService.getAccessToken();
        const response = await fetch("/api/Booking/BookCar", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookModel)
        });

        if (response.ok) {
            const bookingId: number = await response.json();
            return navigate("/booking-created/" + bookingId);
        } else {
            const problem: ProblemDetails = await response.json();
            setError(problem.detail! || problem.title!);
        }
    };

    if (isLoading) {
        return (<Container><Typography>Loading payment...</Typography></Container>);
    }

    if (!car) {
        return (<Container><Typography>No car could be found.</Typography></Container>)
    }

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={3} sx={{ width: "600px" }}>
                    <CreditCardForm onInvalidation={invalidationHandler} />
                    <Button disabled={!canConfirm} variant="contained" fullWidth onClick={handleClick}  sx={{bgcolor:"secondary.main",color:"black", borderRadius:10,'&:hover': {bgcolor:"secondary.dark"}}}>Confirm Payment</Button>
                    {error && <Typography style={{ color: "red" }}>{error}</Typography>}
                </Stack>
            </div>
        </Container>
    );
}
