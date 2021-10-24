import React, {useEffect, useState} from "react";
import {Button, Checkbox, FormItem, Group, Input, Placeholder, Separator} from "@vkontakte/vkui";
import {Divider, List, ListItem, ListItemButton, ListItemText, Popover} from "@material-ui/core";
import {suggests} from "../../axios/DaDataSuggests";
import {Icon56CheckCircleOutline, Icon56NotePenOutline} from "@vkontakte/icons";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";
import {CREATE_EVENT, TABLE_ADDING} from "./Panels";

export const NewAddressCreating = ({userId, isPublic, onContinue, selectedAddress}) => {

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [isHomeAddr, setIsHomeAddr] = useState(false);
    const [useDefault, setUseDefault] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [chosenSuggestion, setChosenSuggestion] = useState(null);
    const [inputError, setInputError] = useState(null);

    useEffect(() => {
        if (selectedAddress) {
            selectedAddress(selectedAddress.value);
        }
    }, [selectedAddress]);


    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onAddressChose = (addr) => {
        setAddress(addr.value);
        setChosenSuggestion(addr);
        setAnchorEl(null);
    }

    const onAddressChange = (e) => {
        setAddress(e.target.value);
        suggests.post('', {
            query: e.target.value,
            locations: [{
                //TODO выбор города
                region: "москва"
            }]
        }).then(r => {
            setSuggestions(r.data.suggestions);
            if (r.data.suggestions.length > 0) {
                setAnchorEl(e.target)
            }
        });
    }

    const onContinueButtonClick = (panel) => {
        if (!chosenSuggestion || chosenSuggestion.value !== address) {
            setInputError({message: 'Адрес не заполнен или введён вручную'})
        } else {
            setInputError(null);
            const placeConf = {
                userId: userId,
                name: name,
                address: chosenSuggestion.value,
                latitude: chosenSuggestion.data.geo_lat,
                longitude: chosenSuggestion.data.geo_lon,
                publicPlace: isPublic,
                home: isHomeAddr,
                byDefault: useDefault
            }
            onContinue(panel, placeConf)
        }
    }

    const listItems = suggestions.map(s => {
        return (
            <ListItem disablePadding>
                <ListItemButton onClick={() => onAddressChose(s)}>
                    <ListItemText primary={s.value} />
                </ListItemButton>
            </ListItem>
        )
    })

    const nameInput = !isPublic ? null : (
        <FormItem top={"Название"}>
            <Input placeholder={"Укажите название заведения"} value={name} onChange={setName}/>
        </FormItem>
    )

    const isHomeAddressCheckbox = isPublic ? null : (
        <Checkbox checked={isHomeAddr} onChange={() => setIsHomeAddr(!isHomeAddr)}>Мой домашний адрес</Checkbox>
    )

    return (
        <>
            <StandardPanelHeader onBackClick={() => {}} title={"Добавление адреса"} showBack/>
            <Group>
                {nameInput}
                <FormItem
                    top={"Адрес"}
                    status={!inputError ? 'valid' : 'error'}
                    bottom={inputError ? inputError.message : ''}
                >
                    <Input placeholder={"Введите адрес"} value={address} onChange={onAddressChange}/>
                    <Popover
                        disableAutoFocus={true}
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <List>
                            {listItems}
                        </List>
                    </Popover>
                </FormItem>
                <FormItem>
                    {isHomeAddressCheckbox}
                    <Checkbox
                        checked={useDefault}
                        onChange={() => setUseDefault(!useDefault)}>
                        Использовать по-умолчанию
                    </Checkbox>
                </FormItem>
                <Placeholder
                    icon={<Icon56NotePenOutline />}
                    header="Добавить столы"
                    action={
                        <Button
                            size={'m'}
                            stretched
                            onClick={() => onContinueButtonClick(TABLE_ADDING)}>
                            Добавить столы
                        </Button>
                    }
                >
                    Добавьте один или несколо столов для лучшего представления игроками габаритов и статистики
                </Placeholder>
                <Divider variant="middle">ИЛИ</Divider>
                <Placeholder style={{ width: '100%'}}
                             icon={<Icon56CheckCircleOutline />}
                             header="Продолжить"
                             action={
                                 <Button
                                     size={'m'}
                                     stretched
                                     onClick={() => onContinueButtonClick(CREATE_EVENT)}>
                                     Перейти к выбору игр
                                 </Button>
                             }
                >
                    Перейти к выбору даты, игр и количеству участников
                </Placeholder>
            </Group>
        </>
    )
}