import React, { useEffect, useState } from "react";
import { Typography, Container, Grid, useMediaQuery, Stack, Box } from "@mui/material";
import CarModel from "../models/CarModel";
import SearchCard from "../components/cards/SearchCard";
import { useCalendarInput, useSelectInput, useTextInput, boxPadding } from "../formControls";
import { ProblemDetails } from "../models/ProblemDetails";

function Search() {
    const [ isLoading, setIsLoading ] = useState(true);
    const [ carTypes, setCarTypes ] = useState<string[]>([]);
    const [ cars, setCars ] = useState<CarModel[]>([]);

    const [ term, termInput ] = useTextInput("Search");
    const [ type, typeInput ] = useSelectInput("Type", carTypes, "", true);
    const [ fromDate, fromDateString, fromDateInput ] = useCalendarInput("From");
    const [ toDate, toDateString, toDateInput ] = useCalendarInput("To");

    const [ timeoutId, setTimeoutId ] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [ error, setError ] = useState<string | null>(null);

    const isMobile = useMediaQuery("(max-width: 600px)");
    const direction = isMobile ? "column" : "row";

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetCarTypes");
            const carTypes = await response.json();
            setCarTypes(carTypes);
        })();
    }, []);

    const loadCars = (async () => {
        setIsLoading(true);
        const searchModel: Record<string, string> = {
            term,
            type,
            fromDateString,
            toDateString
        };

        const response = await fetch("/api/Car/Search?" + new URLSearchParams(searchModel), {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            const cars = await response.json();
            setCars(cars);
            setError(null);
        } else {
            const problem: ProblemDetails = await response.json();
            setError(problem.detail!);
        }

        setIsLoading(false);
    });

    useEffect(() => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            await loadCars();
        }, 1000);
        setTimeoutId(newTimeoutId);
    }, [ term, type, fromDateString, toDateString ]);

    let resultsElement: JSX.Element;

    if (isLoading) {
        resultsElement = (<Typography>Loading cars...</Typography>);
    } else if (error) {
        resultsElement = (<Typography style={{ color: "red" }}>{error}</Typography>);
    } else if (cars.length === 0) {
        resultsElement = (<Typography>No results.</Typography>);
    } else {
        resultsElement = (
            <Grid container spacing={1.5}>
                {cars.map(c => (
                    <Grid key={c.id} item xs={12} sm={6} md={4}>
                        <SearchCard car={c} />
                    </Grid>
                ))}
            </Grid>
        );
    }

    return (
        <Container>
            <Typography gutterBottom variant="h3">Search</Typography>
            <Box sx={{ mx: -boxPadding, mb: 1 }}>
                <Stack direction={direction}>
                    <Box sx={{ width: "100%" }}>{termInput}</Box>
                    <Box sx={{ width: "100%" }}>{typeInput}</Box>
                </Stack>
                <Stack direction={direction}>
                    <Box sx={{ width: "100%" }}>{fromDateInput}</Box>
                    <Box sx={{ width: "100%" }}>{toDateInput}</Box>
                </Stack>
            </Box>
            {resultsElement}
        </Container>
    );
}

export default Search;
