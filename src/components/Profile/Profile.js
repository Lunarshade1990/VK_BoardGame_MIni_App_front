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
import {GameImageContainer} from "../NavElements/GameImageContainer";


export const Profile = ({loadGameList}) => {

    const user = useSelector((state) => state.rootReducer.user);
    const loading = useSelector((state) => state.rootReducer.loading);
    const gameListPage = useSelector((state) => state.rootReducer.gameListPage);
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

    const gameList = gameListPage.content;

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
                                        <GameImageContainer src={item.picture} width={80} height={100} border padding/>
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