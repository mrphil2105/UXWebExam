import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardHeader } from '@mui/material';
import { Reservation } from '../../classes/Reservation';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from '@mui/icons-material/Event';

interface Props {
    reservation: Reservation;
}

export default function ReservationCard(props: Props) {
    return (
        <Card>
                <CardHeader title={props.reservation.car.name} sx={{ backgroundColor: 'primary.main', color: "white"}}/>
                <CardMedia component="img" image={props.reservation.car.imageUrl} alt={props.reservation.car.name} />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        <br/>
                        <LocationOnIcon/>{props.reservation.car.street} {props.reservation.car.houseNumber}, {props.reservation.car.postalCode} {props.reservation.car.city}
                        <br/>
                        <LocalGasStationIcon />{props.reservation.car.type}
                        <br />
                        <EventIcon />StartDate - {props.reservation.start}
                        <br />
                        <EventIcon />StartDate - {props.reservation.end}
                        <br />
                    </Typography>
                    <br />
                    <Button variant="contained">Deliver</Button>
                </CardContent>
        </Card>
    );
}
