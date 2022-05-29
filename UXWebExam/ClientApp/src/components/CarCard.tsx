import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Car } from './Car';


export default function CarCard({car}:any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image={car.imageURL}
          alt={car.imageURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {car.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {car.type}
            <br></br>
            {car.price}kr./dagen
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
