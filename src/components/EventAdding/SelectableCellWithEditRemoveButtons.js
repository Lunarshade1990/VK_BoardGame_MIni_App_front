import React from "react";
import {EditRemoveIcons} from "../NavElements/EditRemoveIcons";
import {Div, Cell, SimpleCell} from "@vkontakte/vkui";

export const SelectableCellWithEditRemoveButtons = ({content, onSelect, onRemove, onEdit}) => {

    return (
            <SimpleCell onClick={onSelect}
                        after={<EditRemoveIcons
                            onRemove={onRemove}
                            onEdit={onEdit}
                        />}>{content}</SimpleCell>
    )
}