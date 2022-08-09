import React, {useEffect, useState} from "react";
import {CellButton, Group, Header, IconButton, InfoRow, SimpleCell, Spinner} from "@vkontakte/vkui";
import {getUserPlaces} from "../../api/backApi/UserApi";
import {getPublicPlaces} from "../../api/backApi/PlacesApi";
import {Icon28AddOutline, Icon28MessageOutline} from "@vkontakte/icons";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";
import {SelectableCellWithEditRemoveButtons} from "./SelectableCellWithEditRemoveButtons";


export const PlaceChoice = ({userId, onNewPlace, onPlaceSelect, clearState}) => {

    const headerTitle = "Выбор места";

    const [userPlaces, setUserPlaces] = useState([]);
    const [publicPlaces, setPublicPlaces] = useState([]);
    const [userPlacesLoading, setUserPlacesLoading] = useState(true);
    const [publicPlacesLoading, setPublicPlacesLoading] = useState(true);


    useEffect(() => {
        setTimeout(clearState, 500);
        getUserPlaces(userId)
            .then(r => {
                setUserPlaces(r.data);
                setUserPlacesLoading(false);
            })
            .catch(_e => setUserPlacesLoading(false));

        getPublicPlaces(userId)
            .then(r => {
                setPublicPlaces(r.data)
                setPublicPlacesLoading(false)
            })
            .catch(_e => setPublicPlacesLoading(false));
    }, []);



    const userPlacesCells = userPlacesLoading ? <Spinner size="large" style={{ margin: '20px 0' }} /> :
        userPlaces.map(place => <SelectableCellWithEditRemoveButtons  onSelect={() => onPlaceSelect(place)}
                                                            content={place.address}/>);

    const publicPlacesCells = publicPlacesLoading ? <Spinner size="large" style={{ margin: '20px 0' }} />  :
        publicPlaces.slice(0, 9).map(place => {
            return(
                <SimpleCell onClick={() => onPlaceSelect(place)}>
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