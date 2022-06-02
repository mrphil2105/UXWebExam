import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import CarModel from "../../models/CarModel";
import { Link } from "react-router-dom";
import LocationMarker from "./UserLocation";
import {
    Card,
    CardMedia,
    CardContent,
    Container,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";

const Map: React.FC = () => {
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }
    const [chosen, setChosen] = React.useState<CarModel | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [cars, setCars] = React.useState<CarModel[]>([]);


    React.useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetAll");
            const cars = await response.json();
            setCars(cars);
            setIsLoading(false);
        })();
    }, []);

    return isLoading ? (
        <Container><Typography>Loading cars...</Typography> </Container>
    ) : (
        <Container>
            <Card sx={{ borderRadius: 5, width: "100%", maxHeight:getWindowDimensions().height*0.9 }}>
                <CardMedia
                    sx={{ height: chosen ? getWindowDimensions().height*0.65 : getWindowDimensions().height*0.85 }}
                >
                    <MapContainer
                        className="markercluster-map"
                        style={{
                            height: "inherit",
                            width: "inherit",
                        }}
                        center={[55.6593764, 12.59083759]}
                        zoom={13}
                        scrollWheelZoom={true}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <LocationMarker />

                        {cars.map((car) => (
                            <Marker
                                position={[car.latitude, car.longitude]}
                                eventHandlers={{ click: () => setChosen(car)}}
                            >
                                <Popup>
                                    <Typography>
                                        Address <br/>
                                        {`${car.street} ${car.houseNumber}, ${car.city}`} <br/>
                                        Model  <br/>
                                        {car.name}
                                    </Typography>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </CardMedia>
                {!chosen ? null : (
                    <CardContent>
                        <Stack>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Typography>
                                    Road: {chosen.street}
                                </Typography>
                                <Typography>{`Price: ${chosen.price} DKK`}</Typography>
                            </Stack>
                            <Link to={`/book/${chosen.id}`} style={{textDecoration: "none"}}>
                                <Button variant="contained">Book now</Button>
                            </Link>
                        </Stack>
                    </CardContent>
                )}
            </Card>
        </Container>
    );
};

export default Map;
