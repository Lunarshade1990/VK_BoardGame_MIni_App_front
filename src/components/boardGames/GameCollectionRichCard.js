import {
    Counter,
    Group,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    Search,
    SubnavigationBar,
    SubnavigationButton
} from "@vkontakte/vkui";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Pagination, Stack} from "@material-ui/core";
import {Icon24Filter} from '@vkontakte/icons';
import {setActiveModal, setActivePanel, setCollectionFilter, setIsModalOpen} from "../../store/rootReducer";
import {GameCard} from "./GameCard";

const _function = require('lodash/function');

export const GameCollectionRichCard = ({loadGameList}) => {

    const dispatch = useDispatch();
    const filtersCount = useSelector((state) => state.rootReducer.countOfActiveFilters);
    const gameListPage = useSelector((state) => state.rootReducer.gameListPage);
    const gameListInfo = useSelector((state) => state.rootReducer.gameListInfo);
    // const filterConfig = useSelector((state) => state.rootReducer.collectionFilterParams);
    const filter = useSelector((state) => state.rootReducer.collectionFilter);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        setSearchFilter();
        return setSearchFilter.cancel;
    }, [searchValue]);

    useEffect(() => {
        loadGameList('OWN', currentPage);
    }, [filter.filters.search]);


    const goBack = () => {
        dispatch(setActivePanel('panel1.1'));
    }


    const openModal = () => {
        dispatch(setIsModalOpen(true));
        dispatch(setActiveModal("collectionFilterModal"));
    }

    const cards = !gameListPage ? null :
        [...gameListPage.content].map(game => {
            return <GameCard game={game}/>
        })

    const onPageChange = (_event, page) => {
        setCurrentPage(page);
        loadGameList('OWN', page);
    }

    const onInputChange = (value) => {
        setSearchValue(value);
        setSearchFilter(value)
    }

    const setSearchFilter = useCallback(_function.debounce(() => dispatchSearchFilter(searchValue), 500), [searchValue])

    const dispatchSearchFilter = (value) => {
        dispatch(setCollectionFilter({filters: {search: value}}));
    }



    const filterCountAndClear = filtersCount === 0 ? null :(
        <Stack direction={"row"} spacing={2} display={"flex"}>
            <Counter mode="primary" size="s">{filtersCount === 0 ? null : filtersCount}</Counter>
        </Stack>)

    return (
        !gameListPage.content ? <PanelSpinner/> :
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
                        <SubnavigationButton
                            selected
                            expandable
                        >
                            Коллекция
                        </SubnavigationButton>
                    </SubnavigationBar>
                    <Search value={searchValue} onChange={(e) => onInputChange(e.target.value)} after={null}/>
                    <Box>{cards}</Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100wh'}} >
                        <Pagination  size= {window.innerWidth < 600 ? 'small' : 'large'}
                                     showFirstButton={true}
                                     showLastButton={true}
                                     color={"primary"}
                                     count={gameListPage.totalPages}
                                     onChange={onPageChange}
                        />
                    </Box>
                </Group>
            </>
    )
}