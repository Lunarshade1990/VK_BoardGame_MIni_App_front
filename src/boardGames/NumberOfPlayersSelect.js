import React, {useState} from "react";
import {Box, Chip, Stack} from "@material-ui/core";
import {SlideTwosideInput} from "../CustomFormElements/SlideTwosideInput";
import {useDispatch, useSelector} from "react-redux";
import {resetCollectionModeFilter, setCollectionFilter} from "../store/rootReducer";

export const NumberOfPlayersSelect = () => {

    const modeParams = useSelector((state) => state.rootReducer.collectionFilterParams.filters.mode);
    const modeName = useSelector((state) => state.rootReducer.collectionFilter.filters.modeName);
    const mode = useSelector((state) => state.rootReducer.collectionFilter.filters.mode);
    const dispatch = useDispatch();

    const initState = [
        {name: 'solo', selected: false, label: 'соло-режим',modeName: 'solo', mode: [1], input: false},
        {name: 'duel', selected: false, label: 'дуэль',  modeName: 'duel', mode: [2], input: false},
        {name: 'duel+', selected: false, label: 'от двух игроков',  modeName: 'duel+', mode: [2, modeParams[1]], input: false},
        {name: 'company', selected: false, label: 'для компании...', modeName: 'company', mode: modeParams, input: true}
    ]

    const changeSelectModeToTrue = (name) => {
        const chip = initState.filter(chip => chip.name === name)[0]
        chip.selected = true;
        if (name === 'company') chip.mode = mode.mode
    }

    const createInitState = () => {
        switch (modeName){
            case 'solo':
                changeSelectModeToTrue('solo');
                break;
            case 'duel':
                changeSelectModeToTrue('duel');
                break;
            case 'duel+':
                changeSelectModeToTrue('duel+');
                break;
            case 'company':
                if (mode[0] !== modeParams[0] || mode[1] !== modeParams[1]) {
                    changeSelectModeToTrue('company')
                }
                break;
        }
        return initState;
    }

    const [chips, setChips] = useState(createInitState());

    const handleClick = (name, modeName, mode) => {
        const chipsArr = [];
        chips.forEach(chip => {
            const newChip = {...chip};
            if (newChip.name === name && newChip.selected === true) {
                newChip.selected = false
                dispatch(setCollectionFilter({filters: {mode: modeParams}, filterConfig: {modeName: ''}}));
            }
            else {
                newChip.selected = newChip.name === name;
                if (newChip.selected && !newChip.input) {
                    dispatch(setCollectionFilter({
                        filterConfig: {modeName},
                        filters: {mode}
                    }));
                } else if (newChip.selected && newChip.input) {
                    dispatch(resetCollectionModeFilter());
                    dispatch(setCollectionFilter({filterConfig: {modeName}}));
                }
            }
            chipsArr.push(newChip);
        });
        setChips(chipsArr);
    }

    const content = chips.map(chip => {
        return (
            <Chip key={chip.name}
                  label={chip.label}
                  variant={chip.selected ? 'filled' : 'outlined'}
                  color={chip.selected ? "primary" : "default"}
                  onClick={() => handleClick(chip.name, chip.modeName, chip.mode)} style={{margin: "0.2rem"}}/>
        )
    } )

    const numberOfPlayersSelector = !chips.filter(chip => chip.name === 'company')[0].selected ? null :
        <SlideTwosideInput param="mode" title={"Количество игроков"}/>

    return (
        <Box padding={2}>
            <Stack direction={'row'} flexWrap={"wrap"}>
                {content}
            </Stack>
            {numberOfPlayersSelector}
        </Box>
    )
}