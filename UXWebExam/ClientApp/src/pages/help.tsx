import { Box, Button, Stack, Typography, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Help() {
    return (
        <Container>
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Stack spacing={3} sx={{width: '600px', padding: 1}}>
                    <Typography variant="h3" sx={{color:'primary.dark'}}>How to use website</Typography>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">1. Find</Typography>
                    <Typography>You can find bookable cars near your current location on our map, or you can find them via the search page.
                    </Typography>
                </Box>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">2. Book</Typography>
                    <Typography>Once you have picked a car, you can book it between a given start and end date and time.</Typography>
                </Box>
                <Box component="span" sx={{ p: 2, border: 2,  borderColor:'primary.main',borderRadius: 1 }}>
                    <Typography variant="h5">3. Drive</Typography>
                    <Typography>
                        When your booking starts, you can find the car at the given address.
                        You must deliver the car back to the same address, before your booking ends. Otherwise you’ll be
                        deducted for additonal time. 
                    </Typography>
                </Box>
                <Link to="/" style={{ textDecoration: "none" }}>
                        <Button variant="contained" sx={{bgcolor:"secondary.main",color:"black", borderRadius:10}}>Understood</Button>
                    </Link>
                </Stack>
            </Box>
        </Container>
    );
}
