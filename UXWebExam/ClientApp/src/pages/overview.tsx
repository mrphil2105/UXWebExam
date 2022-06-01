import React, { useEffect, useState } from "react";
import { Typography, Container, Grid } from "@mui/material";
import CarModel from "../models/CarModel";
import OverviewCard from "../components/cards/OverviewCard";
import { Link } from "react-router-dom";

function Overview() {
    const [isLoading, setIsLoading] = useState(true);
    const [cars, setCars] = useState<CarModel[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetAll");
            const cars = await response.json();
            setCars(cars);
            setIsLoading(false);
        })();
    }, []);

    if (isLoading) {
        return (
            <Container>
                <Typography>Loading cars...</Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Grid container spacing={1.5}>
                {cars.map((c) => (
                    //<Link to={`/${c.id}`} state={c}>
                    <OverviewCard key={c.id} car={c} />
                    //</Link>
                ))}
            </Grid>
        </Container>
    );
}

export default Overview;
