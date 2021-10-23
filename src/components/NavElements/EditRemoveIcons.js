import React from "react";
import {Icon28EditOutline, Icon28RemoveCircleOutline} from '@vkontakte/icons';
import { Icon28EditCircleFillBlue } from '@vkontakte/icons';
import { Icon28CancelCircleFillRed } from '@vkontakte/icons';
import {IconButton} from "@vkontakte/vkui";


export const EditRemoveIcons = ({onEdit, onRemove}) => {
    return (
        <>
            <IconButton>
                <Icon28EditCircleFillBlue width={24} height={24} style={{margin: '0 1px'}} onClick={onEdit}/>
            </IconButton>
            <IconButton>
                <Icon28CancelCircleFillRed width={24} height={24} style={{margin: '0 1px'}} color="red" onClick={onRemove}/>
            </IconButton>
        </>
    )
}