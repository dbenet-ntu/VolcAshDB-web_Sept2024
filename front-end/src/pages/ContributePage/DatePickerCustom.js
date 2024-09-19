import React,{useEffect, useState} from "react";
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
export default function DatePickerCustom(props){
    const [readOnly,setReadOnly] = useState(true)
    const [views,setViews] = useState([])
    useEffect(()=>{
        props.setValue(null)
        if(props.dateFormat=="Unknown") setReadOnly(true)
        else setReadOnly(false)
        switch(props.dateFormat){
            case "mm/dd/yyyy": setViews(['year','month','day']); break;
            case "mm/yyyy": setViews(['year','month']); break;
            case "Year only": setViews(["year"]); break;
            default: setViews([])
        }
    },[props.dateFormat])
    return(
        <div>
            <Grid container xs={12} spacing={2}>
                <Grid item={true} xs={6} >
                    <TextField 
                        label="Choose Date Format" 
                        variant="outlined" 
                        select
                        value={props.dateFormat}
                        onChange={props.onFormatChange}
                        fullWidth
                        required >
                            {props.values.map(item => (
                            <MenuItem key = {item} value={item}>{item} </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                <Grid item={true} xs={6}>
                    {props.dateFormat=="Years BP"?
                    <TextField 
                        placeholder="Enter years before present" 
                        label={props.label}
                        variant="outlined" 
                        type="number"
                        value={props.yearsBP}
                        onChange={props.onYearsBPChange}
                        fullWidth>
                    </TextField>:
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DesktopDatePicker
                            views={views}
                            label={props.label}
                            value={props.value}
                            onChange={(newValue) => {
                            props.setValue(newValue.toISOString().slice(0,10)); // change format
                            }}
                            readOnly={readOnly}
                            renderInput={(params) => 
                            <TextField 
                                {...params}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: !props.dateFormat || props.dateFormat =="Unknown"?false:true
                                }}
                                fullWidth />}
                        />
                    </LocalizationProvider>}
                </Grid>
            </Grid>
        </div>
    )}