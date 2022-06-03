import React from "react";

import L from "leaflet";
import { Marker, Popup, useMap } from "react-leaflet";
import { LatLng } from "leaflet";

/**
 * this component is used to display the users location on the map
 * source: https://stackoverflow.com/questions/66500181/how-to-locate-react-leaflet-map-to-users-current-position-and-get-the-borders-f
 */
const LocationMarker = () => {
    const [position, setPosition] = React.useState<LatLng | null>(null);
    const [bbox, setBbox] = React.useState([]);

    const map = useMap();

    React.useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
            const radius = e.accuracy;
            const circle = L.circle(e.latlng,radius);
            circle.options.color = "red";
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(",") as never[]);
        });
    }, [map]);

    const customMarker = L.icon({
        iconUrl: require("../../resources/map/location marker.webp"),
        iconSize: [20, 35],
        iconAnchor: [12, 40],
    });

    return !position ? null : (
        <Marker position={position} icon={customMarker}>
            <Popup>You are here</Popup>
        </Marker>
    );
};

export default LocationMarker;
