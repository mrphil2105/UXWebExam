import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Car } from '../../classes/Car';


export default function ReservationCard({reservation}:any) {
  return (
    <Card sx={{}}>
      <CardActionArea>
      <Typography gutterBottom variant="h4" component="div" padding={1}>
            {reservation.car.name}
      </Typography>
        <CardMedia
          component="img"
          height="300"
          image={reservation.car.imageURL}
          alt={reservation.car.imageURL}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {reservation.car.type}
            <br/>
            StartDate - {reservation.start}
            <br/>
            StartDate - {reservation.end}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
