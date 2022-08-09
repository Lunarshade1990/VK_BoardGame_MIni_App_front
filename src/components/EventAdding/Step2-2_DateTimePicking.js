import React from "react";
import {FormItem, FormLayoutGroup} from "@vkontakte/vkui";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import {MobileDateTimePicker} from "@mui/lab";
import TextField from '@mui/material/TextField';
import ruLocale from 'date-fns/locale/ru';


export const DateTimePicking = ({
                                    valueFrom,
                                    setValueFrom,
                                    valueTo,
                                    setValueTo,
                                    bottomText,
                                    fromError,
                                    toError,
                                    validateFunc,
                                    onFromClose
                                }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
            <FormLayoutGroup mode="horizontal">
                <FormItem
                    top={"Начало встречи"}
                    status={fromError.error ? 'error' : 'valid'}
                    bottom={fromError.error ? fromError.text : bottomText}
                >
                    <MobileDateTimePicker
                        onClose={onFromClose}
                        onBlur={validateFunc}
                        minDateTime={new Date()}
                        value={valueFrom}
                        onChange={(newValue) => {
                            setValueFrom(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} onBlur={validateFunc}/>}
                    />
                </FormItem>
                <FormItem
                    top={"Окончание встречи"}
                    status={toError.error ? 'error' : 'valid'}
                    bottom={toError.error ? toError.text : null}
                >
                    <MobileDateTimePicker
                        onBlur={validateFunc}
                        minDateTime={valueFrom}
                        value={valueTo}
                        onChange={(newValue) => {
                            setValueTo(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} onBlur={validateFunc}/>}
                    />
                </FormItem>
            </FormLayoutGroup>
        </LocalizationProvider>
    )
}