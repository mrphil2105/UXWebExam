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

    const height = getWindowDimensions().height;

    return isLoading ? (
        <Typography>Loading cars...</Typography>
    ) : (
        <Container>
            <Card sx={{ borderRadius: 5, width: "100%", height: "100%" }}>
                <CardMedia>
                    <MapContainer
                        className="markercluster-map"
                        style={{
                            height: chosen ? height * 0.9 : height * 0.65,
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
                                eventHandlers={{ click: () => setChosen(car) }}
                            >
                                <Popup>
                                    <Typography>{`latitude: ${car.latitude} longitude ${car.longitude}`}</Typography>
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
                                    Address: {chosen.street}
                                </Typography>
                                <Typography>{`Price: ${chosen.price} DKK`}</Typography>
                            </Stack>
                            <Link to={`/book/${chosen.id}`}>
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
