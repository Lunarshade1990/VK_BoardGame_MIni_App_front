import React, {useEffect, useState} from "react";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";
import {Button, CellButton, FormItem, FormLayout, Group, Header, RichCell} from "@vkontakte/vkui";
import {Icon28AddOutline, Icon28CancelCircleFillRed} from "@vkontakte/icons";
import {getPlaceTables} from "../../api/backApi/PlacesApi";
import {CREATE_TABLE} from "./Panels";
import {SelectableCellWithEditRemoveButtons} from "./SelectableCellWithEditRemoveButtons";

export const TableAdding = ({selectedPlace, addPanelInStack, onEditTable}) => {

    const [tables, setTables] = useState([]);

    useEffect(() => {
        getPlaceTables(selectedPlace.id)
            .then(r => setTables(r.data))
            .catch(e => console.log(e));
    }, []);


    const tableCells = tables.map(table => {
        const name = table.name ? table.name : `Стол #${table.id}`;
        return (
            <SelectableCellWithEditRemoveButtons content={
                <>
                    <b>{name}</b><br/>
                    {table.length} x {table.width}<br/>
                    До {table.maxPlayersNumber} человек<br/>
                    {table?.deskShape === "CIRCLE" ? 'Овальный' : 'Прямоуголный'}
                </>}
                                                 onEdit={() => onEditTable(table)}
            />
        )
    })

    return (
        <>
            <StandardPanelHeader showBack title={"Добавление столов"} status={selectedPlace.address}/>
            <Group header={<Header mode="secondary">Список столов</Header>}>
                <CellButton before={<Icon28AddOutline />}
                            onClick={() => addPanelInStack(CREATE_TABLE)}
                >
                    Добавить новый стол
                </CellButton>
                {tableCells}
            </Group>
            <FormLayout>
                <FormItem>
                    <Button size="m" stretched>Перейти к созданию встречи</Button>
                </FormItem>
            </FormLayout>
        </>
    )
}