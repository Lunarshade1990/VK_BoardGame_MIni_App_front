import {
    Counter,
    Group,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    Search,
    SubnavigationBar,
    SubnavigationButton,
    usePlatform
} from "@vkontakte/vkui";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Pagination, Stack} from "@material-ui/core";
import {Icon24Filter} from '@vkontakte/icons';
import {setActiveModal, setActivePanel, setIsModalOpen} from "../store/rootReducer";
import {GameCard} from "./GameCard";

const array = require('lodash/array');

export const GameCollectionRichCard = ({loadGameList}) => {

    const dispatch = useDispatch();

    const platform = usePlatform();
    const filtersCount = useSelector((state) => state.rootReducer.countOfActiveFilters);
    const gameList = useSelector((state) => state.rootReducer.gameList);
    const gameListInfo = useSelector((state) => state.rootReducer.gameListInfo);
    const filterConfig = useSelector((state) => state.rootReducer.collectionFilterParams);
    const filter = useSelector((state) => state.rootReducer.collectionFilter);


    const [searchValue, setSearchValue] = useState('');
    // const [filteredGameList, setFilteredGameList] = useState(gameList);

    const goBack = () => {
        dispatch(setActivePanel('panel1.1'));
    }


    const openModal = () => {
        dispatch(setIsModalOpen(true));
        dispatch(setActiveModal("collectionFilterModal"));
    }

    const cards = !gameList ? null :
        [...gameList].map(game => {
            return <GameCard game={game}/>
        })

    const onPageChange = (_event, page) => {
        loadGameList('OWN', page);
    }

    const filterCountAndClear = filtersCount === 0 ? null :(
    <Stack direction={"row"} spacing={2} display={"flex"}>
        <Counter mode="primary" size="s">{filtersCount === 0 ? null : filtersCount}</Counter>
    </Stack>)

    return (
        !gameList ? <PanelSpinner/> :
            <>
                <PanelHeader left={<PanelHeaderBack onClick={goBack}/>} separator={false}>Коллекция</PanelHeader>
                <Group>
                    <SubnavigationBar mode="fixed">
                        <SubnavigationButton
                            before={<Icon24Filter/>}
                            selected
                            expandable
                            after={filterCountAndClear}
                            onClick={openModal}
                        >
                            Фильтры
                        </SubnavigationButton>
                    </SubnavigationBar>
                    <Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} after={null}/>
                    <Box>{cards}</Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100wh'}} >
                        <Pagination  size= {window.innerWidth < 600 ? 'small' : 'large'}
                                     showFirstButton={true}
                                     showLastButton={true}
                                     color={"primary"}
                                     count={gameListInfo.totalPages}
                                     onChange={onPageChange}
                        />
                    </Box>
                </Group>
            </>
    )
}