import React, { MouseEventHandler, useEffect, useState } from "react";
import { useTextAreaInput, useTextInput, useNumberInput, useSelectInput, ValidationFailure } from "../formControls";
import { Box, Button, Container, Typography } from "@mui/material";
import CarModel from "../models/CarModel";

export default () => {
    const [ carTypes, setCarTypes ] = useState<string[]>([]);
    const [ carImages, setCarImages ] = useState<string[]>([]);

    const [ name, nameInput ] = useTextInput("Name");
    const [ description, descriptionInput ] = useTextAreaInput("Description");
    const [ type, typeInput ] = useSelectInput("Type", carTypes);
    const [ price, priceInput ] = useNumberInput("Price");
    const [ image, imageInput ] = useSelectInput("Image", carImages);
    const [ street, streetInput ] = useTextInput("Street");
    const [ houseNumber, houseNumberInput ] = useTextInput("House No.");
    const [ postalCode, postalCodeInput ] = useNumberInput("Postal Code");
    const [ city, cityInput ] = useTextInput("City");
    const [ longitude, longitudeInput ] = useNumberInput("Longitude");
    const [ latitude, latitudeInput ] = useNumberInput("Latitude");

    const [ errors, setErrors ] = useState<string[]>([]);
    const [ showSuccess, setShowSuccess ] = useState(false);

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
        } else {
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
        }
    };

    return (
        <Container>
            <ul style={{ margin: "1rem", padding: "0", listStyle: "none", color: "red" }}>
                {errors.map((e, i) => (<li key={i}><Typography>{e}</Typography></li>))}
            </ul>
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
            <Box sx={{ m: 1.5 }}>
                <Button type="submit" variant="contained" onClick={handleClick}>Create</Button>
                {showSuccess && <Typography style={{ display: "inline-flex", marginLeft: "1rem" }}>The car has been created!</Typography>}
            </Box>
        </Container>
    );
}
