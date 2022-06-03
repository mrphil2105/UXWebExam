import React from "react";
import CarModel from "../../models/CarModel";
import { Button, Typography, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from '@mui/material/CardActions';
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";

interface Props {
    car: CarModel;
}

const iconTypographyStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap"
};

export default function SearchCard(props: Props) {
    let description = props.car.description;

    if (description.length > 100) {
        description = description.substring(0, 97) + "...";
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                <CardMedia component="img" image={props.car.imageUrl} alt={props.car.name} />
                <CardContent>
                    <Typography sx={{ mb: 1 }} variant="h5">{props.car.name}</Typography>
                    <Typography>{description}</Typography>
                    <Typography color="text.secondary"
                                style={iconTypographyStyle}><LocalGasStationIcon /> {props.car.type}</Typography>
                    <Typography color="text.secondary"
                                style={iconTypographyStyle}><AttachMoneyIcon /> {props.car.price} DKK/day</Typography>
                    {props.car.city &&
                        <Typography color="text.secondary"
                                    style={iconTypographyStyle}><LocationOnIcon /> {props.car.city}</Typography>}
                </CardContent>
                <CardActions>
                    <Link to={"/book/"+props.car.id} style={{ textDecoration: 'none' }}>
                        <Button variant="contained" sx={{bgcolor:"secondary.main",color:"black", borderRadius:10}}>Book</Button>
                    </Link>
                </CardActions>
            </Card>
        </Grid>
    );
}
