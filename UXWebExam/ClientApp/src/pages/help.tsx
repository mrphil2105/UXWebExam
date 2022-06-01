import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Help() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={3} sx={{ width: '600px' }}>
                <Typography variant="h3">How to use website</Typography>
                <Typography variant="h5">1. Pick a car</Typography>
                <Typography>Pick a car near you, that you want to drive. You can see cars on a map, or in a list of cars.</Typography>
                <Typography variant="h5">2. Book</Typography>
                <Typography>Once you have picked a car, you can book it between a given start and end date and time.</Typography>
                <Typography variant="h5">3. Drive</Typography>
                <Typography>
                    When your reservation starts, you can find the car at the given address.
                    Find the reservation on the "My Reservations" page. Here you can press "Unlock",
                    to unlock the car. You must deliver the car back to the same address, before your reservation ends.
                    If you don't do this you will be charged extra. Once you've the delivered the car, find the
                    reservation on the website and press "Finish".
                </Typography>
                <Link to="/">
                    <Button variant="contained">Understood</Button>
                </Link>
            </Stack>
        </div>
    );
}
