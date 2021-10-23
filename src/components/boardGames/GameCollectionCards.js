import {Div, CardGrid, ContentCard, Group, PanelHeader, Subhead, Caption, Cell, HorizontalCell} from "@vkontakte/vkui";
import React from "react";
import {useSelector} from "react-redux";
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";

export const GameCollectionCards = () => {

    const gameList = useSelector((state) => state.rootReducer.gameList);

    const largeImageStyles = {
        maxWidth: '100%',
        width: 'auto',
        height: 'auto',
        maxHeight: '100%',
        margin: 'auto',
        display: 'table-cell',
        verticalAlign: 'middle',
        textAlign: 'center',

    };

    const imageContainer = {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 'auto'
    }

    const textContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    const container = {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
    }


    const cards = [...gameList].map(game => {
        return (
                <Card size="s" style={{shadow: 'none'}}>
                    <div style={container} >
                        <div style={imageContainer}>
                            <img src={game.picture} alt={game.name} style={largeImageStyles}/>
                        </div>
                        <div style={textContainer}>
                            <Caption level="2" weight="medium" style={{ margin: 16 }}>{game.name}</Caption>
                        </div>
                    </div>
                </Card>
        )
    })

    return (
        <>
            <PanelHeader>Коллекция</PanelHeader>
            <Div>
                <Group mode="plain">
                    <Box  sx={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }} m={{
                        display: 'grid',
                        gap: 1,
                        gridTemplateColumns: 'repeat(3, 1fr)',
                    }}>
                        {cards}
                    </Box>
                </Group>
            </Div>

        </>
    )
}