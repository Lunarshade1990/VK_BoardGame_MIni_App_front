import {
    Search,
    Group,
    PanelHeader,
    PanelHeaderBack,
    UsersStack,
    SubnavigationBar,
    SubnavigationButton, Counter
} from "@vkontakte/vkui";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
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
import {Icon24ClockOutline, Icon24Filter, Icon28Users3Outline} from '@vkontakte/icons';
import {declOfNum} from "../Util/Util";
import {setActiveModal, setActivePanel, setIsModalOpen} from "../store/rootReducer";

export const GameCollectionRichCell = () => {

    const dispatch = useDispatch();

    const gameList = useSelector((state) => state.rootReducer.gameList);
    const filterConfig = useSelector((state) => state.rootReducer.collectionFilter);
    const titles = ['человека', 'человек', 'человека']

    const [searchValue, setSearchValue] = useState('');
    const [filteredGameList, setFilteredGameList] = useState(gameList);

    const goBack = () => {
        dispatch(setActivePanel('panel1.1'));
    }

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        margin: 2, borderRadius: 2,
        boxShadow: "0 2px 24px 0 rgb(0 0 0 / 8%), 0 0 2px 0 rgb(0 0 0 / 8%)"
    }

    const typographyHeader = {
        fontFamily: "IBM Plex Sans, sans-serif",
        fontWeight: 700,
        fontSize: "1rem",
        maxHeight: 280
    }

    useEffect(() => {
        setFilteredGameList(gameList.filter(game => game.name.toLowerCase().includes(searchValue.toLowerCase())))
    }, [gameList, searchValue]);

    const openModal = () => {
        dispatch(setIsModalOpen(true));
        dispatch(setActiveModal("collectionFilterModal"));
    }



    const cards = [...filteredGameList].map(game => {
        return (
            <Card sx={cardStyle} key={game.id}>
                <CardContent>
                    <Typography sx={typographyHeader} component="div" variant="h6">
                        {game.name}
                    </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row'}} fontFamily={"PT Serif, serif"} fontSize={"0.8rem"}>
                    <CardMedia sx={{width: 151, flexGrow: 0, minWidth: 151, marginRight: 2, height: 'auto', maxHeight: 200, padding: 0}}
                               image={game.picture}/>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1}}>
                        <Divider variant="middle"/>
                        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 1}}>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon28Users3Outline width={16} height={16} style={{color: '#5181B8'}}/></div>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10, fontFamily: "IBM Plex Sans, sans-serif",}}>
                                    {game.minPlayers} - {game.maxPlayers}
                                </div>
                            </Box>
                            <Divider orientation="vertical" flexItem/>
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <Icon24ClockOutline width={16} height={16} style={{color: '#5181B8'}}/>
                                    </div>
                                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: 10, fontFamily: "IBM Plex Sans, sans-serif",}}>
                                        {game.minTime} - {game.maxTime}
                                    </div>
                                </Box>
                            </Box>
                        </Box>
                        <Divider variant="middle"/>
                        <Box sx={{padding: 2}}>
                            <UsersStack
                                photos={game.users.map(user => user.avatar)}
                                count={3}
                            >В коллекции у {declOfNum(game.users.length, titles)}</UsersStack>
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
                            <Typography fontFamily={"IBM Plex Sans, sans-serif"} fontSize={"1rem"}>Описание</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography fontFamily={"PT Serif, serif"} fontSize={"0.8rem"}>
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
            <PanelHeader left={<PanelHeaderBack onClick={goBack}/>} separator={false}>Коллекция</PanelHeader>
            <Group>
                <SubnavigationBar mode="fixed">
                    <SubnavigationButton
                        before={<Icon24Filter/>}
                        selected
                        expandable
                        after={<Counter mode="primary" size="s">{filterConfig.size}</Counter>}
                        onClick={openModal}
                    >
                        Фильтры
                    </SubnavigationButton>
                </SubnavigationBar>
                <Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} after={null}/>
                <Box>{cards}</Box>
            </Group>
        </>
    )
}