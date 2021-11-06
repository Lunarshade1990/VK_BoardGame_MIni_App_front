import {
    Div,
    Counter,
    Group,
    PanelHeader,
    PanelHeaderBack,
    PanelSpinner,
    Search, SliderSwitch,
    SubnavigationBar,
    SubnavigationButton
} from "@vkontakte/vkui";
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Pagination, Stack} from "@material-ui/core";
import {Icon24Filter} from '@vkontakte/icons';
import {setActiveModal, setActivePanel, setCollectionFilter, setIsModalOpen} from "../../store/rootReducer";
import {GameCard} from "./GameCard";
import {ListPopover} from "../NavElements/ListPopover";

const _function = require('lodash/function');

export const GameCollection = ({loadGameList, fromProfile, onCardClick}) => {

    const dispatch = useDispatch();
    const filtersCount = useSelector((state) => state.rootReducer.countOfActiveFilters);
    const gameListPage = useSelector((state) => state.rootReducer.gameListPage);
    const gameListInfo = useSelector((state) => state.rootReducer.gameListInfo);
    const filter = useSelector((state) => state.rootReducer.collectionFilter);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [collectionMode, setCollectionMode] = useState('userCollection')
    const [collectionButtonRef, setCollectionButtonRef] = useState(null);
    const [collectionType, setCollectionType] = useState({value: 'OWN', text: 'В коллекции'});

    const collectionTypes = [
        {value: 'OWN', text: 'В коллекции'},
        {value: 'WANTS', text: 'Хочет сыграть'},
        {value: 'PLAYED', text: 'Играл'},
    ];

    useEffect(() => {
        setSearchFilter();
        return setSearchFilter.cancel;
    }, [searchValue]);

    useEffect(() => {
        loadGameList(collectionType.value, currentPage);
    }, [filter.filters.search, currentPage, collectionType]);


    const goBack = () => {
        dispatch(setActivePanel('panel1.1'));
    }


    const openModal = () => {
        dispatch(setIsModalOpen(true));
        dispatch(setActiveModal("collectionFilterModal"));
    }

    const cards = !gameListPage ? null :
        [...gameListPage.content].map(game => {
            return <GameCard game={game} onCardClick={() => onCardClick(game)}/>
        })

    const onPageChange = (_event, page) => {
        setCurrentPage(page);
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

    const onSwitchCollectionMode = (value) => {
        setCollectionMode(value);
        switch (value) {
            case 'userCollection':
                setCollectionType({value: 'OWN', text: 'В коллекции'});
                break;
            case 'allGames':
                setCollectionType({value: 'ALL', text: ''});
                break;
        }
        setCurrentPage(1);
    }

    let collectionSwitchButtons = null;
    if (!fromProfile) {
        collectionSwitchButtons = (
            <Div>
                <SliderSwitch
                    activeValue={collectionMode}
                    onSwitch={onSwitchCollectionMode}
                    options={[
                        {
                            name: 'Моя коллекция',
                            value: 'userCollection',
                        },
                        {
                            name: 'Все игры',
                            value: 'allGames',
                        },
                    ]}
                />
            </Div>
        )
    }

    const onCollectionButtonClick = (event) => {
        setCollectionButtonRef(event.currentTarget)
    }

    const onCollectionTypeChose = (item) => {
        setCollectionType(item);
        setCollectionButtonRef(null);
    }

    const collectionButton = (!fromProfile && collectionMode !== 'userCollection') ? null :
        (
            <>
                <SubnavigationButton
                    selected
                    expandable
                    onClick={onCollectionButtonClick}
                >
                    {collectionType.text}
                </SubnavigationButton>
                <ListPopover
                    anchorEl={collectionButtonRef}
                    handleClose={() => setCollectionButtonRef(null)}
                    listConf={{
                        onItemChoose: onCollectionTypeChose,
                        items: collectionTypes.map(t => {
                            return {text: t.text, item: t}
                        })
                    }}
                />
            </>
        )

    return (
        !gameListPage.content ? <PanelSpinner/> :
            <>
                <PanelHeader left={<PanelHeaderBack onClick={goBack}/>} separator={false}>Коллекция</PanelHeader>
                <Group>
                    {collectionSwitchButtons}
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
                        {collectionButton}
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