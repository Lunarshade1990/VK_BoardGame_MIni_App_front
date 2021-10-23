import {FormLayout} from "@vkontakte/vkui";
import React from "react";
import {SlideTwosideInput} from "../CustomFormElements/SlideTwosideInput";
import {NumberOfPlayersSelect} from "./NumberOfPlayersSelect";


export const CollectionFilterModal = (props) => {


    return (
        <FormLayout>
            <SlideTwosideInput param="time" title="Время игры"/>
            <SlideTwosideInput param="players" title="Количество игроков"/>
            <NumberOfPlayersSelect/>
        </FormLayout>
    )
}