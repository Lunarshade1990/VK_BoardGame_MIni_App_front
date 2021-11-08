import React from "react";
import {Icon28AddOutline} from "@vkontakte/icons";
import {CellButton} from "@vkontakte/vkui";

export const AddItemCell = (props) => {

    return (
        <CellButton before={<Icon28AddOutline />} onClick={props.onAdding}>{props.children}</CellButton>
    )
}