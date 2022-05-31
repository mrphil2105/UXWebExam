import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Stack } from '@mui/material';
import { Car } from '../../classes/Car';



export default function SmallReservationCard({reservation}:any) {
  return (
    <Box
             sx={{
      display: 'flex',
      bgcolor: 'background.paper',
      justifyContent: 'space-between',
      overflow: 'hidden',
      borderRadius: '12px',
      boxShadow: 1,
      fontWeight: 'bold',
    }}
    >
    <Stack spacing={1} padding={1}>
        <h1>{reservation.car.name}</h1>
    </Stack>

     <Stack spacing={1}>
     <p > Start Date - {reservation.start}</p>
     <p > End Date - {reservation.end}</p>

     </Stack>
     <p > </p>
    

    </Box>
  );
}