import React from "react";
import {StandardPanelHeader} from "../../../NavElements/StandardPanelHeader";
import {Avatar} from "@material-ui/core";
import {Button, Div, Group, PanelHeaderContent} from "@vkontakte/vkui";
import {PlayGroup} from "./PlayGroup";

export const SimpleEvent = ({event, userId}) => {

    const headerContent = (
        <PanelHeaderContent before={<Avatar size={36} src={event.creator.avatarUrl}/>} status={event.place.address}>
            Организатор: {event.creator.firstName} {event.creator.secondName}
        </PanelHeaderContent>
    )

    const plays = event.plays.map(play => {
        return <PlayGroup
            play={play}
            currUserId={userId}
            userIsCreator={event.creator.id === userId}
        />
    })

    return (
        <Group>
            <StandardPanelHeader title={headerContent} showBack/>
            {plays}
            <Group mode="card">
                <Div>
                    <Button size="m" stretched>
                        Добавить игру
                    </Button>
                </Div>
            </Group>
        </Group>

    )
}