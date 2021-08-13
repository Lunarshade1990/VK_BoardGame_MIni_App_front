import {PanelHeader} from "@vkontakte/vkui";
import React from "react";
import {useSelector} from "react-redux";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Typography
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GroupsIcon from '@material-ui/icons/Groups';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

export const GameCollectionRichCell = () => {

    const gameList = useSelector((state) => state.rootReducer.gameList);

    const cardContainer = {
        display: 'flex',
        flexDirection: 'column',
    }

    const cardContentContainer = {
        display: 'flex',
        flexDirection: 'column',
        flexBasis: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const infoContainer = {
        display: 'flex',
        fleDirection: 'row'
    }

    const cards = [...gameList].map(game => {
        return (
            <Card sx={{display: 'flex', flexDirection: 'column', margin: 2, borderRadius: 2}}>
                <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                    <CardMedia sx={{width: 151, flexGrow: 0, minWidth: 151, marginRight: 2, height: 'auto', maxHeight: 200, padding: 0}}
                               image={game.picture}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <CardContent>
                            <Typography component="div" variant="h6">
                                {game.name}
                            </Typography>
                        </CardContent>
                        <Divider variant="middle"/>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 2}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><GroupsIcon/></div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    {game.boardGameInfo.minPlayerNumber} - {game.boardGameInfo.maxPlayerNumber}
                                </div>
                            </Box>
                            <Divider orientation="vertical" flexItem/>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <WatchLaterIcon/>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                        {game.boardGameInfo.minTime} - {game.boardGameInfo.maxTime}
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                        <Divider variant="middle"/>
                        <Box>
                            Список владельцев
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Описание</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {game.description}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Card>
        )
    })

    return (
        <>
            <PanelHeader>Коллекция</PanelHeader>
            <Box>{cards}</Box>
        </>
    )
}