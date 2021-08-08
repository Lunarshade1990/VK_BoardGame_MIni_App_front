import React, {useEffect} from 'react';
import {AppBar, Tab, Tabs} from "@material-ui/core";


export const ProfileTabbar = (props) => {
    return (
        <AppBar>
            <Tabs aria-label="simple tabs example" centered={true}>
                <Tab label="Обо мне"/>
                <Tab label="Мои игры"/>
                <Tab label="События"/>
            </Tabs>
        </AppBar>

    )
}