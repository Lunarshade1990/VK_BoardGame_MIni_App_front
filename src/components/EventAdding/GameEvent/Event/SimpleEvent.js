import React, {useEffect, useState} from "react";
import {StandardPanelHeader} from "../../../NavElements/StandardPanelHeader";
import {
    Avatar,
    Button,
    Div, FormItem,
    FormLayout,
    FormLayoutGroup,
    Group, Input,
    MiniInfoCell,
    PanelHeaderContent
} from "@vkontakte/vkui";
import {PlayGroup} from "./PlayGroup";
import CardBorder from "./CardBorder";
import { Icon20ClockOutline } from '@vkontakte/icons';
import LockClockIcon from '@mui/icons-material/LockClock';
import {format} from "date-fns";
import ruLocale from 'date-fns/locale/ru';
import {DateTimePicker, LocalizationProvider, MobileDateTimePicker} from "@mui/lab";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {changeEventLastUpdateDate} from "../../../../api/backApi/GameEventApi";

export const SimpleEvent = ({event, userId, setEvent, setSelectedPlay, addNewGameToEvent}) => {

    const [userIsCreator] = useState(event.creator.id === userId);
    const [lastUpdateMode] = useState(userIsCreator ? 'add' : 'base');
    const [lastUpdateDate, setLastUpdateDate] = useState(new Date(event.lastUpdateTime));
    const [lastUpdateDateFormat, setLastUpdateDateFormat] = useState(format(new Date(event.lastUpdateTime), 'd MMMM HH:mm', {locale: ruLocale}));
    const [lastUpdateTimeCompMode, setLastUpdateTimeCompMode] = useState('cell');
    const [openPicker, setOpenPicker] = useState(false);

    const eventStartDate = format(new Date(event.startDate), 'd MMMM HH:mm', {locale: ruLocale});
    const eventEndDate = format((new Date(event.endDate)), 'd MMMM HH:mm', {locale: ruLocale});

    const headerContent = (
        <PanelHeaderContent before={<Avatar size={36} src={event.creator.avatarUrl}/>} status={event.place.address}>
            Организатор: {event.creator.firstName} {event.creator.secondName}
        </PanelHeaderContent>
    )


    const setNewLastUpdateDate = (value) => {
        setLastUpdateDate(value)
    }

    useEffect(() => {
        setLastUpdateDateFormat(format(lastUpdateDate, 'd MMMM HH:mm', {locale: ruLocale}));
    }, [lastUpdateDate]);

    let lastUpdateTimeComp;

    const changeInputToCell = () => {
        changeEventLastUpdateDate(event.id, lastUpdateDate)
            .then(_r => {
                setOpenPicker(false);
                setLastUpdateTimeCompMode('cell');
            });
    }

    const changeLastUpdateCellToInput = () => {
        setLastUpdateTimeCompMode('input')
    }

    if (lastUpdateTimeCompMode === 'cell') {
        lastUpdateTimeComp = (
            <MiniInfoCell
                before={<LockClockIcon sx={{color: 'gray', width: 20, height: 20}} />}
                mode={lastUpdateMode}
                onClick={lastUpdateMode === 'base' ? null : changeLastUpdateCellToInput}
            >
                Запись до {lastUpdateDateFormat}
            </MiniInfoCell>
        )
    } else {
        lastUpdateTimeComp = (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
                    <FormLayoutGroup mode="horizontal" removable onRemove={changeInputToCell}>
                        <FormItem>
                            <MobileDateTimePicker
                                open={openPicker}
                                minDateTime={new Date()}
                                maxDateTime={new Date(event.startDate)}
                                value={lastUpdateDate}
                                onChange={setNewLastUpdateDate}
                                onClose={changeInputToCell}
                                onBlur={changeInputToCell}
                                renderInput={(params) => <Input value={format(new Date(event.lastUpdateTime), 'dd.LL.yyyy HH:mm', {locale: ruLocale})} onClick={() => setOpenPicker(true)}/>}
                            />
                        </FormItem>
                    </FormLayoutGroup>
                </LocalizationProvider>
        )
    }

    const plays = event.plays.map(play => {
        return <PlayGroup
            play={play}
            currUserId={userId}
            userIsCreator={userIsCreator}
            lastEventUpdateDate={lastUpdateDate}
            setSelectedPlay={(play, callback) => setSelectedPlay(play, callback)}
        />
    })

    return (
        <Group>
            <StandardPanelHeader title={headerContent} showBack separator={false}/>
            <Group>
                <MiniInfoCell
                    before={<Icon20ClockOutline />}
                    textWrap="full"
                    textLevel="primary"
                >
                    {eventStartDate} - {eventEndDate}
                </MiniInfoCell>
                {lastUpdateTimeComp}
            </Group>
            {plays}
            <Div style={CardBorder}>
                <Div>
                    <Button size="m" stretched onClick={addNewGameToEvent}>
                        Добавить игру
                    </Button>
                </Div>
            </Div>
        </Group>
    )
}