import React, {useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Calendar from "./components/calendar/Calendar";

export interface ValidationFailure {
    type: string;
    title: string;
    status: number;
    traceId: string;
    errors: { [property: string]: string[] }
}

export const boxPadding = 0.75;

export function useTextInput(name: string, defaultValue = ""): [string, JSX.Element] {
    const [value, setValue] = useState(defaultValue);
    const input = (
        <Box sx={{p: boxPadding}}>
            <FormControl fullWidth>
                <TextField type="text" label={name} value={value} onChange={e => setValue(e.target.value)}
                           />
            </FormControl>
        </Box>
    );
    return [value, input];
}

export function useNumberInput(name: string, defaultValue = 0): [number, JSX.Element] {
    const [value, setValue] = useState(defaultValue);
    const input = (
        <Box sx={{p: boxPadding}}>
            <FormControl fullWidth>
                <TextField type="number" label={name} value={value} onChange={e => setValue(Number(e.target.value))}
                           />
            </FormControl>
        </Box>
    );
    return [value, input];
}

export function useSelectInput(name: string, values: string[], defaultValue = "", addEmpty = false): [string, JSX.Element] {
    const [value, setValue] = useState(defaultValue);
    const input = (
        <Box sx={{p: boxPadding}}>
            <FormControl fullWidth>
                <InputLabel>{name}</InputLabel>
                <Select label={name} value={value} onChange={e => setValue(e.target.value)}>
                    {addEmpty && <MenuItem value="">&lt;blank&gt;</MenuItem>}
                    {values.map((v, i) => (
                        <MenuItem key={i} value={v}>{v}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
    return [value, input];
}

export function useTextAreaInput(name: string, defaultValue = ""): [string, JSX.Element] {
    const [value, setValue] = useState(defaultValue);
    const input = (
        <Box sx={{p: boxPadding}}>
            <FormControl fullWidth>
                <TextField multiline type="text" label={name} value={value} onChange={e => setValue(e.target.value)} />
            </FormControl>
        </Box>
    );
    return [value, input];
}

export function useCalendarInput(name: string): [string, JSX.Element] {
    const [date, setDate] = useState<Date | null>(null);
    const [value, setValue] = useState("");

    const changeHandler: (newDate: Date | null) => void = (newDate) => {
        setDate(newDate);
        setValue(formatDate(newDate));
    };

    const input = (
        <Box sx={{p: boxPadding}}>
            <FormControl fullWidth>
                <Calendar  name={name} value={date} onChange={changeHandler}/>
            </FormControl>
        </Box>
    );
    return [value, input];
}

function formatDate(date: Date | null) {
    if (!date) {
        return "";
    }

    let month = "" + (date.getMonth() + 1);
    let day = "" + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) {
        month = "0" + month;
    }
    if (day.length < 2) {
        day = "0" + day;
    }

    return [day, month, year].join("/");
}
