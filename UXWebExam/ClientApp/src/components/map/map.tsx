import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import leafletMouseEvent from "leaflet";

import LocationMarker from "./userLocation";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const Map: React.FC = () => {
    function displayInfo(data: any) {
        console.log(data);
    }

    return (
        <Card sx={{ borderRadius: 5, width: "100%", height: "100%" }}>
            <CardMedia>
                <MapContainer
                    className="markercluster-map"
                    style={{ height: 600, width: "inherit", maxHeight: "100%" }}
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
                                displayInfo(e);
                                //console.log("marker clicked", e);
                            },
                        }}
                    >
                        <Popup>
                            This is a pop up when pressing the markerD
                        </Popup>
                    </Marker>
                    <LocationMarker />
                </MapContainer>
            </CardMedia>
            <CardContent>
                <Typography>Hejsa</Typography>
            </CardContent>
        </Card>
    );
};

export default Map;
