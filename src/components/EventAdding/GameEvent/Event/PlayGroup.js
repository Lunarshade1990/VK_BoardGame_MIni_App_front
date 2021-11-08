import React from "react";
import {Avatar, Div, Group, IconButton, RichCell, Separator, SimpleCell} from "@vkontakte/vkui";
import {GameImageContainer} from "../../../NavElements/GameImageContainer";
import {format} from "date-fns";
import {AddItemCell} from "../../../NavElements/AddItemCell";
import {Icon28MessageOutline, Icon56UserCircleOutline} from '@vkontakte/icons';

export const PlayGroup = ({play, currUserId, userIsCreator, onUserAdd, onAnotherUserAdd, onUserRemove, onGameRemove}) => {

    const timeFrom = format(new Date(play.startDate), 'HH:mm');
    const timeTo = format(new Date(play.endDate), 'HH:mm');
    const freeSpace = play.playerMaxCount - play.players.length - play.virtualUsers.length;
    const currUserIsPlayer = play.players.some(player => player.id === currUserId);

    const players = play.players.map(player => {
        return (
            <SimpleCell
                disabled
                before={<Avatar size={40} src={player.avatarUrl} />}
                description={play.hostId === player.id ? 'Хост' : null}
                after={userIsCreator || player.id === currUserId ? <IconButton><Icon28MessageOutline /></IconButton> : null}
            >
                {player.firstName + " " + player.secondName}
            </SimpleCell>
        )
    });

    play.virtualUsers.forEach(player => {
        players.push(
            <SimpleCell
                disabled
                before={<Icon56UserCircleOutline height={40} width={40}/>}
                after={userIsCreator ? <IconButton><Icon28MessageOutline /></IconButton> : null}
            >
                {player}
            </SimpleCell>
        )
    })

    const addCell = <AddItemCell
        onAdding={currUserIsPlayer ? onAnotherUserAdd : onUserAdd}
    >
        {currUserIsPlayer ? "Записать другого игрока" : "Записаться"}
    </AddItemCell>

    for (let i = 0; i < freeSpace; i++) {
        players.push(addCell)
    }

    return (
        <Group  mode="card">
                <RichCell
                    disabled
                    multiline
                    before={<Div><GameImageContainer src={play.boardGame.picture} height={100} width={80} padding border/></Div>}
                    text={"Время: " + timeFrom + " - " + timeTo}
                    caption={"Количество игроков: " + play.playerMinCount + " - " + play.playerMaxCount}
                    after={userIsCreator ? <IconButton><Icon28MessageOutline /></IconButton> : null}
                >
                    {play.boardGame.name}
                </RichCell>
                <Separator/>
                {players}
                {addCell}
        </Group>
    )
}