import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { Reservation } from '../../classes/Reservation';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from '@mui/icons-material/Event';
import { BookingModel } from '../../models/BookingModel';


interface Props {
    booking: BookingModel;
    active: Boolean
}

export default function BookingCard(props: Props) {

    let button;
   if (props.active){
        button=<Button variant="contained">Deliver</Button>
   }else{
    button=<Button variant="contained">Cancel</Button>
   }

    return (
        <Card>
                <Typography gutterBottom variant="h4" component="div" padding={1}>
                    {props.booking.car.name}
                </Typography>
                <CardMedia
                    component="img"
                    height="300"
                    image={props.booking.car.imageUrl}
                    alt={props.booking.car.imageUrl}
                />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        <br/>
                        <LocationOnIcon/>{props.booking.car.street} {props.booking.car.houseNumber}, {props.booking.car.postalCode} {props.booking.car.city}
                        <br/>
                        <LocalGasStationIcon />{props.booking.car.type}
                        <br />
                        <EventIcon /> StartDate - {props.booking.startDate}
                        <br />
                        <EventIcon /> EndDate - {props.booking.endDate}
                        <br />
                    </Typography>
                    <br />
                    {button}
                </CardContent>
        </Card>
    );
}
