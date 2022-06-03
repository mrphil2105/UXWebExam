import React from "react";
import { Dispatch, SetStateAction, useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Stack, useMediaQuery } from "@mui/material";
import { boxPadding } from "../../formControls";

interface Props {
    onInvalidation: (isFilled: boolean) => void;
}

export default function PaymentForm(props: Props) {
    const [ name, setName ] = useState("");
    const [ cardNumber, setCardNumber ] = useState("");
    const [ expiryDate, setExpiryDate ] = useState("");
    const [ cvv, setCvv ] = useState("");

    const isMobile = useMediaQuery("(max-width: 600px)");
    const direction = isMobile ? "column" : "row";

    const isFilled = !!name && !!cardNumber && !!expiryDate && !!cvv;
    props.onInvalidation(isFilled);

    return (
        <Box>
            <Box component="img"
                 sx={{
                     width: "80%",
                     display: "block",
                     marginLeft: "auto",
                     marginRight: "auto"
                 }}
                 src={require("../../resources/creditCard.png")}
            />

            <Stack direction={direction} sx={{ mx: -boxPadding }}>
                <Box sx={{ width: "100%", p: boxPadding }}>
                    <TextField
                        required
                        id="cardName"
                        label="Name on card"
                        autoComplete="cc-name"
                        variant="standard"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </Box>
                <Box sx={{ width: "100%", p: boxPadding }}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        autoComplete="cc-number"
                        variant="standard"
                        fullWidth
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                    />
                </Box>
            </Stack>

            <Stack direction={direction} sx={{ mx: -boxPadding }}>
                <Box sx={{ width: "100%", p: boxPadding }}>
                    <TextField
                        required
                        id="expDate"
                        label="Expiry date"
                        autoComplete="cc-exp"
                        variant="standard"
                        fullWidth
                        value={expiryDate}
                        onChange={e => setExpiryDate(e.target.value)}
                    />
                </Box>
                <Box sx={{ width: "100%", p: boxPadding }}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        autoComplete="cc-csc"
                        variant="standard"
                        fullWidth
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                    />
                </Box>
            </Stack>
        </Box>
    );
}
