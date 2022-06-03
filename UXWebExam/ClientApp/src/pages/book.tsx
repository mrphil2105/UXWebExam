import React, { useEffect, useState } from "react";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";
import { Stack } from "@mui/material";
import BookCard from "../components/cards/BookCard";
import { Button } from "@mui/material";
import CarModel from "../models/CarModel";
import { Link } from "react-router-dom";
import { useCalendarInput } from "../formControls";
import { BookModel } from "../models/BookModel";

export default function Book() {
    const pathname = window.location.pathname;
    const slashIndex = pathname.lastIndexOf("/");
    const id = pathname.substring(slashIndex + 1, pathname.length);

    const [ fromDate, fromDateString, fromDateInput ] = useCalendarInput("From");
    const [ toDate, toDateString, toDateInput ] = useCalendarInput("To");

    const [ isLoading, setIsLoading ] = useState(true);
    const [ car, setCar ] = useState<CarModel | null>();

    const isMobile = useMediaQuery("(max-width: 600px)");
    const direction = isMobile ? "column" : "row";

    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/Car/GetCar?id=${id}`);

            if (response.ok) {
                const car: CarModel = await response.json();
                setCar(car);
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return (<Container><Typography>Loading car...</Typography></Container>);
    }

    if (!car) {
        return (<Container><Typography>No car could be found.</Typography></Container>)
    }

    const bookModel: BookModel = {
        carId: Number(id),
        startDate: fromDateString,
        endDate: toDateString
    }

    const diffTime = toDate && fromDate && Math.max(toDate.getTime() - fromDate.getTime(), 0);
    const totalPrice = diffTime ? car.price * ((diffTime / (1000 * 3600 * 24)) + 1) : 0;

    return (
        <Container>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Stack spacing={3} sx={{ width: "600px" }}>
                    <BookCard car={car} />
                    <Stack direction={direction}>
                        <Box sx={{ width: "100%" }}>{fromDateInput}</Box>
                        <Box sx={{ width: "100%" }}>{toDateInput}</Box>
                    </Stack>
                    <Typography variant="h3" style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>{totalPrice.toFixed(2)} DKK</Typography>
                    <Link to={"/payment/" + car.id} state={bookModel}
                          style={{ pointerEvents: !diffTime ? "none" : "auto", textDecoration: "none" }}>
                        <Button disabled={!diffTime} variant="contained" fullWidth sx={{bgcolor:"secondary.main",color:"black", borderRadius:10}}>Book</Button>
                    </Link>
                </Stack>
            </div>
        </Container>
    );
}
