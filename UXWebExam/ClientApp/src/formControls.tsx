import React, { useState } from "react";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export interface ValidationFailure {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: { [property: string]: string[] }
}

const boxMargin = 1.5;

export function useTextInput(name: string, defaultValue = ""): [ string, JSX.Element ] {
    const [ value, setValue ] = useState(defaultValue);
    const input = (
        <Box sx={{ m: boxMargin }}>
            <FormControl fullWidth>
                <TextField type="text" label={name} value={value} onChange={e => setValue(e.target.value)} />
            </FormControl>
        </Box>
    );
    return [ value, input ];
}

export function useNumberInput(name: string, defaultValue = 0): [ number, JSX.Element ] {
    const [ value, setValue ] = useState(defaultValue);
    const input = (
        <Box sx={{ m: boxMargin }}>
            <FormControl fullWidth>
                <TextField type="number" label={name} value={value} onChange={e => setValue(Number(e.target.value))} />
            </FormControl>
        </Box>
    );
    return [ value, input ];
}

export function useSelectInput(name: string, values: string[], defaultValue = ""): [ string, JSX.Element ] {
    const [ value, setValue ] = useState(defaultValue);
    const input = (
        <Box sx={{ m: boxMargin }}>
            <FormControl fullWidth>
                <InputLabel>{name}</InputLabel>
                <Select label={name} value={value} onChange={e => setValue(e.target.value)}>
                    {values.map((v, i) => (
                        <MenuItem key={i} value={v}>{v}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
    return [ value, input ];
}
