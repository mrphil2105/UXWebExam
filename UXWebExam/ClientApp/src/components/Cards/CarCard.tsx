import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Car } from '../../classes/Car';


export default function CarCard({car}:any) {
  return (
    <Card sx={{}}>
      <CardActionArea>
      <Typography gutterBottom variant="h4" component="div" padding={1}>
            {car.name}
      </Typography>
        <CardMedia
          component="img"
          height="300"
          image={car.imageURL}
          alt={car.imageURL}
        />
        <CardContent>
          <Typography variant="body1" color="text.secondary">
            {car.type}
            <br/>
            {car.price} kr./dagen
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
