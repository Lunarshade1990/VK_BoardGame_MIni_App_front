import React, {useEffect, useState} from "react";
import {CellButton, Group, Header, IconButton, InfoRow, SimpleCell} from "@vkontakte/vkui";
import {getUserPlaces} from "../../api/backApi/UserApi";
import {getPublicPlaces} from "../../api/backApi/PlacesApi";
import {Icon28AddOutline, Icon28MessageOutline} from "@vkontakte/icons";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";
import {SelectableCellWithEditRemoveButtons} from "./SelectableCellWithEditRemoveButtons";

export const PlaceChoice = ({userId, onNewPlace}) => {

    const headerTitle = "Выбор места";

    const [userPlaces, setUserPlaces] = useState([]);
    const [publicPlaces, setPublicPlaces] = useState([]);

    useEffect(() => {
        getUserPlaces(userId).then(r => setUserPlaces(r.data));
    }, []);

    useEffect(() => {
        getPublicPlaces(userId).then(r => setPublicPlaces(r.data));
    }, []);


    const userPlacesCells = userPlaces.map(place => <SelectableCellWithEditRemoveButtons content={place.address}/>)
    const publicPlacesCells = publicPlaces.slice(0, 9)
        .map(place => {
            return(
                <SimpleCell>
                    <InfoRow header={place.name}>
                        {place.address}
                    </InfoRow>
                </SimpleCell>
            )
        });


    return (
        <>
            <StandardPanelHeader showBack={false} title={headerTitle}/>
            <Group header={<Header mode="secondary">Мои места</Header>}>
                <CellButton before={<Icon28AddOutline />} onClick={() => onNewPlace(false)}>Добавить новый адрес</CellButton>
                {userPlacesCells}
            </Group>
            <Group header={<Header mode="secondary">Общественные места</Header>}>
                <CellButton before={<Icon28AddOutline />} onClick={() => onNewPlace(true)}>Добавить новое место</CellButton>
                {publicPlacesCells}
            </Group>
        </>
    )
}