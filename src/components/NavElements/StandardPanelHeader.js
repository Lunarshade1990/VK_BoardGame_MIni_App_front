import React from "react";
import {PanelHeader, PanelHeaderBack, PanelHeaderContent} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {goToPreviousPanel} from "../../store/rootReducer";

export const StandardPanelHeader = ({title, separator, showBack = false, before=null, status=null}) => {

    const dispatch = useDispatch();
    let arrowBack = showBack ? <PanelHeaderBack onClick={() => (dispatch(goToPreviousPanel()))} /> : null;

    return (
        <PanelHeader left={arrowBack} separator={separator}>
            <PanelHeaderContent before={before} status={status}>
                {title}
            </PanelHeaderContent>
        </PanelHeader>
    )
}