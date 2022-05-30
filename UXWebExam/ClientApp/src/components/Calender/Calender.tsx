import { Stack, TextField } from '@mui/material'
import { DatePicker, TimePicker, DateTimePicker, LocalizationProvider } from '@mui/lab'
import { useState } from 'react'
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

var selectedDateTime: { toDateString: () => any; toTimeString: () => any } | null;
const Calender = ({name}:any) => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label={name}
        value={selectedDateTime}
        onChange={newValue => {
          setSelectedDateTime(newValue)
        }}
        renderInput={params => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}
export default Calender;

const getDateTime = () => {
  if (selectedDateTime !=null)
  return (
    selectedDateTime.toDateString() + selectedDateTime.toTimeString()
  );
  return null;
}

