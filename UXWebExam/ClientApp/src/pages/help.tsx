import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Help() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Stack spacing={3} sx={{ width: '600px', padding:3 }}>
                <Typography variant="h4" sx={{color:'primary.dark'}}>How to use website</Typography>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">1. Pick a car</Typography>
                    <Typography>Pick a car near you, that you want to drive. You can see cars on the map, or on the search page.</Typography>
                </Box>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">2. Book</Typography>
                    <Typography>Once you have picked a car, you can book it between a given start and end date.</Typography>
                </Box>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">3. Drive</Typography>
                    <Typography>
                        When your booking starts, you can find the car at the given address.
                        You must deliver the car back to the same address, before your booking ends.
                        If you don't do this you will be charged extra. 
                    </Typography>
                    </Box>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Button variant="contained">Understood</Button>
                </Link>
            </Stack>
        </div>
    );
}
