import React from "react";
import {Button, CardScroll, ContentCard, Div, Group, Header, Text} from "@vkontakte/vkui";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";
import {GameImageContainer} from "../../../NavElements/GameImageContainer";
import {Avatar, AvatarGroup} from "@mui/material";
import {Icon24User} from '@vkontakte/icons';
import { Icon24UserCircleOutline } from '@vkontakte/icons';

export const EventHorizontalScroll = ({eventList, title, onClick, limit}) => {

    const createUserStack = (play) => {

        let free = play.playerMaxCount - play.players.length;

        const photoSet = new Set();
        play.players.map(player => photoSet.add(<Avatar
            sx={{ width: "24px !important", height: "24px !important" }}
            alt={player.firstName + ' ' + player.secondName}
            src={player.avatarUrl}
        />));

        if (play.virtualPlayers) {
            free -= play.virtualPlayers.length
            play.virtualPlayers.map(player => photoSet.add(
                <Avatar style={{width: 24, height: 24}}
                        alt={player} sx={{bgcolor: 'gray'}}
                >
                    <Icon24User/>
                </Avatar>))
        }
        return (
            <div style={{marginBottom: 8}}>
                <Text style={{color: 'gray'}}>Cвободных мест: {free}</Text>
                <AvatarGroup max={5}>
                    {photoSet}
                </AvatarGroup>
            </div>
        )
    }

    const getGridStyle = (gridSize) => {
        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gap: 1
        }
    }

    const createGameImageGrid = (plays) => {
        const gridSize = Math.ceil(Math.sqrt(plays.length));
        const images = plays.map(play => {
            return <GameImageContainer key={play.id} src={play.boardGame.picture} padding={false} height={116/gridSize} width={116/gridSize} roundCorner={false}/>
        });
        return (
            <div style={getGridStyle(gridSize)}>
                {images}
            </div>
        )
    }



    const eventCells = eventList.flatMap(event => event.plays.map(play => {
        const game = play.boardGame
        const address = event.place.address.split(',').slice(1).join();
        return (
            <ContentCard
                disabled={false}
                onClick={() => {}}
                mode="shadow"
                src={game.picture}
                subtitle={address}
                header={game.name}
                text={format(new Date(event.startDate), 'd MMMM HH:mm', {locale: ruLocale})}
                caption={createUserStack(play)}
                maxHeight={200}
                style={{paddingBottom: 0, width: 200}}
            />
        )
    }));

    return (
        <Group header={<Header aside={<Button mode="tertiary">Показать все</Button>}>{title}</Header>}>
            <Div>
                <CardScroll size="s">
                    {eventCells}
                </CardScroll>
            </Div>
        </Group>
    )
}