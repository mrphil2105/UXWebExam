import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardHeader } from '@mui/material';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from '@mui/icons-material/Event';
import { BookingModel } from '../../models/BookingModel';

interface Props {
    booking: BookingModel;
    active: Boolean
}

export default function BookingCard(props: Props) {
    let button;

    if (props.active) {
        button = <Button variant="contained">Deliver</Button>
    } else {
        button = <Button variant="contained">Cancel</Button>
    }

    return (
        <Card>
            <CardHeader title={props.booking.car.name} sx={{ backgroundColor: 'primary.main', color: "white" }} />
            <CardMedia component="img" image={props.booking.car.imageUrl} alt={props.booking.car.name} />
            <CardContent>
                <Typography variant="body1" color="text.secondary">
                    <LocationOnIcon />{props.booking.car.street} {props.booking.car.houseNumber}, {props.booking.car.postalCode} {props.booking.car.city}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <LocalGasStationIcon />{props.booking.car.type}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <EventIcon /> StartDate - {props.booking.startDate}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <EventIcon /> EndDate - {props.booking.endDate}
                </Typography>
                {button}
            </CardContent>
        </Card>
    );
}
