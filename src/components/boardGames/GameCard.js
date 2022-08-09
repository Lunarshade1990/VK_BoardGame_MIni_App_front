import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Card, CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Typography
} from "@material-ui/core";
import {Icon24ClockOutline, Icon28Users3Outline} from "@vkontakte/icons";
import {UsersStack} from "@vkontakte/vkui";
import {declOfNum} from "../../Util/Util";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";

export const GameCard = ({game, onCardClick}) => {

    const titles = ['человека', 'человек', 'человека']

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        margin: 2,
        borderRadius: 2,
        boxShadow: "0 2px 24px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 8%)"
    }

    const typographyHeader = {
        fontFamily: "Exo 2",
        fontSize: "1rem",
        fontWeight: 700,
        maxHeight: 280
    }


    return (
        <Card sx={cardStyle} key={game.id}>
            <CardActionArea onClick={onCardClick}>
            <CardContent>
                <Typography sx={typographyHeader} component="div" variant="h6">
                    {game.name}
                </Typography>
            </CardContent>
            <Box sx={{ display: 'flex', flexDirection: 'row'}} fontFamily={"Ubuntu, sans-serif"} fontSize={"0.8rem"}>
                <CardMedia sx={{width: '20%', flexGrow: 0, maxWidth: 151, minWidth:60, marginRight: '1rem', marginLeft: '1rem', height: 'auto', maxHeight: 200, padding: 0}}
                           image={game.picture}/>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                    <Divider variant="middle"/>
                    <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Icon28Users3Outline width={16} height={16} style={{color: '#5181B8'}}/></div>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                {game.minPlayerNumber} - {game.maxPlayerNumber}
                            </div>
                        </Box>
                        <Divider orientation="vertical" flexItem/>
                        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon24ClockOutline width={16} height={16} style={{color: '#5181B8'}}/>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10}}>
                                    {game.minTime} - {game.maxTime}
                                </div>
                            </Box>
                        </Box>
                    </Box>
                    <Divider variant="middle"/>
                    <Box sx={{padding: 2}}>
                        <UsersStack
                            photos={game.boardGameCollections
                                .filter(c => c.type	=== "OWN")
                                .map(c => c.owner.avatarUrl)}
                            count={3}
                        >В коллекции у {declOfNum(game.boardGameCollections
                            .filter(c => c.type	=== "OWN").length, titles)}</UsersStack>
                    </Box>
                </Box>
            </Box>
            </CardActionArea>
            <Box>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography fontFamily={"Exo 2"} fontSize={"1rem"}>Описание</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography fontFamily={"Ubuntu, sans-serif"} fontSize={"0.8rem"}>
                            {game.description}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Card>
    )
}