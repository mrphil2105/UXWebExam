import React, { MouseEventHandler, useEffect, useState } from "react";
import {
    useTextAreaInput,
    useTextInput,
    useNumberInput,
    useSelectInput,
    ValidationFailure,
    boxPadding,
} from "../formControls";
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
    useMediaQuery,
} from "@mui/material";
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
    const [ showSuccess, setShowSuccess ] = useState(false);

    const isMobile = useMediaQuery("(max-width: 600px)");
    const direction = isMobile ? "column" : "row";

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
            latitude,
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
            <Typography variant="h3">Create car</Typography>
            <ul
                style={{
                    marginTop: "1rem",
                    marginBottom: "1rem",
                    padding: "0",
                    listStyle: "none",
                    color: "red",
                    fontFamily: "Roboto",
                }}
            >
                {errors.map((e, i) => (
                    <li key={i}>{e}</li>
                ))}
            </ul>

            <Box sx={{ mx: -boxPadding }}>
                <Stack>
                    {nameInput}
                    {descriptionInput}
                    {typeInput}
                    {priceInput}
                    {imageInput}
                    <Stack direction={direction}>
                        <Box sx={{ width: "100%" }}> {streetInput}</Box>
                        <Box sx={{ width: "100%" }}> {houseNumberInput}</Box>
                    </Stack>
                    <Stack direction={direction}>
                        <Box sx={{ width: "100%" }}> {postalCodeInput}</Box>
                        <Box sx={{ width: "100%" }}> {cityInput}</Box>
                    </Stack>
                    <Stack direction={direction}>
                        <Box sx={{ width: "100%" }}> {latitudeInput}</Box>
                        <Box sx={{ width: "100%" }}> {longitudeInput}</Box>
                    </Stack>
                </Stack>
            </Box>

            <Box sx={{ my: 1 }}>
                <Button variant="contained" onClick={handleClick} sx={{bgcolor:"secondary.main",color:"black", borderRadius:10}}>Create</Button>
                {showSuccess && <Typography style={{ display: "inline-flex", marginLeft: "1rem" }}>The car has been created!</Typography>}
            </Box>
        </Container>
    );
}
