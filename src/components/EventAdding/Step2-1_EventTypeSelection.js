import React from "react";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import HelpIcon from '@mui/icons-material/Help';
import {Button, Group, Placeholder} from "@vkontakte/vkui";
import {CREATE_EVENT} from "./Panels";
import {StandardPanelHeader} from "../NavElements/StandardPanelHeader";

export const EventTypeSelection = ({place, onTypeSelect}) => {
return (
    <>
    <StandardPanelHeader status={place.address} title={"Выбор типа события"} showBack/>
    <Group>
        <Placeholder style={{ width: '100%'}}
                     icon={<LooksOneIcon sx={{width: 56, height: 56}}/>}
                     header="Встреча"
                     action={
                         <Button
                             size={'m'}
                             stretched
                             onClick={() => onTypeSelect('simple')}
                             >
                             Перейти к выбору игр
                         </Button>
                     }
        >
            Одна или несколько игр подряд, упрощённое создание
        </Placeholder>
        <Placeholder style={{ width: '100%'}}
                     icon={<HelpIcon sx={{width: 56, height: 56}}/>}
                     header="Игротека"
                     action={
                         <Button
                             size={'m'}
                             stretched
                             onClick={() => onTypeSelect('complex')}
                             >
                             Перейти к выбору столов и игр
                         </Button>
                     }
        >
            Размещение за несколькими столами, разные участники, разные игры в разное время параллельно
        </Placeholder>
    </Group>
    </>
)
}