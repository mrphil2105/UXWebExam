import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';

interface Props {
    reservation: any;
}

export default function ReservationCard(props: Props) {
    return (
        <Card>
            <CardActionArea>
                <Typography gutterBottom variant="h4" component="div" padding={1}>
                    {props.reservation.car.name}
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.reservation.car.imageUrl}
                    alt={props.reservation.car.imageUrl}
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        <br/>
                        {props.reservation.car.street} {props.reservation.car.houseNumber}, {props.reservation.car.postalCode} {props.reservation.car.city}
                        <br/>
                        {props.reservation.car.type}
                        <br />
                        StartDate - {props.reservation.start}
                        <br />
                        StartDate - {props.reservation.end}
                        <br />
                    </Typography>
                    <br />
                    <Button variant="contained">Deliver</Button>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
