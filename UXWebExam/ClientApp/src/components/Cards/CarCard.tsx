import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import CarModel from "../../models/CarModel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import EventIcon from '@mui/icons-material/Event';
import { CardHeader } from '@mui/material';

interface Props {
    car: CarModel;
}

export default function CarCard(props: Props) {
    return (
        <Card>
                <CardHeader title={props.car.name} sx={{ backgroundColor: 'primary.main', color: "white"}}/>
                <CardMedia component="img" image={props.car.imageUrl} alt={props.car.name} />
                <CardContent>
                    <Typography variant="body1" color="text.secondary">
                        {props.car.description}
                        <br/>
                        <LocationOnIcon/>{props.car.street} {props.car.houseNumber}, {props.car.postalCode} {props.car.city}
                        <br/>
                        <LocalGasStationIcon />{props.car.type}
                        <br />
                        <AttachMoneyIcon />{props.car.price} kr./dagen
                    </Typography>
                </CardContent>
        </Card>
    );
}
