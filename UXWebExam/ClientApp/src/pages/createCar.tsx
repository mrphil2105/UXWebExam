import React, { MouseEventHandler, useEffect, useState } from "react";
import {
    useTextAreaInput,
    useTextInput,
    useNumberInput,
    useSelectInput,
    ValidationFailure,
    boxPadding
} from "../formControls";
import { Box, Button, Container } from "@mui/material";
import CarModel from "../models/CarModel";

export default () => {
    const [ carTypes, setCarTypes ] = useState<string[]>([]);
    const [ carImages, setCarImages ] = useState<string[]>([]);

    const [ name, nameInput ] = useTextInput("Name");
    const [ description, descriptionInput ] = useTextAreaInput("Description");
    const [ type, typeInput ] = useSelectInput("Type", carTypes);
    const [ price, priceInput ] = useNumberInput("Price");
    const [ image, imageInput ] = useSelectInput("Image", carImages, "", true);
    const [ street, streetInput ] = useTextInput("Street");
    const [ houseNumber, houseNumberInput ] = useTextInput("House No.");
    const [ postalCode, postalCodeInput ] = useNumberInput("Postal Code");
    const [ city, cityInput ] = useTextInput("City");
    const [ longitude, longitudeInput ] = useNumberInput("Longitude");
    const [ latitude, latitudeInput ] = useNumberInput("Latitude");

    const [ errors, setErrors ] = useState<string[]>([]);

    useEffect(() => {
        (async () => {
            const response = await fetch("/api/Car/GetCarTypes");
            const carTypes = await response.json();
            setCarTypes(carTypes);
        })();

        (async () => {
            const response = await fetch("/api/Car/GetCarImages");
            const carImages = await response.json();
            setCarImages(carImages);
        })();
    }, []);

    const handleClick: MouseEventHandler = async () => {
        setErrors([]);

        const car: CarModel = {
            name,
            description,
            type,
            price,
            imageUrl: image,
            street,
            houseNumber,
            postalCode,
            city,
            longitude,
            latitude
        };

        const response = await fetch("/api/Car/CreateCar", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(car)
        });

        if (!response.ok) {
            const failure: ValidationFailure = await response.json();
            const modelErrors: string[] = [];

            Object.keys(failure.errors).forEach(key => {
                failure.errors[key].forEach(propertyError => {
                    modelErrors.push(propertyError);
                });
            });

            setErrors(modelErrors);
        }
    };

    return (
        <Container>
            <ul style={{ margin: "1rem", padding: "0", listStyle: "none", color: "red", fontFamily: "Roboto" }}>
                {errors.map((e, i) => (<li key={i}>{e}</li>))}
            </ul>
            <Box sx={{ mx: -boxPadding }}>
                {nameInput}
                {descriptionInput}
                {typeInput}
                {priceInput}
                {imageInput}
                {streetInput}
                {houseNumberInput}
                {postalCodeInput}
                {cityInput}
                {longitudeInput}
                {latitudeInput}
            </Box>
            <Box sx={{ my: boxPadding }}>
                <Button type="submit" variant="contained" onClick={handleClick}>Create</Button>
            </Box>
        </Container>
    );
}
