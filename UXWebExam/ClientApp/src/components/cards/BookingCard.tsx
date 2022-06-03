import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventIcon from '@mui/icons-material/Event';
import { BookingModel } from '../../models/BookingModel';
import {CardHeader} from "@mui/material";

interface Props {
    booking: BookingModel;
}

const iconTypographyStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 5
};

export default function BookingCard(props: Props) {
    let address: string = "";

    if (props.booking.car.street) {
        address += props.booking.car.street + " ";
    }

    if (props.booking.car.houseNumber) {
        address += props.booking.car.houseNumber;
    }

    if (props.booking.car.postalCode) {
        if (address) {
            address += ", ";
        }

        address += props.booking.car.postalCode + " ";
    }

    if (props.booking.car.city) {
        if (address && !props.booking.car.postalCode) {
            address += ", ";
        }

        address += props.booking.car.city;
    }

    return (
        <Card>
            <CardHeader title={props.booking.car.name} sx={{ backgroundColor: "primary.main", color: "white" }} />
            <CardMedia component="img" image={props.booking.car.imageUrl} alt={props.booking.car.name} />
            <CardContent  >
                <Typography color="text.secondary" style={iconTypographyStyle}>
                    {address && (<><LocationOnIcon /> {address}</>)}
                </Typography>
                <Typography color="text.secondary" style={iconTypographyStyle}>
                    <LocalGasStationIcon />{props.booking.car.type}
                </Typography>
                <Typography color="text.secondary" style={iconTypographyStyle}>
                    <EventIcon />{props.booking.startDate} to <EventIcon />{props.booking.endDate}
                </Typography>
            </CardContent>
        </Card>
    );
}
