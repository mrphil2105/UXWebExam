import { Stack, TextField } from '@mui/material'
import { DatePicker, TimePicker, DateTimePicker, LocalizationProvider } from '@mui/lab'
import { useState } from 'react'
import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'

const Calender = () => {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={4} sx={{ width: '250px' }}>
      <DateTimePicker
        label='Start Time'
        value={selectedDateTime}
        onChange={newValue => {
          setSelectedDateTime(newValue)
        }}
        renderInput={params => <TextField {...params} />}
      />
    </Stack>
    </LocalizationProvider>
  );
}
export default Calender;

