import React from "react";
import {Avatar, Div, IconButton, RichCell, Separator, SimpleCell} from "@vkontakte/vkui";
import {GameImageContainer} from "../../../NavElements/GameImageContainer";
import {format} from "date-fns";
import {AddItemCell} from "../../../NavElements/AddItemCell";
import {Icon28CancelCircleFillRed, Icon28EditCircleFillBlue, Icon56UserCircleOutline} from '@vkontakte/icons';
import CardBorder from "./CardBorder";
import {addPanelInStack} from "../../../../store/rootReducer";
import {PLAY_FORM} from "../../Panels";
import {useDispatch} from "react-redux";

export const PlayGroup = ({
                              play,
                              currUserId,
                              userIsCreator,
                              onUserAdd,
                              onAnotherUserAdd,
                              onUserRemove,
                              onGameRemove,
                              lastEventUpdateDate,
                              setSelectedPlay}) => {

    const dispatch = useDispatch();

    const timeFrom = format(new Date(play.startDate), 'HH:mm');
    const timeTo = format(new Date(play.endDate), 'HH:mm');
    const freeSpace = play.playerMaxCount - play.players.length - play.virtualUsers.length;
    const currUserIsPlayer = play.players.some(player => player.id === currUserId);

    const addCell = <AddItemCell
        onAdding={currUserIsPlayer ? onAnotherUserAdd : onUserAdd}
    >
        {currUserIsPlayer ? "Записать другого игрока" : "Записаться"}
    </AddItemCell>

    const ButtonContainerStyle = {
        display: 'flex',
        alignItems: "center",
        justifyContent: "flex-end"
    }

    const imageContainerShadow = {
        marginRight: 16,
        marginBottom: 12,
        borderRadius: 8,
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
    }

    const editPlay = () => {
        setSelectedPlay(play, dispatch(addPanelInStack(PLAY_FORM)));
    }

    const players = play.players.map(player => {
        return (
            <SimpleCell
                disabled
                before={<Avatar size={40} src={player.avatarUrl} />}
                description={play.hostId === player.id ? 'Хост' : null}
                after={userIsCreator || player.id === currUserId ? <IconButton><Icon28CancelCircleFillRed style={{margin: '0 1px'}}/></IconButton> : null}
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
                after={userIsCreator ? <IconButton><Icon28CancelCircleFillRed style={{margin: '0 1px'}}/></IconButton> : null}
            >
                {player}
            </SimpleCell>
        )
    })

    if (new Date() < lastEventUpdateDate) {
        for (let i = 0; i < freeSpace; i++) {
            players.push(addCell)
        }
    }

    const cancelGameButton = !userIsCreator ? null : (
        <SimpleCell disabled after={<IconButton><Icon28CancelCircleFillRed style={{margin: '0 1px'}}/></IconButton>}/>
    )


    return (
        <Div  style={CardBorder}>
            <RichCell
                disabled
                multiline
                before={<div style={{...imageContainerShadow}}><GameImageContainer src={play.boardGame.picture} height={100} width={80} padding border/></div>}
                after={userIsCreator ? <IconButton onClick={editPlay}><Icon28EditCircleFillBlue/></IconButton> : null}
                text={"Время: " + timeFrom + " - " + timeTo}
                caption={"Количество игроков: " + play.playerMinCount + " - " + play.playerMaxCount}
            >
                {play.boardGame.name}
            </RichCell>
            <Separator/>
            {players}
            {cancelGameButton}
        </Div>
    )
}