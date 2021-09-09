import React, {useEffect, useState} from 'react';
import {
    Button,
    Div,
    Group,
    Header,
    HorizontalCell,
    HorizontalScroll,
    InfoRow,
    PanelSpinner,
    SimpleCell
} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux";
import {setActivePanel} from "../../store/rootReducer";


export const Profile = ({loadGameList}) => {
    const largeImageStyles = {
        maxWidth: '100%',
        width: 'auto',
        height: 'auto',
        maxHeight: '100%',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center'

    };

    const imageContainer = {
        width: 80,
        height: 100,
        borderRadius: 8,
        border: '1px solid var(--placeholder_icon_background)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const user = useSelector((state) => state.rootReducer.user);
    const loading = useSelector((state) => state.rootReducer.loading);
    const gameList = useSelector((state) => state.rootReducer.gameList);
    const gameCollectionLoadingStatus = useSelector((state) => state.rootReducer.gameCollectionLoadingStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.id && gameCollectionLoadingStatus === 'idle') {
            loadGameList(user.id, "OWN", true);
        }
    }, [user]);

    useEffect(() => {
        if (gameCollectionLoadingStatus === 'finish') {
            loadGameList(user.id, "OWN", true);
        }
    }, [gameCollectionLoadingStatus]);

    const goToCollection = () => {
        dispatch(setActivePanel("panel1.2"))
    }


    let collection = null;

    if (gameList.length > 0) {
        collection = (
            <Group mode="plain">
                <Header mode="primary"  aside={<Button mode="tertiary">Показать все ></Button>} onClick={goToCollection}>Коллекция</Header>
                <HorizontalScroll>
                    <div style={{ display: 'flex' }}>
                        {[...gameList].sort((a, b) => {
                            const date1 = new Date(a.addedToCollection);
                            const date2 = new Date(b.addedToCollection);
                            return date2 - date1;
                        })
                            .slice(0, 9)
                            .map((item) => {
                                return (
                                    <HorizontalCell size='l' header={item.name.slice(0,30).trim()} key={item.id}>
                                        <Div style={imageContainer}>
                                            <img style={largeImageStyles} src={item.picture} alt={""}/>
                                        </Div>
                                    </HorizontalCell>
                                )
                            })}
                    </div>
                </HorizontalScroll>
            </Group>
        )
    }

    let profile = <PanelSpinner/>;
    if (!loading) {
        profile = (
            <>
                <Group mode="plain">
                    <Header mode="primary">Основная информация</Header>
                    <SimpleCell>
                        <InfoRow header="Город">
                            {user.city}
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Имя">
                            {user.firstName} {user.secondName}
                        </InfoRow>
                    </SimpleCell>
                    <SimpleCell>
                        <InfoRow header="Профиль на тесере">
                            {user.teseraProfile ? user.teseraProfile : "Профиль не указан"}
                        </InfoRow>
                    </SimpleCell>
                </Group>
                {collection}
            </>
        )
    }

    return <>{profile}</>
}