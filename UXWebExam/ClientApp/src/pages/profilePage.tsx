import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import CarCard from "../components/Cards/CarCard";
import ProfilePicture from "./profile";

function ProfilePage() {
    return (
        
        <div style={{display: 'flex',  justifyContent:'center'}}>
            <Stack spacing={3} sx={{ width: '600px' }}>
            <ProfilePicture/>
            <h3>Email</h3>
            <TextField id="filled-basic" label="Email" variant="filled" disabled={true} />
            <h3>Password</h3>
            <TextField id="filled-basic" label="Password" variant="filled" disabled={true} />
            </Stack>    
        </div>
    );
}


export default ProfilePage;