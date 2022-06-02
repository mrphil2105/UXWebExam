import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CarModel from "../../models/CarModel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import { CardHeader } from "@mui/material";

interface Props {
    car: CarModel;
}

export default function BookCard(props: Props) {
    let address: string = "";

    if (props.car.postalCode) {
        address += props.car.postalCode + " ";
    }

    if (props.car.city) {
        address += props.car.city;
    }

    if (props.car.postalCode) {
        if (address) {
            address += ", ";
        }

        address += props.car.postalCode + " ";
    }

    if (props.car.city) {
        if (address && !props.car.postalCode) {
            address += ", ";
        }

        address += props.car.city;
    }

    return (
        <Card>
            <CardHeader title={props.car.name} sx={{ backgroundColor: "primary.main", color: "white" }} />
            <CardMedia component="img" image={props.car.imageUrl} alt={props.car.name} />
            <CardContent>
                <Typography>{props.car.description}</Typography>
                <Typography color="text.secondary">
                    {address && (<><LocationOnIcon /> {address}</>)}
                </Typography>
                <Typography color="text.secondary">
                    <LocalGasStationIcon />{props.car.type}
                </Typography>
                <Typography color="text.secondary">
                    <AttachMoneyIcon />{props.car.price} DKK/day
                </Typography>
            </CardContent>
        </Card>
    );
}
