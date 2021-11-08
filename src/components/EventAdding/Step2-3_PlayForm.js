import React, {useEffect, useState} from "react";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";
import {Button, Div, FormItem, FormLayoutGroup, Group, Input, Separator, SimpleCell, Textarea} from "@vkontakte/vkui";
import {DateTimePicking} from "./Step2-2_DateTimePicking";
import {GameImageContainer} from "../NavElements/GameImageContainer";
import {add, intervalToDuration, formatDuration} from "date-fns";
import ruLocale from 'date-fns/locale/ru';
import {WarningBottomText} from "../NavElements/WarningBottomText";
import {EventPlay} from "./GameEvent/EventPlay";
import {EventTable} from "./GameEvent/EventTable";
import {GameEvent} from "./GameEvent/GameEvent";
import {saveNewGameEvent} from "../../api/backApi/GameEventApi";

export const PlayForm = ({place, play, user, onSaveEvent}) => {

    const game = play.game
    const [timeFrom, setTimeFrom] = useState(new Date());
    const [timeTo, setTimeTo] = useState(new Date());
    const [minPlayers, setMinPlayers] = useState(game.minPlayerNumber);
    const [maxPlayers, setMaxPlayers] = useState(game.maxPlayerNumber);
    const [timeIntervalText, setTimeIntervalText] = useState('');
    const [errors, setErrors] = useState({
        timeFrom: {error: false, text: ''},
        timeTo: {error: false, text: ''},
        minPlayers: {error: false, text: ''},
        maxPlayers: {error: false, text: ''}
    });

    useEffect(() => {
        if (timeTo < timeFrom) {
            const date = add(new Date(timeFrom), {minutes: game.maxTime});
            setTimeTo(date);
        }
    }, [timeFrom]);

    useEffect(() => {
        const duration = intervalToDuration({
            start: timeFrom,
            end: timeTo
        });
        if (timeFrom-timeTo == 0) setTimeIntervalText("Запланированное время игры: 0 минут")
        else setTimeIntervalText("Запланированное время игры: " + formatDuration(duration, {locale: ruLocale}));
    }, [timeFrom, timeTo]);


    const formValidation = () => {
        console.log('Min: ' + minPlayers);
        console.log('Max: ' + maxPlayers)
        const errorsObj = {...errors};
        if (timeFrom < new Date()) {
            errorsObj.timeFrom = {
                error: true,
                text: 'Нельзя выбрать время в прошлом'
            }
        } else {
            errorsObj.timeFrom = {
                error: false,
                text: ''
            }
        }
        if (timeTo < timeFrom) {
            errorsObj.timeTo = {
                error: true,
                text: 'Время окончания не может быть раньше времени начала'
            }
        } else {
            errorsObj.timeTo = {
                error: false,
                text: ''
            }
        }

        if (+minPlayers > +maxPlayers) {
            errorsObj.minPlayers = {
                error: 'true',
                text: 'Минимальное число игроков не должно быть больше максимального'
            }
        } else if (+minPlayers < game.minPlayerNumber) {
            errorsObj.minPlayers = {
                error: 'warning',
                text: 'Количество игроков меньше минимального'
            }
        } else if (+minPlayers > game.maxPlayerNumber) {
            errorsObj.minPlayers = {
                error: 'warning',
                text: 'Количество игроков больше максимального'
            }
        } else errorsObj.minPlayers = {
            error: 'false',
            text: ''
        }

        if (+maxPlayers < +minPlayers) {
            errorsObj.maxPlayers = {
                error: 'true',
                text: 'Максимальное число игроков не должно быть больше минимального'
            }
        } else if (+maxPlayers > game.maxPlayerNumber) {
            errorsObj.maxPlayers = {
                error: 'warning',
                text: 'Количество игроков больше максимального'
            }
        } else if (+maxPlayers < game.minPlayerNumber) {
            errorsObj.maxPlayers = {
                error: 'warning',
                text: 'Количество игроков меньше минимального'
            }
        } else errorsObj.maxPlayers = {
            error: false,
            text: ''
        }
        setErrors(errorsObj);
    }

    const finalValidation = () => {
        return !(errors.timeTo.error
            || errors.timeFrom.error
            || (errors.minPlayers.error === 'true')
            || (errors.maxPlayers.error === 'true'))
    }

    const createSimpleEvent = () => {
        const eventPlay = new EventPlay();
        eventPlay.game = game.id;
        eventPlay.timeFrom = timeFrom;
        eventPlay.timeTo = timeTo;
        eventPlay.playersTo = maxPlayers;
        eventPlay.playersFrom = minPlayers;
        eventPlay.addPlayer(user.id, true);
        const eventTable = new EventTable('virtual');
        eventTable.addPlay(eventPlay);
        const gameEvent = new GameEvent('simple', user.id, place.id);
        gameEvent.addTable(eventTable);
        return gameEvent;
    }

    const onSaveButton = () => {
        formValidation();
        if (finalValidation()) {
            onSaveEvent(createSimpleEvent())
        } else alert("Ошибка!")
    }

    let minPlayerBottomEl = null;
    if (errors.minPlayers.error === 'warning' ) minPlayerBottomEl = <WarningBottomText text={errors.minPlayers.text}/>
    else if (errors.minPlayers.error === 'true') minPlayerBottomEl = errors.minPlayers.text;

    let maxPlayerBottomEl = null;
    if (errors.maxPlayers.error === 'warning' ) maxPlayerBottomEl = <WarningBottomText text={errors.maxPlayers.text}/>
    else if (errors.maxPlayers.error === 'true') maxPlayerBottomEl = errors.maxPlayers.text;

    return (
        <>
            <StandardPanelHeader title={"Время и количество игроков"} showBack status={place.address}/>
            <Group>
                <SimpleCell disabled before={<GameImageContainer height={100} width={80} src={game.picture}/>} ><Div>{game.name}</Div></SimpleCell>
                {/*</Group>*/}
                {/*<Group>*/}
                <DateTimePicking valueTo={timeTo}
                                 valueFrom={timeFrom}
                                 setValueTo={setTimeTo}
                                 setValueFrom={setTimeFrom}
                                 bottomText={timeIntervalText}
                                 fromError={errors.timeFrom}
                                 toError={errors.timeTo}
                                 validateFunc={formValidation}
                />
                <FormLayoutGroup mode="horizontal">
                    <FormItem
                        top="Минимальное количество игроков"
                        status={errors.minPlayers.error === 'true' ? 'error' : "valid"}
                        bottom={minPlayerBottomEl}
                    >
                        <Input type="number"
                               min={1}
                               value={minPlayers}
                               onChange={event => setMinPlayers(event.target.value)}
                               onBlur={formValidation}
                        />
                    </FormItem>
                    <FormItem
                        top="Максимальное количество игроков"
                        status={errors.maxPlayers.error === 'true' ? 'error' : "valid"}
                        bottom={maxPlayerBottomEl}
                    >
                        <Input
                            type="number"
                            min={1}
                            value={maxPlayers}
                            onChange={event => setMaxPlayers(event.target.value)}
                            onBlur={formValidation}
                        />
                    </FormItem>
                </FormLayoutGroup>
                <FormLayoutGroup>
                    <FormItem top="Комментарий">
                        <Textarea placeholder="Пожелания, допы и прочая информаци" />
                    </FormItem>
                </FormLayoutGroup>
                <Div>
                    <Button stretched size={"l"} onClick={onSaveButton}>
                        Готово
                    </Button>
                </Div>
            </Group>
        </>
    )
}