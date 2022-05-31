import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CarModel from "../../models/CarModel";

interface Props {
    car: CarModel;
}

export default function CarCard(props: Props) {
    return (
        <Card>
            <CardActionArea>
                <Typography gutterBottom variant="h4" component="div" padding={1}>
                    {props.car.name}
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.car.imageUrl}
                    alt={props.car.imageUrl}
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {props.car.type}
                        <br />
                        {props.car.price} kr./dagen
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
