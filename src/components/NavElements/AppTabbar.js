import React, {useEffect, useState} from "react";
import {Icon28AllCategoriesOutline, Icon28Profile, Icon56EventOutline} from '@vkontakte/icons';
import { Icon28Users3Outline } from '@vkontakte/icons';
import { Icon28AddSquareOutline } from '@vkontakte/icons';
import {Tabbar, TabbarItem} from "@vkontakte/vkui";
import {useDispatch} from "react-redux";
import {setActiveView} from "../../store/rootReducer";

export const AppTabbar = ({activeStory, onStoryChange}) => {
    return (
        <Tabbar>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'profile'}
                data-story="profile"
                text="Профиль"
            ><Icon28Profile /></TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'players'}
                data-story="players"
                text="Игроки"
            ><Icon28Users3Outline /></TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'createEvent'}
                data-story="createEvent"
                text="Создать событие"
            ><Icon28AddSquareOutline/></TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'events'}
                data-story="events"
                text="События"
            ><Icon56EventOutline width={28} height={28}/></TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'games'}
                data-story="games"
                text="Игры"
            ><Icon28AllCategoriesOutline /></TabbarItem>
        </Tabbar>
    );


}