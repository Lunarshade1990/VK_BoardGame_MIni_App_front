import {FormLayout} from "@vkontakte/vkui";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CustomSideInput} from "../CustomFormElements/CustomSideInput";
import {setCollectionFilter} from "../store/rootReducer";
import {SlideTwosideInput} from "../CustomFormElements/SlideTwosideInput";


export const CollectionFilterModal = () => {

    return (
        <FormLayout>
            <SlideTwosideInput param="timeFilter" title="Время игры"/>
            <SlideTwosideInput param="playersFilter" title="Количество игроков"/>
        </FormLayout>
    )
}