import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import LocationMarker from "./UserLocation";
import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Stack,
    Button,
} from "@mui/material";

const Map: React.FC = () => {
    function displayInfo(data: any) {
        console.log(data);
    }

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    }

    const [chosen, setChosen] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const height = getWindowDimensions().height;

    return (
        <Box sx={{ p: 1, width: "100%", height: "100%" }}>
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

                        <Marker
                            position={[55.6593764, 12.5908375]}
                            eventHandlers={{
                                click: (e) => {
                                    setChosen({
                                        lat: e.target.lat,
                                        lng: e.target.lng,
                                    });
                                    //console.log("marker clicked", e);
                                },
                            }}
                        >
                            <Popup>
                                <Stack direction="row" spacing={1}>
                                    <Typography>{`The address possibly long`}</Typography>
                                </Stack>
                            </Popup>
                        </Marker>
                        <LocationMarker />
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
                                    Address:{" "}
                                    {`the very long sadfasf sdfaddress`}
                                </Typography>
                                <Typography>Price: {`The price`}</Typography>
                            </Stack>

                            <Button variant="contained">Order now</Button>
                        </Stack>
                    </CardContent>
                )}
            </Card>
        </Box>
    );
};

export default Map;
