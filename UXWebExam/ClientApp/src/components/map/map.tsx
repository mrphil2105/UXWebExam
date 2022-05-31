import React from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import LocationMarker from "./userLocation";
import { Card } from "@mui/material";
const Map: React.FC = () => {
    return (
        <MapContainer
            className="markercluster-map"
            style={{ height: 500, width: 500 }}
            center={[51.505, -0.09]}
            zoom={13}
            scrollWheelZoom={false}
        >
            <TileLayer
                //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[51.505, -0.09]}>
                <Popup>
                    <Card sx={{ height: 100, width: 100 }}>
                        {" "}
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Card>
                </Popup>
            </Marker>
            <LocationMarker />
        </MapContainer>
    );
};

export default Map;
